'use strict'

const TreeModel = require('tree-model')
const tree = new TreeModel()

/**
 * Converts data in the form of: 
 * {
 *   light_red: { bright_white: 1, muted_yellow: 2 },
 *   dark_orange: { bright_white: 3, muted_yellow: 4 },
 *   bright_white: { shiny_gold: 1 },
 *   muted_yellow: { shiny_gold: 2, faded_blue: 9 },
 *   shiny_gold: { dark_olive: 1, vibrant_plum: 2 },
 *   dark_olive: { faded_blue: 3, dotted_black: 4 },
 *   vibrant_plum: { faded_blue: 5, dotted_black: 6 },
 *   faded_blue: 0,
 *   dotted_black: 0
 * }
 * into a tree
 * @param {*} data 
 * @param {*} parentNode - node's parent
 * @param {*} name - node label
 * @param {number} count - number of times this node should be added to parents
 */
const parseTree = (data, parentNode, name, count) => {
    let node
    for(var i = 0; i < count; i++) {
        node = tree.parse({name, count, children: []})
        const children = data[name]
        if (children) {
            for (const child in children) {
                parseTree(data, node, child, children[child])
            }
        }
        parentNode.all(foundParentNode => foundParentNode.model.name === parentNode.model.name)
            .forEach(foundParentNode => foundParentNode.addChild(node))
    }
    return node
}
module.exports = { parseTree }
