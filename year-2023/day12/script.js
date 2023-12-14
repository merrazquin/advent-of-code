'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(row => {
    const [springs, sizes] = row.split(' ')
    return {springs: springs.split(''), sizes: sizes.split(',').map(size => parseInt(size))}
})

// Part 1
// ======
const findPermutations = (spring, sizes) => {
    if (!spring.length) {
        return (!sizes.length ? 1 : 0)
    }

    const firstChar = spring[0]
    const currSize = sizes[0]

    if (firstChar === '.') {
        return findPermutations(spring.slice(1), sizes)
    }

    if (firstChar === '#') {
        if (spring.length >= currSize
                && !spring.slice(0, currSize).includes('.')
                && spring[currSize] !== '#'
        ) {
            const newSpring = spring.slice(currSize)
            if (newSpring[0] === '?') {
                newSpring[0] = '.'
            }
            return findPermutations(newSpring, sizes.slice(1))
        } else {
            return 0
        }
    }

    if (firstChar === '?') {
        const springA = spring.slice()
        springA[0] = '.'
        const springB = spring.slice()
        springB[0] = '#'

        return findPermutations(springA, sizes) + findPermutations(springB, sizes)
    }
}

const part1 = input => {
    const instructions = preProcessing(input)
    return sumAll(instructions.map(instrucion => findPermutations(instrucion.springs, instrucion.sizes)))
}

// Part 2
// ======

const part2 = input => {
    return 0 // preProcessing(input)
}

module.exports = { part1, part2, findPermutations }
