const assert = require('assert')
const { part1, part2 } = require('./script')

const password = 'abcde'
const instructions = 
`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d
`
describe('Day 21: Scrambled Letters and Hash', () => {
    describe('Part One', () => {
        it('should return the scrambled password', () => {
            assert.strictEqual(part1(instructions, password), 'decab')
        })
    })

    describe('Part Two', () => {
        it('should return the unscrambled password', () => {
            assert.strictEqual(part2(instructions, password), 'dbace')
        })
    })
})
