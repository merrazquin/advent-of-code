'use strict'
const { chunk, memoize, sumAll } = require('../../utils')
// Setup
const preProcessing = input => input.split(' ').map(num => parseInt(num))
const blinkStone = (stone) => {
    if (stone === 0) return [1]

    const stoneString = stone.toString()
    if (stoneString.length % 2 === 0) {
        return chunk(stoneString, stoneString.length / 2).map(stone => parseInt(stone))
    }

    return [stone * 2024]
}
const memoizedBlink = memoize(blinkStone)
// Part 1
// ======

const part1 = (input, blinks = 25) => {
    let stones = preProcessing(input)
    let i = 0
    while (i < blinks) {
        stones = stones.map(stone => memoizedBlink(stone)).flat()
        i++
    }
    return stones.length
}

// Part 2
// ======


const part2 = (input, blinks = 75) => {
    let stonesArr = preProcessing(input)
    let stones = {}
    stonesArr.forEach(stone => {
        stones[stone] = stones[stone] ? (stones[stone] + 1) : 1
    });

    let i = 0
    while (i < blinks) {
        const newStones = {}

        for (const [stone, count] of Object.entries(stones)) {
            const stoneNum = parseInt(stone)

            if (stoneNum === 0) {
                newStones[1] = (newStones[1] || 0) + count
            } else if (stone.length % 2 === 0) {
                const [leftStone, rightStone] = chunk(stone, stone.length / 2).map(stone => parseInt(stone))
                newStones[leftStone] = (newStones[leftStone] || 0) + count
                newStones[rightStone] = (newStones[rightStone] || 0) + count
            } else {
                const newStoneVal = stoneNum * 2024
                newStones[newStoneVal] = (newStones[newStoneVal] || 0) + count
            }
        }
        stones = newStones
        i++
    }

    return sumAll(Object.values(stones))
}
module.exports = { part1, part2 }
