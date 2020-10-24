import { Link } from 'react-router-dom'

export default function Home() {
  return <Link to={`/game/${Date.now()}`}>New game</Link>
}
