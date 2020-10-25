const express = require('express')
const { initSockets } = require('./sockets')

const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/game/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

var http = require('http').createServer(app)
var io = require('socket.io')(http)

initSockets(io)

http.listen(process.env.PORT || 8080)
