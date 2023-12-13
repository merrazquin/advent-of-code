'use strict'

const { convertRowsToCols, sumAll } = require('../../utils')

// Setup
const preProcessing = (input, testFunc) => input.split('\n\n').map(grid => testFunc(grid.split('\n')))

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

const testHorizontalWithSmudge = (grid, line) => {
    let top = grid.slice(0, line + 1).reverse()
    let bottom = grid.slice(line + 1)

    const topLen = top.length
    const bottomLen = bottom.length
    if (topLen > bottomLen) {
        top = top.slice(0, topLen - (topLen - bottomLen))
    } else if (bottomLen > topLen) {
        bottom = bottom.slice(0, bottomLen - (bottomLen - topLen))
    }

    const smudgeCount = sumAll(top.map((topLine, index) => findSmudges(topLine, bottom[index])))
    return smudgeCount == 1
}

const findSmudges = (lineA, lineB) => {
    const line1 = parseInt(lineA.replace(/\./g, '0').replace(/#/g, '1'), 2)
    const line2 = parseInt(lineB.replace(/\./g, '0').replace(/#/g, '1'), 2)

    return (line1 ^ line2).toString(2).replace(/0/g, '').length
}

const p1 = grid => {
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

const p2 = grid => {
    let i
    const vertGrid = convertRowsToCols(grid).map(col => col.join(''))
    for (i = 0; i < vertGrid.length; i++) {
        if (!vertGrid[i + 1]) continue
        const smudgeCount = findSmudges(vertGrid[i], vertGrid[i + 1])

        if (smudgeCount < 2) {
            if (testHorizontalWithSmudge(vertGrid, i)) {
                break
            }
        }
    }
    if (i < vertGrid.length) {
        return (i + 1)
    }
    for (i = 0; i < grid.length; i++) {
        if (!grid[i + 1]) continue
        const smudgeCount = findSmudges(grid[i], grid[i + 1])
        if (smudgeCount < 2) {
            if (testHorizontalWithSmudge(grid, i)) {
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
    return sumAll(preProcessing(input, p1))
}

// Part 2
// ======

const part2 = input => {
    return sumAll(preProcessing(input, p2))
}

module.exports = { part1, part2, findSmudges }
