let id = 1
const generateId = () => ++id

function permute(inputArr) {
  var results = []

  function permutator(arr, memo) {
    var cur,
      memo = memo || [] // eslint-disable-line

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1)
      if (arr.length === 0) {
        results.push(memo.concat(cur))
      }
      permutator(arr.slice(), memo.concat(cur))
      arr.splice(i, 0, cur[0])
    }

    return results
  }

  return permutator(inputArr)
}

module.exports = { permute, generateId }
