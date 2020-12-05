const assert = require('assert')
const { part1, part2 } = require('./script')
const numbers =
    `1721
    979
    366
    299
    675
    1456`

describe('Day 1: Report Repair', () => {
    describe('Part One', () => {
        it('should return the product of 2 numbers which sum to 2020', () => {
            assert.strictEqual(part1(numbers), 514579)
        })
    })

    describe ('Part Two', () => {
        it('should return the product of 3 numbers which sum to 2020', () => {
            assert.strictEqual(part2(numbers), 241861950)
        })
    })
})

