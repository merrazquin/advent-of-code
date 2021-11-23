const assert = require('assert')
const { part1, part2 } = require('./script')

const saltPrefix = 'abc'

describe('Day 14: One-Time Pad', () => {
    describe('Part One', () => {
        it('should return the index of the 64th key', () => {
            assert.strictEqual(part1(saltPrefix), 22728)
        })
    })


    describe.skip('Part Two', () => {
        it('should return the index of the 64th key using stretched hashes', () => {
            assert.strictEqual(part2(saltPrefix), 22551)
        })
    })
})
