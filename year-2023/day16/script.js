'use strict'

const { findNeighbors } = require('../../utils')

// Setup

const preProcessing = input => {
    const rows = input.split('\n').map(row => row.replace(/\\/g, 'B'))
    return {
        width: rows[0].length,
        flatGrid: rows.map(row => row.split('')).flat()
    }
}

const mirrorsAndSplitters = {
    '.': {
        'N': 'N',
        'S': 'S',
        'E': 'E',
        'W': 'W',
    },
    'B': {
        'E': 'S',
        'W': 'N',
        'N': 'W',
        'S': 'E'
    },
    '/': {
        'E': 'N',
        'W': 'S',
        'N': 'E',
        'S': 'W'
    },
    '|': {
        'E': ['N', 'S'],
        'W': ['N', 'S'],
        'N': 'N',
        'S': 'S'
    },
    '-': {
        'S': ['E', 'W'],
        'N': ['E', 'W'],
        'E': 'E',
        'W': 'W'
    }
}
// Part 1
// ======
const findPath = (startPos, currDirection, flatGrid, width, currPath, paths, energizedCells) => {
    energizedCells.add(startPos)
    currPath.add(startPos)
    const [N, E, S, W] = findNeighbors(startPos, flatGrid, width, false, true)
    const neighbors = {N, E, S, W}
    const nextTileIndex = neighbors[currDirection]

    if (!nextTileIndex) {
        return currPath
    }

    if (nextTileIndex) {
        currPath.add(nextTileIndex)
        const nextTile = flatGrid[nextTileIndex]
        const instruction = mirrorsAndSplitters[nextTile][currDirection]
        if (Array.isArray(instruction)) {
            // split
            for (const direction of instruction) {
                let splitKey = `${nextTileIndex}_${direction}`
                if (paths.has(splitKey)) {
                    return
                }
                const splitPath = new Set()
                paths.set(splitKey, splitPath)
                findPath(nextTileIndex, direction, flatGrid, width, splitPath, paths, energizedCells)
            }
        } else {
            return findPath(nextTileIndex, instruction, flatGrid, width, currPath, paths, energizedCells)
        }
    }

    return currPath
}
const getEnergizedCells = (startPos, initialDirection, flatGrid, width) => {
    const paths = new Map()
    const currPath = new Set()
    paths.set(startPos, currPath)
    
    let currDirection = mirrorsAndSplitters[flatGrid[startPos]][initialDirection]
    const energized = new Set()
    if (Array.isArray(currDirection)) {
        // split
        for (const direction of currDirection) {
            let splitKey = `${startPos}_${direction}`
            if (paths.has(splitKey)) {
                return
            }
            const splitPath = new Set()
            paths.set(splitKey, splitPath)
            findPath(startPos, direction, flatGrid, width, splitPath, paths, energized)
        }
    } else {
        findPath(startPos, currDirection, flatGrid, width, currPath, paths, energized)
    }

    return energized.size
}

const part1 = input => {
    const {width, flatGrid} = preProcessing(input)
    return getEnergizedCells(0, 'E', flatGrid, width)
}

// Part 2
// ======

const part2 = input => {
    const {width, flatGrid} = preProcessing(input)
    const results = new Set()
    let i
    // top row
    for (i = 0; i < width; i++) {
        results.add(getEnergizedCells(i, 'S', flatGrid, width))
    }
    // bottom row
    for(i = (flatGrid.length - width); i < flatGrid.length; i++) {
        results.add(getEnergizedCells(i, 'N', flatGrid, width))
    }
    // left col
    for(i = 0; i < flatGrid.length; i+= width) {
        results.add(getEnergizedCells(i, 'E', flatGrid, width))
    }
    // right col
    for(i = (width - 1); i < flatGrid.length; i+= width) {
        results.add(getEnergizedCells(i, 'W', flatGrid, width))
    }

    return Math.max(... Array.from(results))
}

module.exports = { part1, part2 }
