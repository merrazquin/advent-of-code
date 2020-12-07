'use strict'

const TreeModel = require('tree-model')

// Setup
const bagInQuestion = 'shiny_gold'
const childBagRule = /^(\w+ \w+) bags contain no other bags\.$/
const parentBagRule = /^(\w+ \w+) bags contain .*$/
const findChildren = /((\d+) (\w+ \w+) bags?)/g

const bagParents = {}
const bagChildren = {}

const tree = new TreeModel()
let bagTree

const parseTree = (parentNode, nodeName, count) => {
  let node
  for(var i = 0; i < count; i++) {
    node = tree.parse({name: nodeName, count: count, children: []})
    const children = bagChildren[nodeName]
    if (children) {
      for (const child in children) {
        parseTree(node, child, children[child])
      }
    }
    parentNode.all(pn => pn.model.name === parentNode.model.name).forEach(pn => pn.addChild(node))
  }
  if (parentNode.isRoot()){
    return node
  }
}
const processData = input => {
  input.split('\n')
    .forEach(rule => {
      let childMatch = rule.match(childBagRule)
      if (childMatch) {
        const childKey = childMatch[1].replace(' ', '_')
        bagChildren[childKey] = 0
      } else {
        let [parentBag] = rule.match(parentBagRule).slice(1)
        let key = parentBag.replace(' ', '_')
        let children = rule.matchAll(findChildren)
        bagChildren[key] = {}
        for (let child of children) {
          let childKey = child[3].replace(' ', '_')
          let bagCount = parseInt(child[2])
          bagChildren[key][childKey] = bagCount
          if (!bagParents[childKey]) {
            bagParents[childKey] = new Set()
          }
          bagParents[childKey].add(key)
        }
      }
    })

  // start with shiny gold
  bagTree = tree.parse({ name: 'root', count: 1, children: [] })
  bagTree = parseTree(bagTree, 'shiny_gold', 1)
  return bagTree
}

const findParents = bagType => {
  let possibleParents = bagParents[bagType]
  if (possibleParents) {
    let otherParents = new Set([...possibleParents])
    possibleParents.forEach(parent => {
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

const findBagCount = (bagType) => {
  let rootBag = bagTree.first(node => node.model.name == bagType)
  if (!rootBag.hasChildren()) {
    return 1
  }
  return rootBag.all().length - 1
}

// Part 1
// ======
const part1 = input => {
  processData(input)
  return findParents(bagInQuestion).size
}

// Part 2
// ======

const part2 = input => {
  processData(input)
  return findBagCount('shiny_gold')
}

module.exports = { part1, part2, processData, findBagCount }

// 7:15 AM start
// 8:11 AM passing unit test for part 1
// 8:13 AM part 1