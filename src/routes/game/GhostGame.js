import React from 'react'

import GameBoard from './GameBoard'

function Users({ state }) {
  const sorted = state.users?.slice()
  sorted.sort((a, b) => b.cards - a.cards)
  return (
    <div
      className="card card-warning"
      style={{ width: 250, display: 'flex', flexDirection: 'column' }}
    >
      <header className="card-header">Users</header>
      <div className="list-group" style={{ overflowY: 'auto' }}>
        {sorted?.map((h) => (
          <span
            key={h.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>{h.nickname}</span>
            <span>({h.cards})</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Logs({ logs }) {
  return (
    <div
      className="card card-warning"
      style={{ width: 250, display: 'flex', flexDirection: 'column' }}
    >
      <header className="card-header">Logs</header>
      <div className="list-group" style={{ overflowY: 'auto' }}>
        {logs
          ?.slice()
          .reverse()
          .map((h) => (
            <span
              key={h.id}
              style={{ fontWeight: h.system ? 'bold' : 'normal' }}
            >
              [{h.system ? 'System' : h.nickname}] {h.message}
            </span>
          ))}
      </div>
    </div>
  )
}

export default function GhostGame({ user, doAction, state, startGame, logs }) {
  return (
    <div>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Users state={state} />
        <GameBoard
          state={state}
          doAction={doAction}
          startGame={startGame}
          user={user}
        />
        <Logs logs={logs} />
      </div>
    </div>
  )
}
