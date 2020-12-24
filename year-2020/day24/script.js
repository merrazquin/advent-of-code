'use strict'

// Setup

const preprocessing = input => {
    const regex = /(se)|(sw)|(nw)|(ne)|(e)|(w)/g
    return input.split('\n').map(row => {
        regex.lastIndex = -1
        return [...row.matchAll(regex)].map(match => match[0])
    })
}

// Part 1
// ======

const part1 = input => {
    return preprocessing(input)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
