const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

describe('Day 8: Handheld Halting', () => {
    describe('Part One', () => {
        it('should break out of an infinite loop and return the value of the accumulator', () => {
            assert.strictEqual(part1(instructions), 5)
        })
    })

    describe('Part Two', () => {
        it('should repair the instruction set and return the value of the accumulator', () => {
            assert.strictEqual(part2(instructions), 8)
        })
    })
})
