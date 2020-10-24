import ItemIcon from './ItemIcon'

export default function RoundCard({ card }) {
  return card.map(([type, color]) => <ItemIcon type={type} color={color} />)
}
