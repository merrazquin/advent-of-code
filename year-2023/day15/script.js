'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split(',')
const hashAlgo = str => str.split('').reduce((result, char) => {
    const charCode = char.charCodeAt(0)
    result += charCode
    result *= 17
    result %= 256
    return result
}, 0)
// Part 1
// ======

const part1 = input => {
    return sumAll(preProcessing(input).map(str => hashAlgo(str)))
}

// Part 2
// ======

const part2 = input => {
    return 0// preProcessing(input)
}

module.exports = { part1, part2, hashAlgo }
