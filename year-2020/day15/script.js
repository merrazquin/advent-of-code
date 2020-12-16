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
    preprocessing(input).forEach(num => {
        numbersSpoken[num] = [round]
        lastNumberSpoken = num
        round++
    })
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

const part2 = (input, targetRound = 30000000) => {
    input = preprocessing(input)
    const ultimate = new Array(targetRound)
    const penultimate = new Array(targetRound)
    for(var i = 0; i < targetRound; i++) {
        ultimate[i] = -1
        penultimate[i] = -1
    }
    input.forEach((element, index) => {
        ultimate[element] = index + 1
    })
    let lastNumberSpoken = input[input.length - 1]
    let round = input.length + 1
    while (round <= targetRound) {
        if (penultimate[lastNumberSpoken] == -1) {
            lastNumberSpoken = 0
        } else {
            lastNumberSpoken = ultimate[lastNumberSpoken] - penultimate[lastNumberSpoken]
        }
        penultimate[lastNumberSpoken] = ultimate[lastNumberSpoken]
        ultimate[lastNumberSpoken] = round
        round++
    }
    return lastNumberSpoken
}

/* istanbul ignore next */
const part2Matt = (input, targetRound = 30000000) => {
    input = preprocessing(input)
    let t = 0
    let spoken = input[input.length - 1]
    let prev_spoken
    let map = new Array(targetRound)
    for(var i = 0; i < targetRound; i++) {
        map[i] = -1
    }
    for(i = 0; i < input.length; i++) {
        if (i != input.length - 1) {
            map[input[i]] = t
        }
        t++
    }

    while(t < targetRound) {
        prev_spoken = spoken
        if (map[spoken] != -1)
        {
            let speak = t - map[spoken] -1
            spoken = speak
        }
        else
        {
            spoken = 0
        }
        map[prev_spoken] = t-1
        t++
    }
    return spoken
}

module.exports = { part1, part2, part2Matt }
