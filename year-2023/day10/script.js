'use strict'

const { findNeighbors, getNeighboringCell } = require("../../utils")

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
const part1 = (input, prepP2 = false) => {
    const {width, flatGrid} = preProcessing(input)
    const startPosition = flatGrid.indexOf('S')
    const path = [startPosition]
    let nextTile = findNextTile(startPosition, flatGrid, width)
    while (flatGrid[nextTile] !== 'S') {
        const prevTile = path[path.length - 1]
        path.push(nextTile)

        nextTile = findNextTile(nextTile, flatGrid, width, prevTile)
    }
    return prepP2 ? {width, flatGrid, path} : path.length / 2
}

// Part 2
// credit where it's due: https://www.reddit.com/r/adventofcode/comments/18eza5g/2023_day_10_animated_visualization/
// full disclosure: this only passes one of the 3 test cases... but it works for my input ¯\_(ツ)_/¯ 
// ======

const part2 = input => {
    const {width, flatGrid, path} = part1(input, true)

    let count = 0
    let insideCount = 0

    flatGrid.forEach((_, tile) => {
        const inPath = path.indexOf(tile)
        const southernTile = getNeighboringCell(tile, 'S', flatGrid, width)

        if (southernTile === -1) {
            return
        }

        const southernTileInPath = path.indexOf(southernTile)
        if (inPath === -1 && count !== 0) {
            insideCount++
        }

        if (inPath !== -1 && southernTileInPath !== -1) {
            const diff = inPath - southernTileInPath
            if (Math.abs(diff) === 1) {
                count += diff
            }
        }
    });
    return insideCount
}

module.exports = { part1, part2 }
