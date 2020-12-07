'use strict'

// Setup
const bagInQuestion = 'shiny_gold'
const childBagRule = /^(\w+ \w+) bags contain no other bags\.$/
const parentBagRule = /^(\w+ \w+) bags contain .*$/
const findChildren = /((\d+) (\w+ \w+) bags?)/g

const bagParents = {}
const findParents = bagType => {
  let possibleParents = bagParents[bagType]
  if (possibleParents) {
    let otherParents = new Set([...possibleParents])
    possibleParents.forEach(parent =>{
      let op = findParents(parent)
      if (op) {
        otherParents = new Set([...otherParents, ...op])
      }
    })
    possibleParents = new Set([...possibleParents, ...otherParents])
  }
  if (possibleParents) {
    return possibleParents
  }
}

// Part 1
// ======

const part1 = input => {
  input.split('\n')
    .forEach(rule => {
      let childMatch = rule.match(childBagRule)
      if (!childMatch){
        let [parentBag] = rule.match(parentBagRule).slice(1)
        let key = parentBag.replace(' ', '_')
        let children = rule.matchAll(findChildren)
        for (const child of children) {
          let childKey = child[3].replace(' ', '_')
          if (!bagParents[childKey]) {
            bagParents[childKey] = new Set()
          }
          bagParents[childKey].add(key)
        }
      }
        
    })
  return findParents(bagInQuestion).size
}

// Part 2
// ======

const part2 = input => {
  return null
}

module.exports = { part1, part2 }

// 7:15 AM start
// 8:11 AM passing unit test for part 1
// 8:13 AM part 1