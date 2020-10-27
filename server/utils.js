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

function combine(set, k) {
  let i, j, combs, head, tailcombs

  if (k > set.length || k <= 0) {
    return []
  }

  if (k === set.length) {
    return [set]
  }

  if (k === 1) {
    combs = []
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }
  combs = []
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1)
    tailcombs = combine(set.slice(i + 1), k - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}

module.exports = { permute, generateId, combine }
