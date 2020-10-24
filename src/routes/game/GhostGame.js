function Controls({ nickname, state, stopGame, startGame }) {
  return (
    <div>
      <span>{nickname}: </span>
      {state.isRunning && (
        <button type="button" onClick={stopGame}>
          Stop
        </button>
      )}
      {!state.isRunning && (
        <button type="button" onClick={startGame}>
          Start
        </button>
      )}
    </div>
  )
}

function Users({ state }) {
  return (
    <div style={{ width: 200, background: 'blue' }}>
      {state.users.map((u) => (
        <div key={u.id}>{u.nickname}</div>
      ))}
    </div>
  )
}

function Board() {
  return <div style={{ flex: 1 }}>Board</div>
}

function History({ state }) {
  return (
    <div style={{ width: 200, background: 'red' }}>
      {state.history.map((h) => (
        <div key={h.timestamp}>{h.message}</div>
      ))}
    </div>
  )
}

export default function GhostGame({
  nickname,
  doAction,
  state,
  stopGame,
  startGame,
}) {
  return (
    <div>
      <div style={{ minHeight: '5vh' }}>
        <Controls
          state={state}
          stopGame={stopGame}
          startGame={startGame}
          nickname={nickname}
        />
      </div>
      <div style={{ display: 'flex', height: '95vh' }}>
        <Users state={state} />
        <Board state={state} />
        <History state={state} />
      </div>
    </div>
  )
}
