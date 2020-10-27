import ItemIcon from './ItemIcon'

const size = 300

export default function RoundCard({ card }) {
  const [smallItem, largeItem, smallItemPosition] = card
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: size,
        height: size,
        background: '#ff9800',
        padding: 40,
      }}
    >
      <ItemIcon
        type={smallItem[0]}
        color={smallItem[1]}
        size={30 * 1}
        style={{ margin: 5 }}
      />
      <ItemIcon
        type={largeItem[0]}
        color={largeItem[1]}
        size={30 * 1}
        style={{ margin: 5 }}
      />
    </div>
  )
}
