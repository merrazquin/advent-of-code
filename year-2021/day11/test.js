const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const simpleInput = 
`11111
19991
19191
19991
11111`

describe('Day 11: Dumbo Octopus', () => {
    describe('Part One', () => {
        it('should return the number of flashes after a given number of steps', () => {
            assert.strictEqual(part1(simpleInput, 2), 9)
            assert.strictEqual(part1(input), 1656)
        })
    })

    describe('Part Two', () => {
        it('should return the step on which all flashes are synchronized', () => {
            assert.strictEqual(part2(input), 195)
        })
    })
})

