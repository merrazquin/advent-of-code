'use strict'

const validTriangle = triangleString => {
    const [a, b, c] = triangleString.trim().split('  ').map(num => parseInt(num)).sort((a, b) => a - b)
    return c - (a + b) < 0
}
// Part 1
// ======

const part1 = input => {
    return input.trim().split('\n').filter(triangleString => validTriangle(triangleString)).length
}

// Part 2
// ======

const part2 = input => {
    
}

module.exports = { part1, part2, validTriangle }
