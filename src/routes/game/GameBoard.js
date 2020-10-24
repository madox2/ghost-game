import React from 'react'

import ControlCard from '../../components/ControlCard'
import RoundCard from '../../components/RoundCard'

function Results({ state }) {
  if (state?.board?.type !== 'results') {
    return null
  }
  const results = state.board.results.slice()
  results.sort((a, b) => a - b)
  return (
    <div style={{ marginBottom: 20 }}>
      {results.map((r, i) => (
        <div key={r.id}>
          {i + 1}. {r.nickname} ({r.cards})
        </div>
      ))}
    </div>
  )
}
function BoardIndex({ startGame, state }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Results state={state} />
      <button type="button" onClick={startGame}>
        Start game
      </button>
    </div>
  )
}

function Controls({ state, doAction }) {
  const items = [
    ['bottle', 'green'],
    ['ghost', 'white'],
    ['chair', 'red'],
    ['book', 'blue'],
    ['mouse', 'grey'],
  ]
  return (
    <div
      style={{
        background: 'purple',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {items.map(([type, color]) => (
        <ControlCard
          key={type}
          type={type}
          color={color}
          onClick={() => doAction(type)}
        />
      ))}
    </div>
  )
}

function GameContainer({ children, state, doAction }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: 'pink',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
      <div style={{ background: 'orange', height: 250 }}>
        <Controls state={state} doAction={doAction} />
      </div>
    </div>
  )
}

function Countdown({ state }) {
  return state.board.value
}

function Round({ state }) {
  return <RoundCard card={state.board.card} />
}

function RoundResults({ state }) {
  const plusCards = 1 + state.board.fails.length
  return (
    <div>
      <div>
        Winner: {state.board.winner.nickname} +{plusCards}
      </div>
      {!!state.board.fails.length && (
        <div>
          Failed: {state.board.fails.map((f) => f.user.nickname).join(', ')}
        </div>
      )}
    </div>
  )
}

function GameSwitch({ state, startGame }) {
  if (state?.board?.type === 'countdown') {
    return <Countdown state={state} />
  }
  if (state?.board?.type === 'round') {
    return <Round state={state} />
  }
  if (state?.board?.type === 'roundResults') {
    return <RoundResults state={state} />
  }
  return <BoardIndex state={state} startGame={startGame} />
}

export default function GameBoard({ state, doAction, startGame }) {
  return (
    <GameContainer state={state} doAction={doAction}>
      <GameSwitch state={state} startGame={startGame} />
    </GameContainer>
  )
}
