import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import GhostGame from './game/GhostGame'
import JoinGame from './game/JoinGame'
import Loading from '../components/Loading'

export default function Game() {
  const { gameId } = useParams()
  const [nickname, setNickname] = useState()
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
  }, [socket])

  if (!isConnected) {
    return <Loading />
  }

  if (!nickname) {
    return (
      <JoinGame
        onSubmit={(nickname) => {
          setNickname(nickname)
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
      nickname={nickname}
      state={gameState}
      startGame={() => socket.emit('startGame')}
      stopGame={() => socket.emit('stopGame')}
      doAction={(action) => socket.emit('doAction', action)}
      logs={logs}
    />
  )
}
