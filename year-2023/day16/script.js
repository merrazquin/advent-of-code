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
const findPath = (currentPos, currentDirection, flatGrid, width, paths, energizedCells) => {
    if (currentPos === '') {
        return
    }

    const key = `${currentPos}_${currentDirection}`
    if (paths.has(key)) {
        return
    }
    paths.set(key, true)
    energizedCells.add(currentPos)

    const [N, E, S, W] = findNeighbors(currentPos, flatGrid, width, false, true)
    const neighbors = {N, E, S, W}
    const nextDirection = mirrorsAndSplitters[flatGrid[currentPos]][currentDirection]

    if (Array.isArray(nextDirection)) {
        // split
        for (const direction of nextDirection) {
            const nextPos = neighbors[direction]
            findPath(nextPos, direction, flatGrid, width, paths, energizedCells)
        }
    } else {
        const nextPos = neighbors[nextDirection]
        findPath(nextPos, nextDirection, flatGrid, width, paths, energizedCells)
    }
}

const getEnergizedCells = (startPos, initialDirection, flatGrid, width) => {
    const paths = new Map()
    const energized = new Set()

    findPath(startPos, initialDirection, flatGrid, width, paths, energized)

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