import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWineBottle,
  faGhost,
  faCouch,
  faBook,
  faMouse,
} from '@fortawesome/free-solid-svg-icons'

const colors = {
  blue: 'rgb(37, 84, 196)',
  red: '#e9290f',
  grey: 'rgb(106, 106, 106)',
  green: 'rgb(64, 136, 31)',
  white: '#f8f9fc',
}

const mapping = {
  bottle: faWineBottle,
  ghost: faGhost,
  chair: faCouch,
  book: faBook,
  mouse: faMouse,
}

export default function ItemIcon({ type, color, size, style }) {
  return (
    <FontAwesomeIcon
      icon={mapping[type]}
      style={{ color: colors[color], fontSize: size, ...style }}
    />
  )
}
