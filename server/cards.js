const { combine } = require('./utils')

const _ = require('lodash')

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

const type2color = {
  [BOTTLE]: GREEN,
  [GHOST]: WHITE,
  [CHAIR]: RED,
  [BOOK]: BLUE,
  [MOUSE]: GREY,
}

function randomPosition() {
  return [_.random(0, 10), _.random(0, 10)]
}

function getTypeColor(type) {
  return type2color[type]
}

const allTypes = [BOTTLE, GHOST, CHAIR, BOOK, MOUSE]
const allColors = [GREEN, BLUE, WHITE, GREY, RED]

function makeCardsForType(correctType, correctColor) {
  const types = allTypes.filter((i) => i !== correctType)
  const colors = allColors.filter((c) => c !== correctColor)
  const typeCombinations = combine(types, 2)
  const wrongCards = _.flatMap(typeCombinations, ([type1, type2]) => {
    const color1 = getTypeColor(type1)
    const color2 = getTypeColor(type2)
    const typeColors = colors.filter((c) => c !== color1 && c !== color2)
    return [
      _.zip([type1, type2], typeColors),
      _.zip([type2, type1], typeColors),
    ]
  })

  const [wrongType] = _.shuffle(types)
  const wrongColor = _.shuffle(colors).find(
    (c) => c !== getTypeColor(wrongType)
  )
  const oneCorrectCard = [
    [correctType, correctColor],
    [wrongType, wrongColor],
  ]
  return [...wrongCards, oneCorrectCard]
}

function makeCards() {
  const cards = [
    ...makeCardsForType(BOTTLE, GREEN),
    ...makeCardsForType(GHOST, WHITE),
    ...makeCardsForType(CHAIR, RED),
    ...makeCardsForType(BOOK, BLUE),
    ...makeCardsForType(MOUSE, GREY),
  ].map((card) => [...card, randomPosition()])
  return cards
}

function shuffleCards() {
  return _.shuffle(makeCards())
}

function isCorrectAnswer(card, type) {
  const [item1, item2] = card
  const color = getTypeColor(type)
  return (
    [item1, item2].every(([t, c]) => t !== type && c !== color) ||
    [item1, item2].some(([t, c]) => t === type && c === color)
  )
}

module.exports = { shuffleCards, isCorrectAnswer }
