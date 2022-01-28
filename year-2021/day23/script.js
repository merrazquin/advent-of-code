'use strict'
const { findNeighbors, sumAll, chunk, Graph, astar, multiplyAll, convertRowsToCols } = require('../../utils')

const energyConsumption = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
}
// Setup
class Amphipod {
    constructor (color, initColumn, initDepth) {
        this.color = color
        this.currPosition = initColumn + '_' + initDepth
        this.energyConsumption = energyConsumption[color]
    }
}

const parseInput = input => {
    const rows = input.trim().split('\n')
    const grid = rows.map(row => row.split('').map(char => (char === '#' || char === ' ') ? 0 : 1 ))
    let graph = new Graph(convertRowsToCols(grid))
    const foundNode = graph.nodes.find(node => node.y == 3 && node.x == 5)
    console.log(foundNode)
    const colors = ['A', 'B', 'C', 'D']
    const openSpaces = rows.shift().split('').filter(char => char !== '#').length
    const amphipods = rows.map((row, rowIndex) => row.split('').filter(char => (char !== '#' && char !== ' ')).map((char, colIndex) => {
        return new Amphipod(char, colors[colIndex], rowIndex)
    }))
    const startBuffer = (openSpaces - 7) / 2
    
    return {openSpaces, amphipods}
}
// Part 1
// ======

const part1 = input => {
    return parseInput(input)
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }
