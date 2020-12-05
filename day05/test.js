const assert = require('assert')
const { part1, part2 } = require('../day05/script')
const boardingPasses = 
`BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`

describe('Day 5: Binary Boarding', () => {
    describe('Part One', () => {
        it('should return the highest seat ID from a list of boading passes', () => {
            assert.strictEqual(part1(boardingPasses), 820)
        })
    })

    describe ('Part Two', () => {
        it('should return the missing seat ID from a list of boarding passes', () => {
            assert.strictEqual(part2(boardingPasses), 120)
        })
    })
})

