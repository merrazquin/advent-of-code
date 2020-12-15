'use strict'

// Setup

const preprocessing = input => {
    return input.split(',').map(num => parseInt(num))
}

// Part 1
// ======

const part1 = (input, targetRound = 2020) => {
    const numbersSpoken = {}
    let round = 1
    let lastNumberSpoken
    preprocessing(input).forEach((num, index) => {
        numbersSpoken[num] = [round]
        lastNumberSpoken = num
        round++
    });
    while (round <= targetRound) {
        if (!numbersSpoken[lastNumberSpoken] || numbersSpoken[lastNumberSpoken].length === 1) {
            lastNumberSpoken = 0
        } else {
            const roundsSpoken = numbersSpoken[lastNumberSpoken]
            lastNumberSpoken = roundsSpoken[roundsSpoken.length - 1] - roundsSpoken[roundsSpoken.length - 2]
        }

        // log this round 
        if (!numbersSpoken[lastNumberSpoken]) {
            numbersSpoken[lastNumberSpoken] = [round]
        } else {
            numbersSpoken[lastNumberSpoken].push(round)
        }
        round++
    }
    return lastNumberSpoken
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
