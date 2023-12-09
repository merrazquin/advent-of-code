'use strict'

const { sumAll } = require("../../utils")

// Setup
const preProcessing = input => input.split('\n').map(history => history.split(/\s+/).map(num => parseInt(num)))

const getDifferences = history => {
    const iteration = []
    for (let i = 0; i < history.length - 1; i++) {
        iteration.push(history[i + 1] - history[i])
    }
    return iteration
}

const getNext = (curr, prev) => curr[curr.length - 1] + prev[prev.length - 1]

const findNextSequence = (history, iterations = []) => {
    if (!iterations.length) {
        iterations.push(history[history.length - 1])
    }
    let iteration = getDifferences(history)
    // probably only need to keep the last one
    iterations.push(iteration[iteration.length - 1])
    if (!iteration.every(iter => iter === 0)) {
        return findNextSequence(iteration, iterations)
    }
    return sumAll(iterations)
}

const findPreviousSequence = (history, iterations = []) => {
    if (!iterations.length) {
        iterations.push(history[0])
    }
    let iteration = getDifferences(history)
    iterations.push(iteration[0])
    if (!iteration.every(iter => iter === 0)) {
        return findPreviousSequence(iteration, iterations)
    }
    iterations.reverse()
    iterations.shift()
    return iterations.reduce((tally, next) => {
        tally = next - tally
        return tally
    }, 0)
}

// Part 1
// ======

const part1 = input => {
    const histories = preProcessing(input)
    return sumAll(histories.map(history => findNextSequence(history)))
}

// Part 2
// ======

const part2 = input => {
    const histories = preProcessing(input)
    return sumAll(histories.map(history => findPreviousSequence(history)))
}

module.exports = { part1, part2, getDifferences, getNext }
