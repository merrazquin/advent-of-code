'use strict'

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


const makePermutations = (mask) => {
    const index = mask.indexOf('X')
    const permutations = [
        mask.split('').slice(0, index).join('') + '0' + mask.split('').slice(index + 1).join(''),
        mask.split('').slice(0, index).join('') + '1' + mask.split('').slice(index + 1).join('')
    ]
    return permutations
}

const findAllAddresses = (originalMask) => {
    let addresses = [originalMask]
    let currIndex = addresses.findIndex(mask => mask.indexOf('X') != -1)
    while (currIndex != -1) {
        let newPerms = makePermutations(addresses[currIndex])
        addresses.splice(currIndex, 1)
        if (newPerms.length) {
            addresses.push(...newPerms)
        }
        currIndex = addresses.findIndex(mask => mask.indexOf('X') != -1)
    }
    return addresses
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

    let sum = 0
    for (const position in memory) {
        sum += memory[position]
    }
    return sum
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2, applyMask, applyUpdatedMask, findAllAddresses, makePermutations }
