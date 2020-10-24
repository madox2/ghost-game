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

const gameStates = {}

io.on('connection', (socket) => {
  console.log('a user connected')
  let user
  let gameId

  function getGame() {
    return gameStates[gameId]
  }

  function setState(setState) {
    gameStates[gameId] = setState(gameStates[gameId])
  }

  function emit() {
    io.to(gameId).emit('gameState', getGame())
  }

  function log(msg) {
    setState((state) => ({
      ...state,
      history: state.history.concat({
        timestamp: Date.now(),
        message: `${user.nickname}: ${msg}`,
      }),
    }))
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
      history: [],
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
    if (getGame()) {
      setState((state) => ({
        ...state,
        users: state.users.filter((u) => u.id !== user.id),
      }))
      log('left game')
      emit()
    }
  })

  socket.on('startGame', () => {
    setState((state) => ({
      ...state,
      isRunning: true,
    }))
    log('started game')
    emit()
  })

  socket.on('stopGame', () => {
    setState((state) => ({
      ...state,
      isRunning: false,
    }))
    log('stopped game')
    emit()
  })

  socket.on('doAction', (type) => {
    console.log(type)
  })
})

http.listen(process.env.PORT || 8080)
