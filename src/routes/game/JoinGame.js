import { useState } from 'react'

export default function JoinGame({ onSubmit }) {
  const [name, setName] = useState('')
  return (
    <>
      <input
        type="text"
        placeholder="Nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={() => onSubmit(name)}>
        Join game
      </button>
    </>
  )
}
