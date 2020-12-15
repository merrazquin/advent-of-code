const assert = require('assert')
const { part1, part2 } = require('./script')

const input = '0,3,6'

describe('Day 15: Rambunctious Recitation', () => {
    describe('Part One', () => {
        it('should provide what the 2020th number spoken would be', () => {
            assert.strictEqual(part1(input), 436)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(input), true)
        })
    })
})
