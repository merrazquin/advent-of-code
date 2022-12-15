const assert = require('assert')
const { part1, part2 } = require('./script')

const guide = 
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

describe('Day 14: Regolith Reservoir', () => {
    describe('Part One', () => {
        it('Find the number of sand units which come to rest before stand starts flowing into the abyss', () => {
            assert.strictEqual(part1(guide), 24)
        })
    })

    describe('Part Two', () => {
        it('Find the number of sand units which come to rest before the source of sand is blocked', () => {
            assert.strictEqual(part2(guide), 93)
        })
    })
})

