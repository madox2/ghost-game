import { useEffect, useState, useRef } from 'react'

import SimpleTemplate from '../../components/SimpleTemplate'

export default function JoinGame({ onSubmit }) {
  const [name, setName] = useState('')
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  })
  return (
    <SimpleTemplate>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(name)
        }}
      >
        <input
          type="text"
          placeholder="Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
        />
        <button type="submit" disabled={!name} style={{ marginLeft: 10 }}>
          Join game
        </button>
      </form>
    </SimpleTemplate>
  )
}
