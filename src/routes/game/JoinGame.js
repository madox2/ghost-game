import { useEffect, useState, useRef } from 'react'

export default function JoinGame({ onSubmit }) {
  const [name, setName] = useState('')
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  })
  return (
    <>
      <input
        type="text"
        placeholder="Nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={inputRef}
      />
      <button type="button" onClick={() => onSubmit(name)}>
        Join game
      </button>
    </>
  )
}
