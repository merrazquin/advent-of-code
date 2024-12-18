'use strict'
const { Graph, astar, sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(pos => {
    const [x, y] = pos.split(',').map(num => parseInt(num))
    return {x,y}
})

// Setup
const getPath = (grid) => {
    const graph = new Graph(grid)
    const start = graph.nodes[0]
    const end = graph.nodes[graph.nodes.length - 1]
    const path = astar.search(graph, start, end)
    return sumAll(path.map(node => node.weight))
}

// Part 1
// ======

const part1 = (input, range = 70, bytes = 1024) => {
    const bytePositions = preProcessing(input)
    const grid = Array.from({ length: range + 1 }, () => Array(range + 1).fill(1));
    for (let i = 0; i < bytes; i++) {
        const {x, y} = bytePositions[i]
        grid[y][x] = 0
    }
    return getPath(grid)
}

// Part 2
// ======

const part2 = (input, range = 70, bytes = 1024) => {
    const bytePositions = preProcessing(input)
    const grid = Array.from({ length: range + 1 }, () => Array(range + 1).fill(1));
    for (let i = 0; i < bytes; i++) {
        const {x, y} = bytePositions[i]
        grid[y][x] = 0
    }
    
    for (let i = bytes; i < bytePositions.length; i++) {
        const {x,y} = bytePositions[i]
        grid[y][x] = 0
        if (!getPath(grid)) {
            return `${x},${y}`
        }
    }
}

module.exports = { part1, part2 }
