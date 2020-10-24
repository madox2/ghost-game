import React from 'react'

import GameBoard from './GameBoard'

function Users({ state }) {
  return (
    <div style={{ width: 200, background: 'blue' }}>
      {state.users.map((u) => (
        <div key={u.id}>
          {u.nickname} ({u.cards})
        </div>
      ))}
    </div>
  )
}

function Logs({ logs }) {
  return (
    <div style={{ width: 200, background: 'red' }}>
      {logs?.map((h) => (
        <div key={h.timestamp}>{h.message}</div>
      ))}
    </div>
  )
}

export default function GhostGame({
  nickname,
  doAction,
  state,
  startGame,
  logs,
}) {
  return (
    <div>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Users state={state} />
        <GameBoard state={state} doAction={doAction} startGame={startGame} />
        <Logs logs={logs} />
      </div>
    </div>
  )
}
