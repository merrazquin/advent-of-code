const assert = require('assert')
const { part1, part2 } = require('./script')

const input = '3,4,3,1,2'

describe('Day 6: Lanternfish', () => {
    describe('Part One', () => {
        it('should return the number of fish after 80 days', () => {
            assert.strictEqual(part1(input), 5934)
        })
    })

    describe('Part Two', () => {
        it('should return the number of fish after 256 days', () => {
            assert.strictEqual(part2(input), 26984457539)
        })
    })
})

