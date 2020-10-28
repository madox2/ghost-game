import React from 'react'

import { DisabledBackdrop } from './DisabledBackdrop'
import ItemIcon from './ItemIcon'

const cols = [0, 1, 2, 3]
const rows = cols

const padding = 40
const size = 300
const cellSize = (size - 2 * padding - 30 * 5) / cols.length

function renderCell(row, col, card) {
  const item = card.find(
    ([type, color, size, position]) =>
      position[0] === row && position[1] === col
  )
  if (!item) {
    return null
  }
  const [type, color, size] = item
  return (
    <ItemIcon
      type={type}
      color={color}
      size={30 * size}
      style={{ margin: 5 }}
    />
  )
}

export default function RoundCard({ card, disabled }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#ff9800',
        padding,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {disabled && <DisabledBackdrop />}
      <table>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              {cols.map((col) => (
                <td key={col} style={{ padding: 0, border: 'none' }}>
                  <div
                    style={{
                      minWidth: cellSize,
                      minHeight: cellSize,
                    }}
                  >
                    {renderCell(row, col, card)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
