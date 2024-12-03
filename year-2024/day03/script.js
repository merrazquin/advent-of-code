'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.match(/mul\([0-9]+,[0-9]+\)/g)

// Part 1
// ======
const part1 = input => {
    const muls = preProcessing(input)
    return sumAll(muls.map(mul => {
        mul = mul.replace('mul(', '').replace(')', '').split(',').map(num => parseInt(num))
        return mul
    }).map(mul => {
        const [l, r] = mul
        return l * r
    }))
}

// Part 2
// ======

const part2 = input => {
    const disabledInstructions = input.split('don\'t()')
    let validMultiplicationInstructions = [disabledInstructions.shift()]
    disabledInstructions.forEach(d => {
        const enabledInstructions = d.split('do()')
        if (enabledInstructions.length > 1) {
            validMultiplicationInstructions.push(...enabledInstructions.slice(1))
        }
    })
    return part1(validMultiplicationInstructions.join(''))
}

module.exports = { part1, part2 }
