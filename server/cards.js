const _ = require('lodash')
const { permute } = require('./utils')

function hasCorrectItem({ bottle, ghost, chair, book, mouse }) {
  if (bottle === 'green') {
    return true
  }
  if (ghost === 'white') {
    return true
  }
  if (chair === 'red') {
    return true
  }
  if (book === 'blue') {
    return true
  }
  if (mouse === 'grey') {
    return true
  }
  return false
}

const sizes = [1, 2, 2.5]

const positions = []
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    positions.push([i, j])
  }
}

function makeCardsForItem(correctItem, correctColor) {
  const allItems = ['bottle', 'ghost', 'chair', 'book', 'mouse']
  const allColors = ['green', 'blue', 'white', 'grey', 'red']
  const items = allItems.filter((i) => i !== correctItem)
  const colors = allColors.filter((c) => c !== correctColor)
  const permutations = permute(colors)
  const mapping = permutations.map((cardColors) =>
    _.fromPairs(_.zip(items, cardColors))
  )
  const filtered = mapping.filter((m) => !hasCorrectItem(m))
  const result = filtered.map((mapped) => [
    [correctItem, correctColor],
    ..._.toPairs(mapped),
  ])
  return result
    .map((round) => {
      const pos = _.shuffle(positions)

      return round.map((item, i) => [
        ...item,
        sizes[_.random(0, sizes.length - 1)],
        pos[i],
      ])
    })
    .map((round) => _.shuffle(round))
}

function makeCards() {
  return [
    ...makeCardsForItem('bottle', 'green'),
    ...makeCardsForItem('ghost', 'white'),
    ...makeCardsForItem('chair', 'red'),
    ...makeCardsForItem('book', 'blue'),
    ...makeCardsForItem('mouse', 'grey'),
  ]
}

const cards = makeCards()

function shuffleCards() {
  return _.shuffle(cards)
}

module.exports = { shuffleCards, hasCorrectItem }
