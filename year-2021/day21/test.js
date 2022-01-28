const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`Player 1 starting position: 4
Player 2 starting position: 8`

describe('Day 21: Dirac Dice', () => {
    describe('Part One', () => {
        it('should return the product of the losing score and the number of times the deterministic die was rolled', () => {
            assert.strictEqual(part1(input), 739785)
        })
    })

    describe('Part Two', () => {
        it('should return the number of universes in which the winningest player wins', () => {
            assert.strictEqual(part2(input), 444356092776315)
        })
    })
})
