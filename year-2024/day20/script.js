'use strict'

const { Graph, astar, sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(row => row.split(''))

const getGridMetaData = grid => {
    const width = grid[0].length
    const flatGrid = grid.flat()
    const possibleCheats = findPossibleCheats(flatGrid, width)
    const startPoint = flatGrid.indexOf('S')
    const endPoint = flatGrid.indexOf('E')
    const [startY, startX] = [startPoint % width, Math.floor(startPoint / width)]
    const [endY, endX] = [endPoint % width, Math.floor(endPoint / width)]
    return {startX, startY, endX, endY, width, possibleCheats}
}

const getShortestPath = (graph, start, end) => {
    const path = astar.search(graph, start, end)
    return sumAll(path.map(node => node.weight))
}

const findPossibleCheats = (flatGrid, width) => {
    const walls = flatGrid.map((node, index) => node === '#' ? index : -1).filter(index => index !== -1)
    return walls.filter(node => {
        if (node < width || node >= flatGrid.length - width || node % width === 0 || node % width === width - 1) {
            return false
        }
        return true
    })
}

// Part 1
// ======

const part1 = (input, threshold = 100) => {
    const grid = preProcessing(input)
    const {startX, startY, endX, endY, width, possibleCheats} = getGridMetaData(grid)

    const graph = new Graph(grid.map(row => row.map(node => node === '#' ? 0 : 1)))
    const start = graph.nodes.find(node => `${node.x}_${node.y}` === `${startX}_${startY}`)
    const end = graph.nodes.find(node => `${node.x}_${node.y}` === `${endX}_${endY}`)
    const originalShortestPath = getShortestPath(graph, start, end)

    let currentCheat
    let cheatNode
    let tally = 0
    while (possibleCheats.length) {
        if (currentCheat) {
            cheatNode = graph.nodes[currentCheat]
            cheatNode.weight = 0
        }
        currentCheat = possibleCheats.shift()
        cheatNode = graph.nodes[currentCheat]
        cheatNode.weight = 1
        
        if (originalShortestPath - getShortestPath(graph, start, end) >= threshold) {
            tally++
        }
    }
    
    return tally
}

// Part 2
// ======

const part2 = (input, threshold = 100) => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
