const assert = require('assert')
const { part1, part2 } = require('./script')

const cups = '389125467'

describe('Day 23: Crab Cups', () => {
    describe('Part One', () => {
        it('should return the labels on the cups (other than cup 1) after n moves', () => {
            assert.strictEqual(part1(cups, 10), 67384529)
            assert.strictEqual(part1(cups, 100), 67384529)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(cups), 67384529)
        })
    })
})
