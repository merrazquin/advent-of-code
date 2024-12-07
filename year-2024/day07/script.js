'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(line => {
    const [testValue, equation] = line.split(': ')
    return { testValue: parseInt(testValue), equation: equation.split(' ').map(num => parseInt(num)) }
})

const findValid = (testValue, equation, tally = -1, withConcat = false) => {
    if (tally > testValue) return false
    if (!equation.length) {
        return testValue === tally
    }
    let num = equation.shift()
    if (tally == -1) {
        return findValid(testValue, equation.slice(), num, withConcat)
    }
    
    let branch1, branch2, branch3
    branch1 = findValid(testValue, equation.slice(), tally + num, withConcat)
    branch2 = findValid(testValue, equation.slice(), tally * num, withConcat)
    branch3 = !withConcat ? false : findValid(testValue, equation.slice(), parseInt(`${tally}${num}`), withConcat)
    return branch1 || branch2 || branch3
}

// Part 1
// ======
const part1 = input => {
    const lines = preProcessing(input)
    return sumAll(lines.filter(line => findValid(line.testValue, line.equation.slice())).map(line => line.testValue))
}

// Part 2
// ======
const part2 = input => {
    const lines = preProcessing(input)
    return sumAll(lines.filter(line => findValid(line.testValue, line.equation.slice(), -1, true)).map(line => line.testValue))
}

module.exports = { part1, part2 }
