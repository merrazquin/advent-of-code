'use strict'

const { convertRowsToCols, sumAll } = require('../../utils')

// Setup
const preProcessing = input => convertRowsToCols(input.split('\n'))

const rollNorth = col => {
    let changed = false

    for (let i = 0; i < col.length -1; i++) {
        let left = col[i]
        let right = col[i + 1]

        if (right === 'O' && left === '.') {
            ([right, left] = [left, right])
            col[i] = left
            col[i + 1] = right
            changed = true
        }
    }

    if (changed) {
        rollNorth(col)
    }
    return col
}
const calcLoad = col => col.reduce((acc, item, index) => item === 'O' ? (acc + index + 1) : acc, 0)

// Part 1
// ======

const part1 = input => {
    const cols = preProcessing(input).map(col => rollNorth(col).reverse()).map(col => calcLoad(col))
    return sumAll(cols)
}

// Part 2
// ======

const part2 = input => {
    return 0 //preProcessing(input)
}

module.exports = { part1, part2 }
