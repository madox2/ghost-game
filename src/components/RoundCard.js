import ItemIcon from './ItemIcon'

const size = 300

function renderCell(row, col, card) {
  const item = card.find(
    ([type, color, size, position]) =>
      position[0] === row && position[1] === col
  )
  if (!item) {
    return null
  }
  const [type, color, size] = item
  return <ItemIcon type={type} color={color} size={30 * size} />
}

export default function RoundCard({ card }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: size,
        height: size,
        background: 'orange',
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
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderCell(row, col, card)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
