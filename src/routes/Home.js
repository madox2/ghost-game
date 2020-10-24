import { Link } from 'react-router-dom'

import SimpleTemplate from '../components/SimpleTemplate'

export default function Home() {
  return (
    <SimpleTemplate>
      <Link to={`/game/${Date.now()}`}>New game</Link>
    </SimpleTemplate>
  )
}
