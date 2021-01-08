'use strict'

const { sumAll, subsetProduct, multiplyAll } = require("../../utils")

// Setup

const preprocessing = input => {
    return input.split('\n').map(Number)
}

// Part 1
// ======

const part1 = input => {
    const packages = preprocessing(input)
    const totalWeight = sumAll(packages)
    const compartmentWeight = totalWeight / 3

    let combinations = [] 
    subsetProduct(packages, compartmentWeight, combinations)
    combinations.sort((a, b) => a.length - b.length)
    return multiplyAll(combinations.shift())
}

// Part 2
// ======

const part2 = input => {
    const packages = preprocessing(input)
    const totalWeight = sumAll(packages)
    const compartmentWeight = totalWeight / 4

    let combinations = [] 
    subsetProduct(packages, compartmentWeight, combinations)
    combinations.sort((a, b) => a.length - b.length)
    return multiplyAll(combinations.shift())}

module.exports = { part1, part2 }
