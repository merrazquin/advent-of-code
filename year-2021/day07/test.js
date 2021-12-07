const assert = require('assert')
const { part1, part2 } = require('./script')

const crabs = '16,1,2,0,4,2,7,1,2,14'

describe('Day 7: The Treachery of Whales', () => {
    describe('Part One', () => {
        it('should return the cheapest possible alignment, constant fuel rate', () => {
            assert.strictEqual(part1(crabs), 37)
        })
    })

    describe('Part Two', () => {
        it('should return the cheapest possible alignment, variable fuel rate', () => {
            assert.strictEqual(part2(crabs), 168)
        })
    })
})

