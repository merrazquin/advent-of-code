'use strict'

const { chunk } = require('../../utils')

// TTSGQTTCL not correct
// TWLGQTBCL not correct
// Setup
const preprocessing = (input) => {
    const crateStacks = []
    const [crateInfo, instructionsInfo] = input.split('\n\n')
    crateInfo.split('\n').reverse().slice(1).map(row => {
        
        const crates = chunk(row, 4)
        crates.forEach((crate, index) => {
            crate = crate.split('[').join('').split(']').join('').trim()
            if (crate != '') {
                if (!crateStacks[index]) {
                    crateStacks[index] = []
                }

                crateStacks[index].push(crate)
            }
        })
    })
    const instructions = instructionsInfo.trim().split('\n').map(instruction => {
        const [, num, , sourceStack, , targetStack] = instruction.split(' ').map(item => parseInt(item))
        return {num, sourceStack, targetStack}
    })
    return {crateStacks, instructions}
}

// Part 1
// ======

const part1 = input => {
    const {crateStacks, instructions} = preprocessing(input)
    instructions.forEach(({num, sourceStack, targetStack}) => {
        while(num--) {
            crateStacks[targetStack-1].push(crateStacks[sourceStack-1].pop())
        }
    })
    return crateStacks.map(stack => stack.pop()).join('')
}

// Part 2
// ======

const part2 = input => {
    const {crateStacks, instructions} = preprocessing(input)
    instructions.forEach(({num, sourceStack, targetStack}) => {
        crateStacks[targetStack-1].push(...crateStacks[sourceStack-1].splice(num * -1))
    })
    return crateStacks.map(stack => stack.pop()).join('')
}

module.exports = { part1, part2, options: { noTrim: true } }
