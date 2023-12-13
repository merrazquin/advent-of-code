'use strict'

const { convertRowsToCols, sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n\n').map(grid => bruteP1(grid.split('\n')))

const testHorizontal = (grid, line) => {
    let top = grid.slice(0, line + 1).reverse()
    let bottom = grid.slice(line + 1)
    const topLen = top.length
    const bottomLen = bottom.length
    if (topLen > bottomLen) {
        top = top.slice(0, topLen - (topLen - bottomLen))
    } else if (bottomLen > topLen) {
        bottom = bottom.slice(0, bottomLen - (bottomLen - topLen))
    }
    return top.join('_') == bottom.join('_')
}

const bruteP1 = grid => {
    let i
    const vertGrid = convertRowsToCols(grid).map(col => col.join(''))
    for (i = 0; i < vertGrid.length; i++) {
        if (vertGrid[i] == vertGrid[i+1]) {
            if (testHorizontal(vertGrid, i)) {
                break
            }
        }
    }
    if (i < vertGrid.length) {
        return (i + 1)
    }
    for (i = 0; i < grid.length; i++) {
        if (grid[i] == grid[i+1]) {
            if (testHorizontal(grid, i)) {
                break
            }
        }
    }
    if (i < grid.length) {
        return (i + 1) * 100
    }
    return 0
}
// Part 1
// ======
const part1 = input => {
    return sumAll(preProcessing(input))
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
