'use strict'

// Setup
const preProcessing = input => {
    const left = []
    const right = []
    input.trim().split('\n').map(line => line.split(/\s+/)).forEach(lr => {
        const [l, r] = lr;
        left.push(parseInt(l))
        right.push(parseInt(r))
    });
    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)

    return {left, right}
}

// Part 1
// ======

const part1 = input => {
    const {left, right} = preProcessing(input)

    let sum = left.reduce((acc, curr, index) => acc + Math.abs(right[index] - curr), 0)
    return sum
}

// Part 2
// ======

const part2 = input => {
    const {left, right} = preProcessing(input)
    return left.reduce((acc, curr) => acc + right.filter(r => r === curr).length * curr, 0);
}

module.exports = { part1, part2 }
