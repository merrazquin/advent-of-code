'use strict'

const { findNeighbors } = require("../../utils")

// Setup
const tiles = {
    'S': ['N', 'S', 'E', 'W'],
    '|': ['N', 'S'], // |
    '-': ['E', 'W'], // -
    'L': ['N', 'E'], // |_
    'J': ['N', 'W'], // _|
    '7': ['S', 'W'], // ‾|
    'F': ['S', 'E'], // |‾
    '.': []
}

const preProcessing = (input) => {
    const rows = input.trim().split('\n')
    return {
        width: rows[0].length,
        flatGrid: rows.map(row => row.split('')).flat()
    }
}
const findNextTile = (position, flatGrid, width, prev = undefined) => {
    const currCharacter = flatGrid[position]
    const [N, E, S, W] = findNeighbors(position, flatGrid, width, false, true)
    if (N !== prev && !isNaN(parseInt(N)) && tiles[currCharacter].includes('N') && tiles[flatGrid[N]].includes('S')) {
        return N
    }
    if (E !== prev && !isNaN(parseInt(E)) && tiles[currCharacter].includes('E') && tiles[flatGrid[E]].includes('W')) {
        return E
    }
    if (S !== prev && !isNaN(parseInt(S)) && tiles[currCharacter].includes('S') && tiles[flatGrid[S]].includes('N')) {
        return S
    }
    if (W !== prev && !isNaN(parseInt(W)) && tiles[currCharacter].includes('W') && tiles[flatGrid[W]].includes('E')) {
        return W
    }
}
// Part 1
// ======
const part1 = input => {
    const {width, flatGrid} = preProcessing(input)
    const startPosition = flatGrid.indexOf('S')
    const path = [startPosition]
    
    let nextTile = findNextTile(startPosition, flatGrid, width)
    while (flatGrid[nextTile] !== 'S') {
        const prevTile = path[path.length - 1]
        path.push(nextTile)

        nextTile = findNextTile(nextTile, flatGrid, width, prevTile)
    }

    return path.length / 2
}

// Part 2
// ======

const part2 = input => {
    return 0
}

module.exports = { part1, part2 }
