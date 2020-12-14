const assert = require('assert')
const { part1, part2 } = require('./script')

const initProgram = 
`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

describe('Day 14: Docking Data', () => {
    describe('Part One', () => {
        it('should return the sum of all values left in memory after program completes', () => {
            assert.strictEqual(part1(initProgram), 165)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(initProgram), 165)
        })
    })
})
