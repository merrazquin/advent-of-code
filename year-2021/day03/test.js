const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

describe('Day 3: Binary Diagnostic', () => {
    describe('Part One', () => {
        it('should return the power consumption of the submarine (a product of gamma & epsilon rate)', () => {
            assert.strictEqual(part1(input), 198)
        })
    })

    describe('Part Two', () => {
        it('should return the life support rating of the submarine (a product of oxygen generator and CO2 scrubber ratings)', () => {
            assert.strictEqual(part2(input), 230)
        })
    })
})

