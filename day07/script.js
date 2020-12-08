'use strict'

const TreeModel = require('tree-model')

// Setup
const SHINY_GOLD_BAG = 'shiny_gold'
const childBagRule = /^(\w+ \w+) bags contain no other bags\.$/
const parentBagRule = /^(\w+ \w+) bags contain .*$/
const findChildren = /((\d+) (\w+ \w+) bags?)/g

const tree = new TreeModel()

const parseTree = (bagChildren, parentNode, nodeName, count) => {
    let node
    for(var i = 0; i < count; i++) {
        node = tree.parse({name: nodeName, count: count, children: []})
        const children = bagChildren[nodeName]
        if (children) {
            for (const child in children) {
                parseTree(bagChildren, node, child, children[child])
            }
        }
        parentNode.all(pn => pn.model.name === parentNode.model.name).forEach(pn => pn.addChild(node))
    }
    if (parentNode.isRoot()){
        return node
    }
}

/**
 * Create a TreeModel of all bags
 * @param {string} input 
 */
const createBagTree = input => {
    const bagChildren = {}
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
                }
            }
        })

    // start with shiny gold
    const bagTree = tree.parse({ name: 'root', count: 1, children: [] })
    return parseTree(bagChildren, bagTree, SHINY_GOLD_BAG, 1)
}

/**
 * Associate bags with their possible parents
 * @param {string} input 
 */
const getBagParents = input => {
    const bagParents = {}
    input.split('\n')
        .forEach(rule => {
            let childMatch = rule.match(childBagRule)
            if (!childMatch) {
                let [parentBag] = rule.match(parentBagRule).slice(1)
                let key = parentBag.replace(' ', '_')
                let children = rule.matchAll(findChildren)
                for (let child of children) {
                    let childKey = child[3].replace(' ', '_')
                    if (!bagParents[childKey]) {
                        bagParents[childKey] = new Set()
                    }
                    bagParents[childKey].add(key)
                }
            }
        })

    return bagParents
}

/**
 * Find all possible parents for a given bag type
 * @param {*} bagParents 
 * @param {string} bagType 
 */
const findParents = (bagParents, bagType) => {
    let possibleParents = bagParents[bagType]
    if (possibleParents) {
        let otherParents = new Set([...possibleParents])
        possibleParents.forEach(parent => {
            let op = findParents(bagParents, parent)
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

/**
 * Find the total number of bags contained withtin the given bag
 * @param {TreeModel.Node<T>} bagTree 
 * @param {string} bagType 
 */
const findBagCount = (bagTree, bagType) => {
    let rootBag = bagTree.first(node => node.model.name == bagType)
    if (!rootBag.hasChildren()) {
        return 1
    }
    return rootBag.all(node => node != rootBag).length
}

// Part 1
// ======
const part1 = input => {
    return findParents(getBagParents(input), SHINY_GOLD_BAG).size
}

// Part 2
// ======
const part2 = input => {
    return findBagCount(createBagTree(input), SHINY_GOLD_BAG)
}

module.exports = { part1, part2, processData: getBagParents, createBagTree, findBagCount }

// 7:15 AM start
// 8:11 AM passing unit test for part 1
// 8:13 AM part 1