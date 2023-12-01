'use strict'
const { sumAll } = require('../../utils')

// Setup
const numMap = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}
const preProcessing = (input) => input.trim().split('\n')

// Part 1
// ======
const part1 = input => {
    return sumAll(preProcessing(input).map(ln => ln.replace(/[^0-9]/gi, '')).map(ln => parseInt(ln[0] + ln[ln.length - 1])))
}

// Part 2
// ======
const parseNumbers = ln => {
    let re = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/gi)
    return Array.from(ln.matchAll(re)).map(result => {
        return parseInt(result[1]) ? result[1] : numMap[result[1]]
    }).join('')
}

const part2 = input => {
    return sumAll(preProcessing(input)
        .map(parseNumbers)
        .map(ln => parseInt(ln[0] + '' + ln[ln.length - 1])))
}

module.exports = { part1, part2, parseNumbers }
