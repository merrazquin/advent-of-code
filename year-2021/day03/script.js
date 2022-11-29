'use strict'

const { convertRowsToCols } = require('../../utils')

// Setup
const mode = (myArray) => {
    const ones = myArray.filter(num => num == '1').length
    const zeroes = myArray.filter(num => num == '0').length
    return ones >= zeroes ? 1 : 0
}

const rarest = (myArray) => {
    const ones = myArray.filter(num => num == '1').length
    const zeroes = myArray.filter(num => num == '0').length
    return zeroes <= ones ? 0 : 1
}

const findOxygenGeneratorRating = numbers => {
    let cols = convertRowsToCols(numbers)
    const positions = cols.length
    for (let i = 0; i < positions; i++) {
        const col = cols[i]
        const mostCommon = mode(col)
        numbers = numbers.filter(number => number[i] == mostCommon)
        if (numbers.length == 1) {
            return numbers
        }
        cols = convertRowsToCols(numbers)
    }
}

const findCO2ScrubberRating = numbers => {
    let cols = convertRowsToCols(numbers)
    const positions = cols.length
    for (let i = 0; i < positions; i++) {
        const col = cols[i]
        const leastCommon = rarest(col)
        numbers = numbers.filter(number => number[i] == leastCommon)
        if (numbers.length == 1) {
            return numbers
        }
        cols = convertRowsToCols(numbers)
    }
}
const findGammaBit = numbers => {
    const cols = convertRowsToCols(numbers)
    return cols.map(arr => mode(arr)).join('')
}

const findEpislonBit = numbers => {
    const cols = convertRowsToCols(numbers)
    return cols.map(arr => rarest(arr)).join('')
}
// Part 1
// ======

const part1 = input => {
    const numbers = input.trim().split('\n')
    const gamma = findGammaBit(numbers)
    const epsilon = findEpislonBit(numbers)
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

// Part 2
// ======

const part2 = input => {
    const numbers = input.trim().split('\n')
    return parseInt(findOxygenGeneratorRating(numbers), 2) * parseInt(findCO2ScrubberRating(numbers), 2)
}

module.exports = { part1, part2 }
