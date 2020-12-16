'use strict'
const {sumAll} = require('../../utils')

// Setup

const preprocessing = input => {
    return input.split('\n\n')
}

// Part 1
// ======
const inRange = (value, min, max) => {
    return value >= min && value <= max
}

const isValueValid = (value, fields) => {

    let isValid = false
    fields.forEach(field => {
        const { fieldName, range1, range2 } = field
        if (inRange(value, range1.min, range1.max) || inRange(value, range2.min, range2.max)) {
            isValid = true
        }
    });
    return isValid
}
// (.*): (\d+)-(\d+) or (\d+)-(\d+)
const prodRanges = () => {
    const ranges = []
    ranges.push('<redacted>')
    return ranges
}
const testRanges = () => {
    const ranges = []
    ranges.push({field: 'class', range1: {min:1, max:3}, range2:{min:5, max:7}})
ranges.push({field: 'row', range1: {min:6, max:11}, range2:{min:33, max:44}})
ranges.push({field: 'seat', range1: {min:13, max:40}, range2:{min:45, max:50}})
    return ranges
}
const testTickets = () => {
    const tix = 
`7,3,47
40,4,50
55,2,20
38,6,12`
return tix.split('\n').map(row => {
    return row.split(',')
}).join(',').split(',').map(num => parseInt(num))
}
const prodTickets = () => {
    return '<REDACTED>'
}

const part1 = (input, debug = false) => {
    const ranges = debug ? testRanges() : prodRanges()
    const tickets = debug ? testTickets() : prodTickets()
    const invalids = tickets.filter(val => {
        return !isValueValid(val, ranges)
    })
    // return preprocessing(input)
    return sumAll(invalids)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
