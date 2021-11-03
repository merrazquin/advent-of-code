const assert = require('assert')
const { part1, part2 } = require('./script')

const target = '130'

describe('Day 20: Infinite Elves and Infinite Houses', () => {
    describe('Part One', () => {
        it('should return the lowest house number to get at least as many presents as the target', () => {
            assert.strictEqual(part1(target), 8)
        })
    })

    describe('Part Two', () => {
        it('should return the lowest house number to get at least as many presents as the target, when elves deliver 11 times the presents for only the first 50 houses', () => {
            assert.strictEqual(part2(target), 6)
        })
    })
})
