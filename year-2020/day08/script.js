'use strict'

// Setup

// Part 1
// ======

const part1 = input => {
    /* eslint-disable no-fallthrough */
    let acc = 0
    const instructions = input.split('\n')
    let visitedIndices = {}
    for (let i = 0; i < instructions.length;) {
        if (visitedIndices[i]) {
            return acc
        }
        visitedIndices[i] = true

        const instructionSet = instructions[i]
        let [operation, argument] = instructionSet.split(' ')
        argument = parseInt(argument)
        switch (operation) {
        case 'jmp':
            i += argument
            break
        case 'acc':
            acc += argument
        case 'nop':
            i++
            break
        }
    }
    /* eslint-enable no-fallthrough */
}

// Part 2
// ======

const getVariation = (instructions, startIndex) => {
    const nextJmp = instructions.indexOf('jmp', startIndex)
    const nextNop = instructions.indexOf('nop', startIndex)
    if (nextJmp != -1 && (nextNop == -1 || nextJmp < nextNop)) {
        return {
            index: nextJmp + 3,
            instructions: instructions.substr(0, nextJmp) + 'nop' + instructions.substr(nextJmp + 3)
        }
    }

    if (nextNop != -1 && (nextJmp == -1 || nextNop < nextJmp)) {
        return {
            index: nextNop + 3,
            instructions: instructions.substr(0, nextNop) + 'jmp' + instructions.substr(nextNop + 3)
        }
    }
}

const part2 = input => {
    /* eslint-disable no-fallthrough */
    let variation = getVariation(input, 0)
    while (variation) {
        let acc = 0
        const instructions = variation.instructions.split('\n')
        let visitedIndices = {}
        let infiniteLoopFound = false
        for (let i = 0; i < instructions.length;) {
            if (visitedIndices[i]) {
                infiniteLoopFound = true
                break
            }
            
            visitedIndices[i] = true

            const instructionSet = instructions[i]
            let [operation, argument] = instructionSet.split(' ')
            argument = parseInt(argument)
            switch (operation) {
            case 'jmp':
                i += argument
                break
            case 'acc':
                acc += argument
            case 'nop':
                i++
                break
            }
        }

        if (!infiniteLoopFound) {
            return acc
        }
        variation = getVariation(input, variation.index)
    }
    /* eslint-disable no-fallthrough */
}

module.exports = { part1, part2 }

// 6:32 AM start
// 6:44 AM part 1
// 7:32 AM part 2