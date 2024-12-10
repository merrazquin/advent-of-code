'use strict'
const { sumAll, findNeighbors } = require('../../utils')

// Setup
const preProcessing = input => {
    let grid = input.trim().split('\n')
    const width = grid[0].length
    grid = grid.join('').split('').map(num => parseInt(num))
    return {grid, width}
}

// Heavy lifting: https://www.geeksforgeeks.org/count-possible-paths-two-vertices/
let nodeCount
let adj
const Graph = v => {
    nodeCount = v
    adj = new Array(v)
    for (let i = 0; i < v; ++i)
        adj[i] = []
}
const addEdge = (v, w) => {
    adj[v].push(w)
}

const countPathsUtil = (start, end, pathCount) => {
    if (start === end) {
        pathCount++
    }

    else {
        for (let i = 0; i < adj[start].length; i++) {
            let n = adj[start][i]
            pathCount = countPathsUtil(n, end, pathCount)
        }
    }
    return pathCount
}

const countPaths = (start, end) => {
    let pathCount = 0
    pathCount = countPathsUtil(start, end, pathCount)
    return pathCount
}

// Part 1
// ======

const part1 = input => {
    const {grid, width} = preProcessing(input)

    Graph(grid.length)
    grid.forEach((nodeValue, nodeIndex) => {
        const neighbors = findNeighbors(nodeIndex, grid, width, false, true)
        const nextIndices = grid.map((neighborValue, neighborIndex) => neighbors.includes(neighborIndex) && neighborValue == nodeValue+1 ? neighborIndex : -1).filter(neighborIndex => neighborIndex !== -1) 
        nextIndices.forEach(neighborIndex => {
            addEdge(nodeIndex, neighborIndex)
        })
    })

    let match
    const startIndices = []
    const stopIndices = []
    const startsAndStopsRe = /0|9/g
    const gridAsString = grid.join('')
    while (match = startsAndStopsRe.exec(gridAsString)) {
        if (match[0] === '0') {
            startIndices.push(match.index)
        } else {
            stopIndices.push(match.index)
        }
    }

    let tally = 0
    for (let startIndex of startIndices) {
        for (let stopIndex of stopIndices) {
            if (countPaths(startIndex, stopIndex) > 0) tally++
        }
    }
    return tally

}

// Part 2
// ======

const part2 = input => {
    const {grid, width} = preProcessing(input)

    Graph(grid.length)
    grid.forEach((nodeValue, nodeIndex) => {
        const neighbors = findNeighbors(nodeIndex, grid, width, false, true)
        const nextIndices = grid.map((neighborValue, neighborIndex) => neighbors.includes(neighborIndex) && neighborValue == nodeValue+1 ? neighborIndex : -1).filter(neighborIndex => neighborIndex !== -1) 
        nextIndices.forEach(neighborIndex => {
            addEdge(nodeIndex, neighborIndex)
        })
    })

    let match
    const startIndices = []
    const stopIndices = []
    const startsAndStopsRe = /0|9/g
    const gridAsString = grid.join('')
    while (match = startsAndStopsRe.exec(gridAsString)) {
        if (match[0] === '0') {
            startIndices.push(match.index)
        } else {
            stopIndices.push(match.index)
        }
    }

    let tally = 0
    for (let startIndex of startIndices) {
        for (let stopIndex of stopIndices) {
            tally += countPaths(startIndex, stopIndex)
        }
    }
    return tally
}

module.exports = { part1, part2 }
