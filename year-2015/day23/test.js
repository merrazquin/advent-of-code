const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`inc a
jio a, +2
tpl a
inc a`

describe('Day 23: Opening the Turing Lock', () => {
    describe('Part One', () => {
        it('should return the value in register a when the program finished executing', () => {
            const {a} = part1(instructions)
            assert.strictEqual(a, 2)
        })
    })

    describe('Part Two', () => {
        it('should return the value in register a when the program finished executing, if a starts at 1', () => {
            const {a} = part2(instructions)
            assert.strictEqual(a, 7)
        })
    })
})
