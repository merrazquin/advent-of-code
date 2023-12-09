'use strict'

const { multiplyAll } = require('../../utils')

// Setup
const preProcessing = input => {
    let [times, distances] = input.split('\n').map(ln => ln.split(/:\s+/).pop().split(/\s+/).map(num => parseInt(num)))
    return {times, distances}
}

const getPossibleWins = (time, distance) => {
    let min = time
    let max = 0
    for (let i = 1; i < time; i++) {
        let outcome = i * (time - i)
        if (outcome > distance) {
            min = i
            break
        }
    }
    for (let i = time - 1; i > 0; i--) {
        let outcome = i * (time - i)
        if (outcome > distance) {
            max = i
            break
        }
    }
    return max-min + 1

}

// Part 1
// ======

const part1 = input => {
    const {times, distances} = preProcessing(input)
    return multiplyAll(times.map((time, index) => getPossibleWins(time, distances[index])))
}

// Part 2
// ======

const part2 = input => {
    let {times, distances} = preProcessing(input)
    times = times.reduce((total, time) => total + '' + time.toString(), '')
    distances = distances.reduce((total, distance) => total + '' + distance.toString(), '')
    return getPossibleWins(times, distances)
}

module.exports = { part1, part2 }
