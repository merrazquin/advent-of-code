'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split(',')
const hashAlgo = str => str.split('').reduce((result, char) => {
    result += char.charCodeAt(0)
    result *= 17
    result %= 256
    return result
}, 0)

const focusingPower = box => box.reduce((total, lens, index) => {
    const {boxNumber, focalLength} = lens
    const lensSlot = index + 1
    return total + (boxNumber * lensSlot * focalLength)

}, 0)

// Part 1
// ======

const part1 = input => {
    return sumAll(preProcessing(input).map(str => hashAlgo(str)))
}

// Part 2
// ======

const part2 = input => {
    const hashMap = new Map()

    const instructionPattern = new RegExp(/([a-z]+)([=-])([0-9]?)/)
    const instructions = preProcessing(input).map(instruction => {
        const [, label, operation, focalLength] = instruction.match(instructionPattern)
        return {label, operation, focalLength: parseInt(focalLength), boxNumber: hashAlgo(label) + 1}
    })

    instructions.forEach(instruction => {
        const {label, operation, focalLength, boxNumber} = instruction
        let box = hashMap.get(boxNumber)
        if (!box) {
            box = []
            hashMap.set(boxNumber, box) 
        }
        if (operation === '-') {
            const lensIndex = box.findIndex(lens => lens.label === label)
            if (lensIndex !== -1) {
                box.splice(lensIndex, 1)
            }
        } else {
            const lens = {focalLength, label, boxNumber}
            const lensIndex = box.findIndex(lens => lens.label === label)
            lensIndex !== -1 ? (box[lensIndex] = lens) : box.push(lens)
        }
    })

    let total = 0
    for (const box of hashMap.values()) {
        total += focusingPower(box)
    }

    return total
}

module.exports = { part1, part2, hashAlgo }
