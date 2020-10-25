import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWineBottle,
  faGhost,
  faCouch,
  faBook,
  faMouse,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { BLUE, GREEN, GREY, RED, WHITE } from '../app/constants'

const colors = {
  [BLUE]: 'rgb(37, 84, 196)',
  [RED]: '#e9290f',
  [GREY]: 'rgb(106, 106, 106)',
  [GREEN]: 'rgb(64, 136, 31)',
  [WHITE]: '#f8f9fc',
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
