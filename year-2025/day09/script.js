'use strict'
const { manhattan } = require('../../utils')
// Setup
const preProcessing = input => input.trim().split('\n').map(pos => {
    const [x, y] = pos.split(',').map(coord => parseInt(coord))
    return {x, y}
})

// Part 1
// ======

const part1 = input => {
    const redSquares = preProcessing(input)

    const distances = []
    for (let a = 0; a < redSquares.length; a++) {
        for (let b = a + 1; b < redSquares.length; b++) {
            const squareA = redSquares[a]
            const squareB = redSquares[b]
            const distance = manhattan(squareA, squareB)
            distances.push({
                a, 
                b,
                distance
            })
        }
    }
    const largestDistance = distances.sort((a, b) => b.distance-a.distance)[0]
    const [squareA, squareB] = [redSquares[largestDistance.a], redSquares[largestDistance.b]]
    return (Math.abs(squareA.x - squareB.x) + 1) * (Math.abs(squareA.y - squareB.y) + 1)
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }
