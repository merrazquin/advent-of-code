'use strict'

// Setup
const preProcessing = input => input.split('\n').map(brick => {
    const [endA, endB] = brick.split('~').map(end => {
        const [x, y, z] = end.split(',').map(val => parseInt(val))
        return {x, y, z}
    })
    return {endA, endB}
}).sort((brickA, brickB) => (brickA.endA.z + brickA.endB.z) - (brickB.endA.z + brickB.endB.z))

// Part 1
// ======
const isSupport()
const calculateSupports = bricks => {
    const disintegrationCandidates = []
    bricks.forEach((brick, index, arr) => {
        
    });
}
const part1 = input => {
    return preProcessing(input)
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
