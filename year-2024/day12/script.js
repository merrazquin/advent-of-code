'use strict'
const { findNeighbors, sumAll } = require('../../utils')

// Setup
const preProcessing = input => {
    let grid = input.trim().split('\n')
    const width = grid[0].length
    grid = grid.join('').split('')
    return {grid, width}
}

const storePerimeterSegments = (neighbors, perimeterSides, grid, width, index) => {
    const row = Math.floor(index / width)
    const col = index % width
    const currentNode = grid[index]
    const [N, E, S, W] = neighbors
    if (N === '' || grid[N] !== currentNode) {
        const key = `${row}_north`
        if (!perimeterSides.has(key)) {
            perimeterSides.set(key, new Set())
        }
        const set = perimeterSides.get(key)
        set.add(index)
        perimeterSides.set(key, set)
    }
    if (E === '' || grid[E] !== currentNode) {
        const key = `${col}_east`
        if (!perimeterSides.has(key)) {
            perimeterSides.set(key, new Set())
        }
        const set = perimeterSides.get(key)
        set.add(index)
        perimeterSides.set(key, set)
    }
    if (S === '' || grid[S] !== currentNode) {
        const key = `${row}_south`
        if (!perimeterSides.has(key)) {
            perimeterSides.set(key, new Set())
        }
        const set = perimeterSides.get(key)
        set.add(index)
        perimeterSides.set(key, set)
    }
    if (W === '' || grid[W] !== currentNode) {
        const key = `${col}_west`
        if (!perimeterSides.has(key)) {
            perimeterSides.set(key, new Set())
        }
        const set = perimeterSides.get(key)
        set.add(index)
        perimeterSides.set(key, set)
    }    
}

const createArea = (grid, width, index, processed, existingArea = new Map(), perimeterSides = new Map()) => {
    if (processed.has(index)) {
        return existingArea
    }
    processed.add(index)

    const currentNode = grid[index]
    const neighbors = findNeighbors(index, grid, width, false, true)

    storePerimeterSegments(neighbors, perimeterSides, grid, width, index)

    const nodePerimeters =  neighbors.filter(neighbor => neighbor === '' || grid[neighbor] !== currentNode).length
    existingArea.set(index, nodePerimeters)

    for (let neighborIndex of neighbors.filter(neighbor => !processed.has(neighbor) && neighbor !== '' && grid[neighbor] === currentNode)) {
        createArea(grid, width, neighborIndex, processed, existingArea, perimeterSides)
    }
    return existingArea
}
// Part 1
// ======

const part1 = input => {
    const {grid, width} = preProcessing(input)

    // start on a point in the grid (top, left)
    // find all neighbors of matching letter, and add them to the area
    // - perimeter segment will be number of non-matching neighbors
    // move on to next un-processed point in grid
    // perimeter for an area can be calculated by multiplying the size by the total perimeter segments

    const processed = new Set()
    let tally = 0
    let toBeProcessed = 0
    while (toBeProcessed !== -1) {
        const someArea = createArea(grid, width, toBeProcessed, processed)
        tally += (someArea.size * sumAll([...someArea.values()]))
        toBeProcessed = grid.findIndex((_, index) => !processed.has(index))
    }
    return tally
}

// Part 2
// ======

const part2 = input => {
    const {grid, width} = preProcessing(input)

    const processed = new Set()
    let tally = 0
    let toBeProcessed = 0
    while (toBeProcessed !== -1) {
        const perimeterSides = new Map()
        const someArea = createArea(grid, width, toBeProcessed, processed, new Map(), perimeterSides)
        const perimeterSegments = [...perimeterSides.entries()].map(tuple => {
            const [label, set] = tuple
            const arr = Array.from(set).sort((a, b) => a - b)
            const direction = label.split('_').pop()
            let stepSize = ['north', 'south'].includes(direction) ? 1 : width
            let segments = 1
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] - arr[i - 1] !== stepSize) {
                    segments++
                }
            }
            return segments
        })
        tally += (someArea.size * sumAll(perimeterSegments))
        toBeProcessed = grid.findIndex((_, index) => !processed.has(index))
    }
    return tally
}

module.exports = { part1, part2 }
