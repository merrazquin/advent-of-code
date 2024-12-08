
'use strict'
const { sumAll } = require('../../utils')

// Setup
const preProcessing = (input) => {
    const [rawRules, rawUpdates] = input.split('\n\n').map(list => list.split('\n'))
    return {
        rawRules,
        rules: rawRules.map(rawRule => rawRule.split('|')),
        updates: rawUpdates.map(rawUpdate => rawUpdate.split(','))
    }
}

// Part 1
// ======
const adheresToRule = (rule, update) => {
    const [first, second] = rule
    const firstIndex = update.findIndex(num => num === first)
    const secondIndex = update.findIndex(num => num === second)
    return firstIndex === -1 || secondIndex === -1 || firstIndex < secondIndex
}
const middlePage = pages => parseInt(pages[Math.floor(pages.length / 2)])
const part1 = input => {
    const { rules, updates } = preProcessing(input)

    const fitToPrint = updates.filter(update => {
        return rules.every(rule => adheresToRule(rule, update))
    })

    return sumAll(fitToPrint.map(pages => middlePage(pages)))
}

// Part 2
// ======

const part2 = input => {
    const { rawRules, rules, updates } = preProcessing(input)

    const toBeFixed = updates.filter(update => {
        return !rules.every(rule => adheresToRule(rule, update))
    })

    const sortAlgo = (pageA, pageB) => {
        if (rawRules.includes(`${pageA}|${pageB}`)) {
            return -1
        }

        if (rawRules.includes(`${pageB}|${pageA}`)) {
            return 1
        }

        return 0
    }

    return sumAll(toBeFixed.map(pages => middlePage(pages.sort(sortAlgo))))
}

module.exports = { part1, part2 }
