const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`forward 5
down 5
forward 8
up 3
down 8
forward 2`

describe('Day 2: Dive!', () => {
    describe('Part One', () => {
        it('should return the product of final horizontal position & depth', () => {
            assert.strictEqual(part1(input), 150)
        })
    })

    describe('Part Two', () => {
        it('should return the product of final horizontal position & depth (factoring in aim)', () => {
            assert.strictEqual(part2(input), 900)
        })
    })
})

