const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`

describe('Day 12: Leonardo\'s Monorail', () => {
    describe('Part One', () => {
        it('should return the value of register a', () => {
            assert.strictEqual(part1(instructions), 42)
        })
    })


    describe('Part Two', () => {
        it('should return the value of register a', () => {
            assert.strictEqual(part2(instructions), 42)
        })
    })
})
