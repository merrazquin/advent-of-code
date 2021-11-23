const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`

describe('Day 23: Safe Cracking', () => {
    describe('Part One', () => {
        it('should return the value which was sent to the safe', () => {
            assert.strictEqual(part1(instructions, {a: 0}), 3)
        })
    })


    describe.skip('Part Two', () => {
        it('should ', () => {
            assert.strictEqual(part2(), undefined)
        })
    })
})
