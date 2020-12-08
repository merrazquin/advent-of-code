'use strict'

// Setup

// Part 1
// ======

const part1 = input => {
    return input.split('\n\n').map(answers => {
        answers = answers.split('\n').join('').split('')
        return new Set(answers).size
    }).reduce((prev, curr) => curr + prev, 0)
}

// Part 2
// ======

const part2 = input => {
    return input.split('\n\n').map(answers => {
        let partySize = answers.split('\n').length
        answers = answers.split('\n').join('').split('').sort((a, b) => a < b ? -1 : 1).join('')
        var regex = new RegExp(`(.)\\1{${partySize - 1}}`, 'g')
        return [...answers.matchAll(regex)].length
    
    }).reduce((prev, curr) => curr + prev, 0)
}

module.exports = { part1, part2 }

// 2:09 AM
// 2:13 AM issues with advent
// 2:30 AM part 1
// 2:43 AM incorrect answer to part 2
// 3:23 AM part 2