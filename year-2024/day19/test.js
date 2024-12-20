const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

describe('Day 19: Linen Layout', () => {
    describe('Part One', () => {
        it('should return many designs are possible', () => {
            assert.strictEqual(part1(data), 6)
        })
    })

    describe('Part Two', () => {
        it('should return the sum of different ways you could make each design', () => {
            assert.strictEqual(part2(data), 16)
        })
    })
})

