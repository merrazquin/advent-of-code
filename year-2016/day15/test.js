const assert = require('assert')
const { part1, part2 } = require('./script')

const discs = 
`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`

describe('Day 15: Timing is Everything', () => {
    describe('Part One', () => {
        it('should tell you when to push the button in order to get a capsule', () => {
            assert.strictEqual(part1(discs), 5)
        })
    })


    describe('Part Two', () => {
        it('should tell you when to push the button in order to get a capsule (after adding a new disc)', () => {
            assert.strictEqual(part2(discs), 85)
        })
    })
})
