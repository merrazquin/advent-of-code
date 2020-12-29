const assert = require('assert')
const { part1, part2, part3 } = require('./script')
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

    describe('Part Two', () => {
        it('should return the missing seat ID from a list of boarding passes', () => {
            assert.strictEqual(part2(boardingPasses), 120)
        })
    })

    describe('BONUS: Part Three', () => {
        it('should provide the boarding pass for a seat ID', () => {
            assert.strictEqual(part3(567), 'BFFFBBFRRR')
            assert.strictEqual(part3(119), 'FFFBBBFRRR')
            assert.strictEqual(part3(820), 'BBFFBBFRLL')
        })
    })
})

