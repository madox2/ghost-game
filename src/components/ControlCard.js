import React from 'react'

import { DisabledBackdrop } from './DisabledBackdrop'
import ItemIcon from './ItemIcon'

export default function ControlCard({ type, color, onClick, disabled }) {
  return (
    <div
      style={{
        width: 120,
        height: 200,
        margin: 20,
        background: '#ff9800',
        cursor: disabled ? undefined : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 60,
        position: 'relative',
      }}
      onClick={disabled ? undefined : onClick}
    >
      {disabled && <DisabledBackdrop />}
      <ItemIcon type={type} color={color} />
    </div>
  )
}
