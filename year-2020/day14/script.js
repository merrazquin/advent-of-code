'use strict'

const { getAllTokenizedPermutations, sumAll } = require('../../utils')

// Setup
// TODO write instruction parsing util
const preprocessing = input => {
    return input.split('\n').map(line => {
        let position = 0
        let [instruction, value] = line.split(' = ')
        if (instruction != 'mask') {
            position = parseInt(instruction.split('[')[1])
            instruction = 'mem'
        }
        return {
            instruction,
            position,
            value
        }
    })
}

// Part 1
// ======
const applyMask = (value, mask) => {
    let binaryValue = (+value).toString(2).padStart(36, '0')
    let maskedValue = binaryValue.split('').map((val, index) => {
        let maskVal = mask.charAt(index)
        if (maskVal === 'X') {
            return val
        }
        return maskVal
    })
    return parseInt(maskedValue.join(''), 2)
}
const applyUpdatedMask = (value, mask) => {
    let binaryValue = (+value).toString(2).padStart(36, '0')
    let maskedValue = binaryValue.split('').map((val, index) => {
        let maskVal = mask.charAt(index)
        if (maskVal == 0) {
            return val
        }
        if (maskVal == 1) {
            return 1
        }
        return 'X'
    })
    return maskedValue.join('')
}

const part1 = input => {
    const memory = {}
    let mask = ''
    preprocessing(input).forEach(instructionSet => {
        const { instruction, position, value } = instructionSet

        if (instruction === 'mask') {
            mask = value
        } else {
            memory[position] = applyMask(value, mask)
        }
    })

    return sumAll(memory)
}

// Part 2
// ======

const part2 = input => {
    const memory = {}, options = [0, 1]
    let mask = ''
    preprocessing(input).forEach(instructionSet => {
        const { instruction, position, value } = instructionSet

        if (instruction === 'mask') {
            mask = value
        } else {
            getAllTokenizedPermutations(applyUpdatedMask(position, mask), 'X', options).forEach(address => {
                memory[parseInt(address, 2)] = parseInt(value)
            })
        }
    })

    return sumAll(memory)
}

module.exports = { part1, part2, applyMask, applyUpdatedMask }
