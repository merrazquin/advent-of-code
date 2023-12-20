'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => {
    const instructionMap = new Map()
    let [instructions, partRatings] = input.split('\n\n')
    instructions.split('\n').map(instruction => {
        let [label, rules] = instruction.replace('}', '').split('{')
        rules = rules.split(',').map(rule => {
            if (rule.indexOf(':') !== -1) {
                const [expression, goto] = rule.split(':')
                return {expression, goto}
            } else {
                return {expression: 'x', goto: rule}
            }
        })
        instructionMap.set(label, rules)
    })
    return {
        instructionMap,
        partRatings: partRatings.split('\n').map(part => {
            let p
            eval(`p = ${part.replace(/=/g, ':')}`)
            return p
        }) 
    }
}

// Part 1
// ======
const processRule = (instructionMap, ruleName, part) => {
    if (ruleName === 'R') {
        return 0
    }

    if (ruleName === 'A') {
        return sumAll(Object.values(part))
    }

    const rules = instructionMap.get(ruleName)
    for (const rule of rules) {
        if (eval(`part.${rule.expression}`)) {
            return processRule(instructionMap, rule.goto, part)
        }
    }
}
const part1 = input => {
    const {instructionMap, partRatings} = preProcessing(input)
    return sumAll(partRatings.map(part => processRule(instructionMap, 'in', part)))
}

// Part 2
// ======

const part2 = input => {
    return 0 //preProcessing(input)
}

module.exports = { part1, part2 }
