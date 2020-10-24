import React from 'react'

import ItemIcon from './ItemIcon'

export default function ControlCard({ type, color, onClick }) {
  return (
    <div
      style={{
        width: 120,
        height: 200,
        margin: 20,
        background: 'orange',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 60,
      }}
      onClick={onClick}
    >
      <ItemIcon type={type} color={color} />
    </div>
  )
}
