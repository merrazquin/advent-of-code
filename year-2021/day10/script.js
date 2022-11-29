'use strict'
const { sumAll } = require('../../utils')
// Setup
const lookup = {
    ')': {
        open: '(',
        errorScore: 3,
    },
    ']': {
        open: '[',
        errorScore: 57,
    },
    '}': {
        open: '{',
        errorScore: 1197,
    },
    '>': {
        open: '<',
        errorScore: 25137,
    }
}

const revLookup = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}

const processLine = (line, breakOnError = true) => {
    const currentlyOpen = []
    const openChars = ['(', '[', '{', '<']
    const chars = line.trim().split('')
    for (let index = 0; index < chars.length; index++) {
        const char = chars[index]
        const isOpeningChar = openChars.includes(char)
        if (isOpeningChar) {
            currentlyOpen.push(char)
            continue
        }
        if (lookup[char].open == currentlyOpen[currentlyOpen.length - 1]) {
            currentlyOpen.pop()
            continue
        }
        return breakOnError ? lookup[char].errorScore : 0
    }
    return breakOnError ? 0 : findCompletionScore(currentlyOpen)
}

const findCompletionScore = chars => {
    return chars.reverse().reduce((score, char) => score * 5 + revLookup[char], 0)
}

// Part 1
// ======

const part1 = input => {
    return sumAll(input.trim().split('\n').map(line => processLine(line)))
}

// Part 2
// ======

const part2 = input => {
    const completionScores = input.trim().split('\n')
        .map(line => processLine(line, false))
        .filter(score => score > 0)
        .sort((a, b) => a-b)

    return completionScores[Math.floor(completionScores.length / 2)]
}

module.exports = { part1, part2 }
