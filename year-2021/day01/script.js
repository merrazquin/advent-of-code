'use strict'

const { sumAll } = require('../../utils')

// Setup
const preprocessing = input => input.trim().split('\n').map(depth => parseInt(depth))

const findIncreases = depths => {
    let increases = 0
    depths.forEach((depth, index) => {
        if(index > 0 && depth > depths[index - 1]) {
            increases++
        }
    })
    return increases
}
// Part 1
// ======

const part1 = input => {
    const depths = preprocessing(input)
    return findIncreases(depths)
}

// Part 2
// ======

const part2 = input => {
    const depths = preprocessing(input)
    const depthSums = []
    depths.forEach((depth, index) => {
        if (index < depths.length - 2) {
            depthSums.push(sumAll(depths.slice(index, index + 3)))
        }
    })
    return findIncreases(depthSums)
}

module.exports = { part1, part2 }
