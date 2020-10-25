const _ = require('lodash')
const { permute } = require('./utils')

const WHITE = 'white'
const GREEN = 'green'
const RED = 'red'
const BLUE = 'blue'
const GREY = 'grey'

const BOTTLE = 'bottle'
const GHOST = 'ghost'
const CHAIR = 'chair'
const BOOK = 'book'
const MOUSE = 'mouse'

function hasCorrectItem({ bottle, ghost, chair, book, mouse }) {
  if (bottle === GREEN) {
    return true
  }
  if (ghost === WHITE) {
    return true
  }
  if (chair === RED) {
    return true
  }
  if (book === BLUE) {
    return true
  }
  if (mouse === GREY) {
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
  const allItems = [BOTTLE, GHOST, CHAIR, BOOK, MOUSE]
  const allColors = [GREEN, BLUE, WHITE, GREY, RED]
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
    ...makeCardsForItem(BOTTLE, GREEN),
    ...makeCardsForItem(GHOST, WHITE),
    ...makeCardsForItem(CHAIR, RED),
    ...makeCardsForItem(BOOK, BLUE),
    ...makeCardsForItem(MOUSE, GREY),
  ]
}

const cards = makeCards()

function shuffleCards() {
  return _.shuffle(cards)
}

module.exports = { shuffleCards, hasCorrectItem }
