'use strict'

const { sumAll, solveLogicPuzzle } = require('../../utils')

// Setup
const uncrossedSegments = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg'
]
const segmentDefinitions = {
    '012456': 0, 
    '25': 1, 
    '02346': 2, 
    '02356': 3,
    '1235': 4,
    '01356': 5,
    '013456': 6,
    '025': 7,
    '0123456': 8,
    '012356': 9
}

const findSegmentZero = (digitOne, digitSeven) => {
    return digitSeven.split('').filter(letter => digitOne.indexOf(letter) === -1)
}
const findSegmentsOneAndThree = (digitOne, digitFour) => {
    return digitFour.split('').filter(letter => digitOne.indexOf(letter) === -1)
}
const findSegmentsTwoThreeFour = permutations => {
    // find the 3 letters which don't exist in all permutations
    const allLetters = [... new Set(permutations.join('').split(''))]
    return allLetters.filter(letter => permutations.some(permutation => permutation.indexOf(letter) === -1))
}
const findSegmentTwo = (candidates, digitOne) => {
    return candidates.filter(letter => digitOne.indexOf(letter) !== -1)
}
const findSegmentFive = (segmentTwo, digitFive) => {
    return digitFive.split('').filter(letter => !segmentTwo.includes(letter))
}
const findSegmentSix = segments => {
    const usedLetters = segments.map(segment => segment.join('')).join('')
    return 'abcdefg'.split('').filter(letter => usedLetters.indexOf(letter) === -1)
}
const findSegmentFour = (candidates, digitFour) => {
    return candidates.filter(letter => digitFour.indexOf(letter) === -1)
}
const findSegmentThree = (candidates, digitZero) => {
    return candidates.filter(letter => !digitZero.every(str => str.indexOf(letter) !== -1))
}

const segmentsPerDigit = uncrossedSegments.map(str => str.length)

// Part 1
// ======

const part1 = input => {
    return sumAll(input.trim().split('\n').map(line => line.split(' | ')[1].split(' ').filter(char => [2,4,3,7].includes(char.length)).length))
}

// Part 2
// ======

const part2 = input => {
    let sum = 0
    input.trim().split('\n').forEach(fullLine => {
        let [line, codes] = fullLine.split(' | ')
        let possibilities = new Array(10).fill('').map(() => [])
        const digits = line.split(' ')
        for (let i = 0; i < segmentsPerDigit.length; i++) {
            possibilities[i].push(... digits.filter(char => char.length == segmentsPerDigit[i]))
        }
        possibilities = possibilities.map(arr => [...new Set(arr)])
        let segmentMapping = new Array(7).fill('').map(() => [])
        let mapping = {}
        possibilities.forEach((possibility, index) => {
            mapping[index] = possibility
        })
        mapping = solveLogicPuzzle(mapping)
        segmentMapping[0] = findSegmentZero(mapping['1'], mapping['7'])
        const oneThree = findSegmentsOneAndThree(mapping['1'], mapping['4'])
        segmentMapping[1] = oneThree.slice()
        segmentMapping[3] = oneThree.slice()
        const twoThreeFour = findSegmentsTwoThreeFour(mapping['0'])
        segmentMapping[2] = findSegmentTwo(twoThreeFour, mapping['1'])
        segmentMapping[3].push(... twoThreeFour)
        segmentMapping[4] = twoThreeFour.slice()
        segmentMapping[5] = findSegmentFive(segmentMapping[2], mapping['1'])      
        segmentMapping[6] = findSegmentSix(segmentMapping)
        segmentMapping = segmentMapping.map(arr => [...new Set(arr)])
        segmentMapping = solveLogicPuzzle(segmentMapping)
        segmentMapping[4] = findSegmentFour(segmentMapping[4], mapping['4'])
        segmentMapping[3] = findSegmentThree(segmentMapping[3], mapping['0'])
        segmentMapping = solveLogicPuzzle(segmentMapping)
        const reversedMapping = {}
        for (const key in segmentMapping) {
            if (Object.hasOwnProperty.call(segmentMapping, key)) {
                const element = segmentMapping[key]
                reversedMapping[element] = parseInt(key)
            }
        }
        codes = codes.split(' ').map(
            code => code.split('').map(
                letter => reversedMapping[letter]).sort((a, b) => a-b
            )
        ).map(codeArr => segmentDefinitions[codeArr.join('')])
        sum += parseInt(codes.join(''))
    })
    return sum
}

module.exports = { part1, part2 }
