const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

var http = require('http').createServer(app)
var io = require('socket.io')(http)

function shuffleCards() {
  // TODO: shuffle cards
  return [
    [
      ['bottle', 'green', 1, [0, 0]],
      ['ghost', 'blue', 2, [0, 2]],
      ['chair', 'white', 3, [1, 1]],
      ['book', 'grey', 2, [2, 1]],
      ['mouse', 'red', 1, [2, 2]],
    ],
    [
      ['bottle', 'white', 3, [0, 1]],
      ['ghost', 'blue', 3, [0, 2]],
      ['chair', 'red', 1, [1, 2]],
      ['book', 'grey', 2, [1, 1]],
      ['mouse', 'green', 2, [3, 2]],
    ],
  ]
}

const gameRounds = {}

const gameStates = {}

const logs = {}

const START_COUNTDOWN = 0 // 3
const ROUND_RESULTS_TIMEOUT = 2000

io.on('connection', (socket) => {
  console.log('a user connected')
  let user
  let gameId

  function newRound(number) {
    return {
      type: 'round',
      round: number,
      card: gameRounds[gameId][number - 1],
      fails: [],
    }
  }

  function getState() {
    return gameStates[gameId]
  }

  function setState(setState) {
    gameStates[gameId] = setState(gameStates[gameId])
    io.to(gameId).emit('gameState', getState())
  }

  function log(msg) {
    logs[gameId] = (logs[gameId] || []).concat({
      timestamp: Date.now(),
      message: `${user.nickname}: ${msg}`,
    })
    io.to(gameId).emit('logs', logs[gameId])
  }

  socket.on('joinGame', (data) => {
    console.log('JoinGame', data)
    gameId = data.gameId
    user = {
      nickname: data.nickname,
      id: Date.now(),
      cards: 0,
    }
    gameStates[gameId] = gameStates[gameId] || {
      id: gameId,
      users: [],
      isRunning: false,
    }
    socket.emit('user', user)
    socket.join(gameId)
    setState((state) => ({
      ...state,
      users: state.users.concat(user),
    }))
    log('joined game')
  })

  socket.on('disconnect', () => {
    if (getState()) {
      setState((state) => ({
        ...state,
        users: state.users.filter((u) => u.id !== user.id),
      }))
      log('left game')
    }
  })

  socket.on('startGame', () => {
    if (getState().isRunning) {
      return
    }
    let countdown = START_COUNTDOWN
    setState((state) => ({
      ...state,
      isRunning: true,
      points: [],
      board: {
        type: 'countdown',
        value: countdown,
      },
      users: state.users.map((u) => ({
        ...u,
        cards: 0,
      })),
    }))
    log('started game')

    const interval = setInterval(() => {
      countdown--
      if (!getState().isRunning) {
        clearInterval(interval)
        return
      }
      if (countdown > 0) {
        setState((state) => ({
          ...state,
          board: {
            type: 'countdown',
            value: countdown,
          },
        }))
      } else {
        gameRounds[gameId] = shuffleCards()
        setState((state) => ({
          ...state,
          board: newRound(1),
        }))
        clearInterval(interval)
      }
    }, 1000)
  })

  socket.on('doAction', (type) => {
    const state = getState()
    if (state?.board?.type !== 'round') {
      return
    }
    if (state.board.fails.some((f) => f.user.id === user.id)) {
      return
    }
    // eslint-disable-next-line
    const [_, color] = state.board.card.find(([t]) => t === type)
    if (
      (type === 'bottle' && color === 'green') ||
      (type === 'ghost' && color === 'white') ||
      (type === 'book' && color === 'blue') ||
      (type === 'mouse' && color === 'grey') ||
      (type === 'chair' && color === 'red')
    ) {
      let gainedCards = 1
      const newUsers = state.users
        .map((u) => {
          if (u.id === user.id) {
            // winner
            return u
          }
          const failedCount = state.board.fails.filter(
            (f) => f.user.id === u.id
          ).length
          const minusCount = Math.min(failedCount, u.cards)
          gainedCards += minusCount
          return {
            ...u,
            cards: u.cards - minusCount,
          }
        })
        .map((u) => {
          if (u.id !== user.id) {
            return u
          }
          return {
            ...u,
            cards: u.cards + gainedCards,
          }
        })

      setState((state) => ({
        ...state,
        board: {
          ...state.board,
          type: 'roundResults',
          winner: user,
        },
        users: newUsers,
      }))

      setTimeout(() => {
        const nextRound = state.board.round + 1
        console.log(nextRound, gameRounds[gameId])
        if (nextRound > gameRounds[gameId].length) {
          setState((state) => ({
            ...state,
            isRunning: false,
            board: {
              type: 'results',
              results: state.users,
            },
          }))
        } else {
          setState((state) => ({
            ...state,
            board: newRound(state.board.round + 1),
          }))
        }
      }, ROUND_RESULTS_TIMEOUT)
    } else {
      const newFails = state.board.fails.concat({
        user,
        type,
      })
      const allFailed = !state.users.some(
        (u) => !newFails.some((f) => f.user.id === u.id)
      )
      setState((state) => ({
        ...state,
        board: {
          ...state.board,
          fails: allFailed ? [] : newFails,
        },
      }))
    }
  })
})

http.listen(process.env.PORT || 8080)
