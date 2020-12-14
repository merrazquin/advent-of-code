const assert = require('assert')
const { part1, part2 } = require('./script')

const initProgram = 
`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

const initProgram2 =
`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`

describe('Day 14: Docking Data', () => {
    describe('Part One', () => {
        it('should return the sum of all values left in memory after program completes', () => {
            assert.strictEqual(part1(initProgram), 165)
        })
    })

    describe('Part Two', () => {
        it('should return the sum of all values left in memory after the program completes', () => {
            assert.strictEqual(part2(initProgram2), 208)
        })
    })
})
