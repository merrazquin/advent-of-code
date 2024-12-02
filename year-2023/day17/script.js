'use strict'
const { findNeighbors } = require('../../utils')

// Setup
const preProcessing = (input) => {
    const rows = input.trim().split('\n')
    const width = rows[0].length
    return {
        width,
        flatGrid: rows.map(row => row.split('').map(cell => parseInt(cell))).flat()
    }
}

// Part 1
// ======
/* aStar copied & modified from 2022.12 */

const flatManhattan = (start, end, width) => {
    const dx = Math.abs(Math.floor(start / width) - Math.floor(end / width))
    const dy = Math.abs((start % width) - (end % width))
    return dx + dy
}
const gScore = (node, log) => {
    let score = 0
    while (node) {
        if (log) {
            console.log(node.index, node.heatLoss)
        }
        score += node.heatLoss
        node = node.parent
    }
    return score
}

const directionCalc = (node, log) => {
    let diffs = []
    if (node.index === 0) return 0
    while (node && diffs.length <= 2) {
        if (node.parent) {
            diffs.push(node.parent.index - node.index)
        }
        node = node.parent
    }

    const diffSet = new Set(diffs)
    // console.log(diffs)
    if (diffs.length === 2 && diffSet.size === 1) {
        return diffs.pop()
    }
    return 0
}

const astar = (openList, target, flatGrid, width) => {
    const closedList = []
    // TODO: track how long traveled in one direction
    let currentDirection = ''
    let previousDirection = ''
    let currentDirectionCount = 0
    while (openList.length) {
        openList.sort((a, b) => a.f - b.f)
        const currentNode = openList.shift()
        closedList.push(currentNode)
        const foundTarget = closedList.find(node => node.index === target)

        if (foundTarget) {
            // console.log('got to target', gScore(foundTarget, true))
            return foundTarget
        }

        // const [N, E, S, W] = findNeighbors(currentNode.index, flatGrid, width, false, true)
        // const neighbors = []
        // if (openList.length === 3 || closedList.length === 3) {
        //     console.log(openList)
        //     console.log(closedList)
        //     process.exit()
        // }

        // find neighbors, but ignore those which are not walkable or are on the closed list
        const directionChange = directionCalc(currentNode)
        
        let neighbors = findNeighbors(currentNode.index, flatGrid, width, false, true).filter(neighbor =>
            !closedList.find(node => node.index === neighbor)
            && neighbor !== ''
            // && (directionChange !== 0 || Math.abs(currentNode.index - neighbor) != Math.abs(directionChange))
            /* && flatGrid[currentNode.index] - flatGrid[neighbor] >= -1*/
        )

        if (directionChange !== 0) {
            // console.log('need to change direction from', directionChange)
            // console.log(currentNode.index, neighbors)
            neighbors = neighbors.filter(neighbor => Math.abs(currentNode.index - neighbor) !== Math.abs(directionChange))
            // console.log('filtered neighbors', neighbors)
            // process.exit()
        }

        neighbors.forEach(neighbor => {
            let neighborNode = openList.find(node => node.index === neighbor)
            const g = gScore(currentNode) + 1 // TODO: do we need the +1?
            if (!neighborNode) {
                const h = flatManhattan(neighbor, target, width)
                neighborNode = {
                    index: neighbor,
                    heatLoss: flatGrid[neighbor],
                    parent: currentNode,
                    h,
                    g,
                    f: g + h
                }
                openList.push(neighborNode)
            } else if (g < neighborNode.g) {
                neighborNode.parent = currentNode
                neighborNode.g = g
                neighborNode.f = g + neighborNode.h
            }
        })
    }
    return null
}

const part1 = input => {
    const { width, flatGrid } = preProcessing(input)

    const startIndex = 0 // top-left
    const endIndex = flatGrid.length - 1 // bottom-right
    const h = flatManhattan(startIndex, endIndex, width)
    const startNode = {
        index: startIndex,
        heatLoss: flatGrid[startIndex],
        h,
        g: 0,
        f: h
    }
    const foundTarget = astar([startNode], endIndex, flatGrid, width)
    return gScore(foundTarget, true) // TODO check this subtraction
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
