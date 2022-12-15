'use strict'

const { findNeighbors } = require('../../utils')

// Setup
const preprocessing = (input) => {
    const rows = input.trim().split('\n')
    const width = rows[0].length
    return {
        width,
        flatGrid: rows.map(row => row.split('').map(cell => cell.charCodeAt(0))).flat()
    }
}

// Part 1
// ======
/*
FROM https://csis.pace.edu/~benjamin/teaching/cs627/webfiles/Astar.pdf
1) Add the starting square (or node) to the open list.
2) Repeat the following:
    a) Look for the lowest F cost square on the open list. We refer to this as the current square.
    b) Switch it to the closed list.
    c) For each of the 8 squares adjacent to this current square …
        If it is not walkable or if it is on the closed list, ignore it. Otherwise do the following.

        If it isn’t on the open list, add it to the open list. Make the current square the parent of this square. Record
        the F, G, and H costs of the square.

        If it is on the open list already, check to see if this path to that square is better, using G cost as the
        measure. A lower G cost means that this is a better path. If so, change the parent of the square to the
        current square, and recalculate the G and F scores of the square. If you are keeping your open list sorted
        by F score, you may need to resort the list to account for the change.
d) Stop when you:
    Add the target square to the closed list, in which case the path has been found (see note below), or
    Fail to find the target square, and the open list is empty. In this case, there is no path.
*/
const flatManhattan = (start, end, width) => {
    const dx = Math.abs(Math.floor(start / width) - Math.floor(end / width))
    const dy = Math.abs((start % width) - (end % width))
    return dx + dy
}
const gScore = (node, log) => {
    let score = 0
    while (node) {
        if (log) {
            console.log(node.index)
        }
        score++
        node = node.parent
    }
    return score
}

const astar = (openList, target, flatGrid, width) => {
    const closedList = []
    while (openList.length) {
        openList.sort((a, b) => a.f - b.f)
        const currentNode = openList.shift()
        closedList.push(currentNode)
        const foundTarget = closedList.find(node => node.index === target)

        if (foundTarget) {
            return foundTarget
        }

        // find neighbors, but ignore those which are not walkable or are on the closed list
        const neighbors = findNeighbors(currentNode.index, flatGrid, width, false, true).filter(neighbor =>
            !closedList.find(node => node.index === neighbor)
            && flatGrid[currentNode.index] - flatGrid[neighbor] >= -1
        )

        neighbors.forEach(neighbor => {
            let neighborNode = openList.find(node => node.index === neighbor)
            const g = gScore(currentNode) + 1
            if (!neighborNode) {
                const h = flatManhattan(neighbor, target, width)
                neighborNode = {
                    index: neighbor,
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
    const { width, flatGrid } = preprocessing(input)

    const startIndex = flatGrid.indexOf(83) // S
    const endIndex = flatGrid.indexOf(69) // E
    flatGrid[startIndex] = 'a'.charCodeAt(0)
    flatGrid[endIndex] = 'z'.charCodeAt(0)
    const h = flatManhattan(startIndex, endIndex, width)
    const startNode = {
        index: startIndex,
        h,
        g: 0,
        f: h
    }
    const foundTarget = astar([startNode], endIndex, flatGrid, width)
    return gScore(foundTarget) - 1
}

// Part 2
// ======

const part2 = input => {
    const { width, flatGrid } = preprocessing(input)

    const endIndex = flatGrid.indexOf(69) // E should be z
    flatGrid[flatGrid.indexOf(83)] = 'a'.charCodeAt(0) // S should be a
    flatGrid[endIndex] = 'z'.charCodeAt(0)

    const possibleStartingPoints = flatGrid.map((val, index) => val === 97 ? index : -1).filter(val => val !== -1)

    let minPath = flatGrid.length
    while (possibleStartingPoints.length) {
        const startIndex = possibleStartingPoints.shift()
        const h = flatManhattan(startIndex, endIndex, width)
        const startNode = {
            index: startIndex,
            h,
            g: 0,
            f: h
        }
        const foundTarget = astar([startNode], endIndex, flatGrid, width)
        const pathLength = gScore(foundTarget) - 1
        if (pathLength > 0) {
            minPath = Math.min(pathLength, minPath)
        }
    }
    return minPath
}

module.exports = { part1, part2 }
