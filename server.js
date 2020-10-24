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
      ['bottle', 'g', 1],
      ['ghost', 'b', 2],
      ['chair', 'w', 3],
      ['book', 'r', 4],
    ],
    [
      ['bottle', 'w', 1],
      ['ghost', 'b', 2],
      ['chair', 'r', 3],
      ['book', 'g', 4],
    ],
  ]
}

const gameRounds = {}

const gameStates = {}

const logs = {}

io.on('connection', (socket) => {
  console.log('a user connected')
  let user
  let gameId

  function getState() {
    return gameStates[gameId]
  }

  function setState(setState) {
    gameStates[gameId] = setState(gameStates[gameId])
  }

  function emit() {
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
    }
    gameStates[gameId] = gameStates[gameId] || {
      id: gameId,
      users: [],
      isRunning: false,
    }
    setState((state) => ({
      ...state,
      users: state.users.concat(user),
    }))
    socket.join(gameId)
    log('joined game')
    emit()
  })

  socket.on('disconnect', () => {
    if (getState()) {
      setState((state) => ({
        ...state,
        users: state.users.filter((u) => u.id !== user.id),
      }))
      log('left game')
      emit()
    }
  })

  socket.on('startGame', () => {
    let countdown = 3
    setState((state) => ({
      ...state,
      isRunning: true,
      points: [],
      board: {
        type: 'countdown',
        value: countdown,
      },
    }))
    log('started game')
    emit()

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
        setState((state) => ({
          ...state,
          board: {
            type: 'round',
            value: 'TODO',
          },
        }))
        clearInterval(interval)
      }
      emit()
    }, 1000)
  })

  socket.on('stopGame', () => {
    setState((state) => ({
      ...state,
      isRunning: false,
      board: undefined,
    }))
    log('stopped game')
    emit()
  })

  socket.on('doAction', (type) => {
    console.log(type)
  })
})

http.listen(process.env.PORT || 8080)
