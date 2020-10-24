import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import GhostGame from './game/GhostGame'
import JoinGame from './game/JoinGame'
import Loading from '../components/Loading'

export default function Game() {
  const { gameId } = useParams()
  const [user, setUser] = useState()
  const [gameState, setGameState] = useState()
  const [logs, setLogs] = useState()
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState()

  useEffect(() => {
    setSocket(global.io())
  }, [])

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on('connect', () => {
      setIsConnected(socket.connected)
    })
    socket.on('gameState', (state) => {
      setGameState(state)
    })
    socket.on('logs', (gameLogs) => {
      setLogs(gameLogs)
    })
    socket.on('user', (currentUser) => {
      setUser(currentUser)
    })
  }, [socket])

  if (!isConnected) {
    return <Loading />
  }

  if (!user) {
    return (
      <JoinGame
        onSubmit={(nickname) => {
          socket.emit('joinGame', {
            gameId,
            nickname,
          })
        }}
      />
    )
  }

  if (!gameState) {
    return <Loading />
  }

  return (
    <GhostGame
      user={user}
      state={gameState}
      startGame={() => socket.emit('startGame')}
      doAction={(action) => socket.emit('doAction', action)}
      logs={logs}
    />
  )
}
