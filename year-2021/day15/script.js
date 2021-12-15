'use strict'

const { Graph, astar, sumAll } = require('../../utils')

// Setup
const getLowestRisk = grid => {
    const graph = new Graph(grid)
    const start = graph.nodes[0]
    const end = graph.nodes[graph.nodes.length - 1]
    const path = astar.search(graph, start, end)
    return sumAll(path.map(node => node.weight))    
}

const increaseRisk = col => col + 1 > 9 ? 1 : (col + 1)

// Part 1
// ======

const part1 = input => {
    const grid = input.trim().split('\n').map(row => row.split('').map(num => parseInt(num)))
    return getLowestRisk(grid)
}

// Part 2
// ======

const part2 = (input, expansionFactor = 4) => {
    let grid = input.trim().split('\n').map(row => row.split('').map(num => parseInt(num)))

    // first, expand to the right
    grid = grid.map(row => {
        let expansion = row.slice()
        for (let step = 0; step < expansionFactor; step++) {
            expansion = expansion.map(increaseRisk)
            row.push(...expansion)
        }
        return row
    })
    // then expand down
    let expansion = grid.slice()
    for (let step = 0; step < expansionFactor; step++) {
        expansion = expansion.map(row => row.map(increaseRisk))
        grid.push(... expansion)
    }
    return getLowestRisk(grid)
}

module.exports = { part1, part2 }
