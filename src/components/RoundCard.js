import ItemIcon from './ItemIcon'

const size = 300

function renderCell(row, col, card, scale) {
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
      size={30 * size * scale}
      style={{ margin: 5 * scale }}
    />
  )
}

export default function RoundCard({ card, scale = 1 }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: size * scale,
        height: size * scale,
        background: '#ff9800',
        padding: 40 * scale,
      }}
    >
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {[0, 1, 2].map((col) => (
            <div
              key={col}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderCell(row, col, card, scale)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
