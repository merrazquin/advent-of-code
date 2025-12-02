'use strict'

// Setup
const preProcessing = input => input.split(',').map(range => range.split('-').map(el => parseInt(el)))

// Part 1
// ======

const isValid = (input, anySize = false) => {
    const string = input.toString()
    const length = string.length
    const halfway = Math.floor(length / 2)
    const [left, right] = [string.slice(0, halfway), string.slice(halfway)]
    return left !== right
}

const isValid2 = input => {
    const string = input.toString()
    const length = string.length
    const halfway = Math.floor(length / 2)
    if (halfway < 1) return true
    const regex = new RegExp(`^(.{1,${halfway}})\\1+$`)
    return !regex.test(string)
}

const part1 = input => {
    const ranges = preProcessing(input)
    let tally = 0
    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            if (!isValid(i)) tally += i
        }
    }
    return tally
}
// Part 2
// ======

const part2 = input => {
    const ranges = preProcessing(input)
    let tally = 0
    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            if (!isValid2(i)) tally += i
        }
    }
    return tally
}

module.exports = { part1, part2 }
