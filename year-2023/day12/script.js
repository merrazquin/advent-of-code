'use strict'

const { sumAll, memoize } = require('../../utils')

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
        return memoizePerm(spring.slice(1), sizes)
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
            return memoizePerm(newSpring, sizes.slice(1))
        } else {
            return 0
        }
    }

    if (firstChar === '?') {
        const springA = spring.slice()
        springA[0] = '.'
        const springB = spring.slice()
        springB[0] = '#'

        return memoizePerm(springA, sizes) + memoizePerm(springB, sizes)
    }
}
const memoizePerm = memoize(findPermutations)

const part1 = input => {
    const instructions = preProcessing(input)
    return sumAll(instructions.map(instrucion => memoizePerm(instrucion.springs, instrucion.sizes)))
}

// Part 2
// ======
const expand = instruction => {
    let springs = instruction.springs.join('') + '?'
    springs = springs.repeat(5)
    springs = springs.split('')
    springs.pop()
    return {
        springs,
        sizes: Array.apply(null, Array(5)).map(() => instruction.sizes).flat()
    }
}
const part2 = input => {
    const instructions = preProcessing(input).map(instruction => expand(instruction))
    return sumAll(instructions.map(instrucion => memoizePerm(instrucion.springs, instrucion.sizes)))
}

module.exports = { part1, part2, findPermutations, expand }
