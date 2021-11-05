'use strict'

const validTriangle = triangleString => {
    const [a, b, c] = triangleString.trim().split(/\s+/).map(num => parseInt(num)).sort((a, b) => a - b)
    return c - (a + b) < 0
}
// Part 1
// ======

const part1 = input => {
    return input.trim().split('\n').filter(triangleString => validTriangle(triangleString)).length
}

// Part 2
// ======
const getTriangleColumns = input => {
    const cols = [[], [], []]
    input.trim().split('\n').forEach(row => row.trim().split(/\s+/).forEach((col, index) => cols[index].push(col)))
    return cols
}
const part2 = input => {
    const singleFile = [].concat.apply([], getTriangleColumns(input))
    return singleFile.reduce((acc, curr, index, arr) => {
        if (index % 3 === 0) {
            acc.push(arr.slice(index, index + 3).join('  '))
        }
        return acc
    }, []).filter(triangleString => validTriangle(triangleString)).length
}

module.exports = { part1, part2, validTriangle }