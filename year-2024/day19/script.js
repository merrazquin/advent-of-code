'use strict'
const { sumAll, memoize } = require('../../utils')
// Setup
const preProcessing = input => {
    let [towels, displays] = input.split('\n\n')
    towels = towels.split(', ')
    displays = displays.split('\n')
    return {towels, displays}
}

const findTowelCombo = (display, towels) => {
    if (towels.filter(towel => towel === display).length) {
        return true
    }
    const filteredTowels = towels.filter(towel => display.startsWith(towel))
    return filteredTowels.some(towel => {
        const newDisplay = display.slice(towel.length)
        return findTowelCombo(newDisplay, towels)
    })
}

const findAllTowelCombo = (display, towels, count = 0) => {
    if (display === '') {
        return 1
    } else {
        const filteredTowels = towels.filter(towel => display.startsWith(towel))
        return sumAll(filteredTowels.map(towel => {
            const newDisplay = display.slice(towel.length)
            return memoizedFind(newDisplay, towels, count)
        }).flat())
    }
}

const memoizedFind = memoize(findAllTowelCombo)
// Part 1
// ======

const part1 = input => {
    const {towels, displays} = preProcessing(input)

    return displays.filter(display => findTowelCombo(display, towels)).length
}
// Part 2
// ======

const part2 = input => {
    let {towels, displays} = preProcessing(input)
    displays = displays.filter(display => findTowelCombo(display, towels))

    return sumAll(displays.map(display => memoizedFind(display, towels)))
}

module.exports = { part1, part2 }
