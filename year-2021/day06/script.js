'use strict'

const { sumAll } = require('../../utils')
const maxCycle = 9
const respawnTimer = 6
// Setup

const tick = fishTimers => {
    const numZeros = fishTimers.shift()
    fishTimers.push(numZeros)
    fishTimers[respawnTimer] += numZeros
    return fishTimers
}

// Part 1
// ======

const part1 = (input, cycles =  80) => {
    let fishTimers = new Array(maxCycle).fill(0)
    input.trim().split(',').forEach(num => {
        fishTimers[num]++
    })

    while (cycles--) {
        fishTimers = tick(fishTimers)
    }

    return sumAll(fishTimers)
}

// Part 2
// ======

const part2 = input => {
    return part1(input, 256)
}

module.exports = { part1, part2 }
