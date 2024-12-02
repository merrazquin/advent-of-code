'use strict'

// Setup
const preProcessing = input => {
    const rows = input.split('\n')
    const width = rows[0].length

    return {width, flatGrid: rows.map(row => row.split('')).flat()}
}

// Part 1
// ======

const part1 = (input, stepCount = 64) => {
    const {flatGrid, width} = preProcessing(input)
    const startPos = flatGrid.indexOf('S')

    const nextGrid = 
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
