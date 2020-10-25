import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWineBottle,
  faGhost,
  faCouch,
  faBook,
  faMouse,
} from '@fortawesome/free-solid-svg-icons'

const colors = {
  blue: '#00658c',
  red: '#e9290f',
  grey: '#7d7d7a',
  green: '#2b580c',
  white: '#f8f9fc',
}

const mapping = {
  bottle: faWineBottle,
  ghost: faGhost,
  chair: faCouch,
  book: faBook,
  mouse: faMouse,
}

export default function ItemIcon({ type, color, size }) {
  return (
    <FontAwesomeIcon
      icon={mapping[type]}
      style={{ color: colors[color], fontSize: size }}
    />
  )
}
