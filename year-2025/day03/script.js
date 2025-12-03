'use strict'
const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.trim().split('\n').map(bank => bank.split('').map(val => parseInt(val)))

const getMaxJoltage = (batteryBank, maxLen = 2) => {
    let highJoltageBank = [batteryBank[0]]
    let currIndex = 1
    while(currIndex < batteryBank.length) {
        let currNum = batteryBank[currIndex]
        while (currNum > highJoltageBank[highJoltageBank.length - 1]) {
            const newLen = highJoltageBank.length - 1
            const remainingNums = batteryBank.length - currIndex
            if ((newLen + remainingNums) < maxLen) {
                break
            }
            highJoltageBank.pop()
        }
        highJoltageBank.push(currNum)
        currIndex++
    }
    return parseInt(highJoltageBank.slice(0, maxLen).join(''))
}

// Part 1
// ======

const part1 = input => {
    const batteries = preProcessing(input)
    return sumAll(batteries.map(bank => getMaxJoltage(bank)))
}

// Part 2
// ======

const part2 = input => {
    const batteries = preProcessing(input)
    return sumAll(batteries.map(bank => getMaxJoltage(bank, 12)))
}

module.exports = { part1, part2 }
