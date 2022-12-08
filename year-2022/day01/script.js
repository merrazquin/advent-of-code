'use strict'

const { sumAll } = require('../../utils')

// Setup
const preprocessing = (input) => input.trim().split('\n\n').map(elf => {
    return sumAll(elf.split('\n').map(ration => parseInt(ration)))
})


// Part 1
// ======

const part1 = input => {
    const data = preprocessing(input)
    return data.sort((a, b) => a-b).pop()
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    return sumAll(data.sort((a, b) => b-a).slice(0, 3))
}

module.exports = { part1, part2 }
