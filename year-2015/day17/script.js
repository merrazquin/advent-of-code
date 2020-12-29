'use strict'
const {subsetSum} = require('../../utils')
// Setup

const preprocessing = input => {
    return input.split('\n').map(Number).sort((a, b) => b - a)
}

// Part 1
// ======

const part1 = (input, target = 150) => {
    let combinations = [] 
    subsetSum(preprocessing(input), target, combinations)
    return combinations.length
}

// Part 2
// ======

const part2 = (input, target = 150) => {
    let combinations = [] 
    subsetSum(preprocessing(input), target, combinations)
    combinations.sort((a, b) => a.length - b.length)
    const minSize = combinations[0].length

    return combinations.filter(combo => combo.length === minSize).length
}

module.exports = { part1, part2 }
