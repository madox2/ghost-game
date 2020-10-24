import { useParams } from 'react-router-dom'
import React, { useState } from 'react'

import GhostGame from './game/GhostGame'
import JoinGame from './game/JoinGame'

export default function Game() {
  const { gameId } = useParams()
  const [nickname, setNickname] = useState()
  if (nickname) {
    return <GhostGame gameId={gameId} nickname={nickname} />
  }
  return <JoinGame onSubmit={(nickname) => setNickname(nickname)} />
}
