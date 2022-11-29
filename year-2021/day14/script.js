'use strict'

// Setup

// Part 1
// ======
const processInput = input => {
    const rules = {}
    let [polymerTemplate, ruleDefs] = input.trim().split('\n\n')
    let pairCounts = {}
    ruleDefs.trim().split('\n').forEach(rule => {
        let [pair, insertion] = rule.split(' -> ')
        let [a, c] = pair.split('')
        rules[pair] = [a+insertion, insertion+c]
        const regex = new RegExp(`(?=(${pair}))`, 'g')
        pairCounts[pair] = [... polymerTemplate.matchAll(regex)].length
    })
    return {rules, pairCounts}
}

const updatePairCounts = (rules, pairCounts) => {
    const newPairCounts = Object.assign({}, pairCounts)
    for (const ruleKey in rules) {
        const [pairA, pairB] = rules[ruleKey]
        newPairCounts[pairA] += pairCounts[ruleKey]
        newPairCounts[pairB] += pairCounts[ruleKey]
        newPairCounts[ruleKey] -= pairCounts[ruleKey]
    }
    return Object.assign(pairCounts, newPairCounts)
}

const part1 = (input, cycles = 10) => {
    let {rules, pairCounts} = processInput(input)
    while (cycles--) {
        pairCounts = updatePairCounts(rules, pairCounts)
    }
    /**
     * If someone can tell me why this works, I'd love to hear it
     * I decided there *must* be some importance to the "side"
     * on which the letter appeared in a pair 
     * If I take a letter's total distribution, and split it up by left & right, 
     * then take the sum of each "column", the larger sum is the correct ditribution
     */
    const letters = {}
    for (const pair of Object.keys(pairCounts)) {
        const [a, b] = pair
        if(!letters[a]) letters[a] = [0, 0]
        if(!letters[b]) letters[b] = [0, 0]

        letters[a][0] += pairCounts[pair]
        letters[b][1] += pairCounts[pair]
    }
    
    for (const letter of Object.keys(letters)) {
        letters[letter] = Math.max(...letters[letter])
    }
    const vals = Object.values(letters)
    return Math.max(...vals) - Math.min(...vals)
    
}

// Part 2
// ======

const part2 = (input, cycles = 40) => {
    return part1(input, cycles)
}

module.exports = { part1, part2 }
