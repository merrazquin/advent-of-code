'use strict'

const { getAllTokenizedPermutations, memoize } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(row => {
    const [springs, sizes] = row.split(' ')
    return {springs, sizes: sizes.split(',').map(size => parseInt(size))}
})

// Part 1
// ======

// Brute force takes 7 minute for p1... do not recommend 
const part1Brute = input => {
    const instructions = preProcessing(input)
    let total = 0
    instructions.forEach(instruction => {
        const memoizedIsViable = wrappedIsViable(instruction.sizes.join('_'))
        total += getAllTokenizedPermutations(
            instruction.springs, '?', ['.', '#']
        ).filter(perm => memoizedIsViable(perm)).length
    })
    return total
}
const wrappedIsViable = (sizes) => {
    const memoizedIsViable = memoize(isViable)
    return function(perm) {
        const arg = [perm, sizes]
        return memoizedIsViable.apply(this, arg)
    } 
}
const isViable = (permutation, sizes) => {
    return permutation.replace(/\.+/g, ' ').trim().split(/\s+/).map(spring => spring.length).join('_') === sizes
}

const part1 = input => {
    return part1Brute(input)
}

// Part 2
// ======

const part2 = input => {
    return 0 // preProcessing(input)
}

module.exports = { part1, part2 }
