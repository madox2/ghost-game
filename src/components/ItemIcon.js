import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWineBottle,
  faGhost,
  faCouch,
  faBook,
  faMouse,
} from '@fortawesome/free-solid-svg-icons'

const mapping = {
  bottle: faWineBottle,
  ghost: faGhost,
  chair: faCouch,
  book: faBook,
  mouse: faMouse,
}

export default function ItemIcon({ type, color }) {
  return <FontAwesomeIcon icon={mapping[type]} style={{ color }} />
}
