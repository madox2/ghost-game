const { shuffleCards, hasCorrectItem } = require('./cards')
const { generateId } = require('./utils')

const START_COUNTDOWN = 3
const ROUND_RESULTS_TIMEOUT = 2000

const gameRounds = {}

const gameStates = {}

const logs = {}

function initSockets(io) {
  io.on('connection', (socket) => {
    console.log('a user connected')
    let user
    let gameId

    function newRound(number) {
      return {
        type: 'round',
        round: number,
        roundCount: gameRounds[gameId].length,
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

    function logSystem(msg) {
      logs[gameId] = (logs[gameId] || []).concat({
        system: true,
        id: generateId(),
        timestamp: Date.now(),
        message: msg,
      })
      io.to(gameId).emit('logs', logs[gameId])
    }

    function log(msg) {
      logs[gameId] = (logs[gameId] || []).concat({
        id: generateId(),
        timestamp: Date.now(),
        message: msg,
        nickname: user.nickname,
      })
      io.to(gameId).emit('logs', logs[gameId])
    }

    function handleError(e) {
      console.error(e)
    }

    socket.on('joinGame', (data) => {
      try {
        console.log('JoinGame', data)
        gameId = data.gameId
        user = {
          nickname: data.nickname,
          id: generateId(),
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
      } catch (e) {
        handleError(e)
      }
    })

    socket.on('disconnect', () => {
      try {
        if (getState()) {
          setState((state) => ({
            ...state,
            users: state.users.filter((u) => u.id !== user.id),
          }))
          log('left game')
        }
      } catch (e) {
        handleError(e)
      }
    })

    socket.on('startGame', () => {
      try {
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
      } catch (e) {
        handleError(e)
      }
    })

    socket.on('doAction', (type) => {
      try {
        const state = getState()
        if (state?.board?.type !== 'round') {
          return
        }
        if (state.board.fails.some((f) => f.user.id === user.id)) {
          return
        }
        // eslint-disable-next-line
        const [_, color] = state.board.card.find(([t]) => t === type)
        if (hasCorrectItem({ [type]: color })) {
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

          log('won round +' + gainedCards)
          setState((state) => ({
            ...state,
            board: {
              ...state.board,
              type: 'roundResults',
              winner: user,
              winnerBonus: gainedCards,
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
          log('made mistake')
          const allFailed = !state.users.some(
            (u) => !newFails.some((f) => f.user.id === u.id)
          )
          if (allFailed) {
            logSystem('try again')
          }
          setState((state) => ({
            ...state,
            board: {
              ...state.board,
              fails: allFailed ? [] : newFails,
            },
          }))
        }
      } catch (e) {
        handleError(e)
      }
    })
  })
}

module.exports = { initSockets }
