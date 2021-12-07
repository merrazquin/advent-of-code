'use strict'

const { sumAll, sumOfIntegers } = require('../../utils')

// Setup

// Part 1
// ======

const part1 = input => {
    const crabs = input.trim().split(',').map(crab => parseInt(crab)).sort((a, b) => a-b)
    const min = crabs[0]
    const max = crabs[crabs.length - 1]
    let cheapest = undefined
    for (let i = min; i <= max; i++) {
        const alignmentCost = sumAll(crabs.map(crab => Math.abs(crab - i)))
        cheapest = Math.min(alignmentCost, cheapest || alignmentCost)
    }
    return cheapest
}

// Part 2
// ======

const part2 = input => {
    const crabs = input.trim().split(',').map(crab => parseInt(crab)).sort((a, b) => a-b)
    const min = crabs[0]
    const max = crabs[crabs.length - 1]
    let cheapest = undefined
    for (let i = min; i <= max; i++) {
        const alignmentCost = sumAll(crabs.map(crab => {
            const diff = Math.abs(crab - i)
            return sumOfIntegers(1, diff)
        }))
        cheapest = Math.min(alignmentCost, cheapest || alignmentCost)
    }
    return cheapest
}

module.exports = { part1, part2 }
