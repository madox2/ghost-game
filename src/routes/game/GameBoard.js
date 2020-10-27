import Parrot from 'react-partyparrot'
import React from 'react'

import {
  BLUE,
  BOOK,
  BOTTLE,
  CHAIR,
  GHOST,
  GREEN,
  GREY,
  MOUSE,
  RED,
  WHITE,
} from '../../app/constants'
import ControlCard from '../../components/ControlCard'
import RoundCard from '../../components/RoundCard'

function Results({ state }) {
  if (state?.board?.type !== 'results') {
    return null
  }
  const results = state.board.results.slice()
  results.sort((a, b) => b.cards - a.cards)
  return (
    <div style={{ marginBottom: 20, textAlign: 'left' }}>
      <div style={{ marginBottom: 20 }}>
        <Parrot name="dealwithit" hd />
      </div>
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

function Controls({ state, doAction, user }) {
  const items = [
    [BOTTLE, GREEN],
    [GHOST, WHITE],
    [CHAIR, RED],
    [BOOK, BLUE],
    [MOUSE, GREY],
  ]
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {items.map(([type, color]) => (
        <ControlCard
          disabled={
            !state.isRunning ||
            state.board?.fails?.some((f) => f.user.id === user.id) ||
            state.board?.type !== 'round'
          }
          key={type}
          type={type}
          color={color}
          onClick={() => doAction(type)}
        />
      ))}
    </div>
  )
}

function GameContainer({ children, state, doAction, user }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {state.board?.roundCount && (
        <p style={{ textAlign: 'center', marginTop: 10 }}>
          Round {state.board.round} / {state.board.roundCount}
        </p>
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
      <div style={{ height: 250 }}>
        <Controls state={state} doAction={doAction} user={user} />
      </div>
    </div>
  )
}

function Countdown({ state }) {
  return (
    <p>
      <span style={{ fontSize: 100 }}>{state.board.value}</span>
    </p>
  )
}

function Round({ state }) {
  return <RoundCard card={state.board.card} />
}

function RoundResults({ state }) {
  return (
    <>
      <div style={{ fontSize: 20 }}>
        <p>
          Points:{' '}
          <b>
            {state.board.winner.nickname} +{state.board.winnerBonus}
          </b>
        </p>
        {!!state.board.fails.length && (
          <p>
            Mistakes:{' '}
            {state.board.fails.map((f) => (
              <>
                <br />
                <span>- {f.user.nickname}</span>
              </>
            ))}
          </p>
        )}
      </div>
      <RoundCard card={state.board.card} />
    </>
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

export default function GameBoard({ state, doAction, startGame, user }) {
  return (
    <GameContainer state={state} doAction={doAction} user={user}>
      <GameSwitch state={state} startGame={startGame} />
    </GameContainer>
  )
}
