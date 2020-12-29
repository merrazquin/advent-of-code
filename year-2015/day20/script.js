'use strict'

const { findAllDivisors, sumAll } = require("../../utils")

// Setup

const preprocessing = input => {
    return parseInt(input)
}

// Part 1
// ======

const part1 = input => {
    let target = preprocessing(input)
    let i = 1
    while (sumAll(findAllDivisors(i).map(div => div * 10)) < target) {
        i++
    }
    return i
}

// Part 2
// ======

const part2 = input => {
    let target = preprocessing(input)
    let i = 1
    while (sumAll(findAllDivisors(i).filter(div => i / div <= 50).map(div => div * 11)) < target) {
        i++
    }
    return i
}

module.exports = { part1, part2 }
