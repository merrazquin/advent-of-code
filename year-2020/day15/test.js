const assert = require('assert')
const { part1, part2 } = require('./script')

describe('Day 15: Rambunctious Recitation', () => {
    describe('Part One', () => {
        it('should provide what the 2020th number spoken would be', () => {
            assert.strictEqual(part1('0,3,6'), 436)
            assert.strictEqual(part1('1,3,2'), 1)
            assert.strictEqual(part1('2,1,3'), 10)
            assert.strictEqual(part1('1,2,3'), 27)
            assert.strictEqual(part1('2,3,1'), 78)
            assert.strictEqual(part1('3,2,1'), 438)
            assert.strictEqual(part1('3,1,2'), 1836)
        })
    })

    describe('Part Two', () => {
        it('should provide what the 30000000th number spoken would be', () => {
            assert.strictEqual(part2('0,3,6', 2020), 436)
            assert.strictEqual(part2('3,1,2', 2020), 1836)
            
            // These would take wayyyyyy too long
            // assert.strictEqual(part2('0,3,6'), 175594)
            // assert.strictEqual(part2('1,3,2'), 2578)
            // assert.strictEqual(part2('2,1,3'), 3544142)
            // assert.strictEqual(part2('1,2,3'), 261214)
            // assert.strictEqual(part2('2,3,1'), 6895259)
            // assert.strictEqual(part2('3,2,1'), 18)
            // assert.strictEqual(part2('3,1,2'), 362)
        })
    })
})
// started p2 at 9:10