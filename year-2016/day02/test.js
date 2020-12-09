const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`ULL
RRDDD
LURDL
UUUUD
`
describe('Day 2: Bathroom Security', () => {
    describe('Part One', () => {
        it('should return the correct code', () => {
            assert.strictEqual(part1(instructions), '1985')
        })
    })

    describe('Part Two', () => {
        it('shoudl return the correct code', () => {
            assert.strictEqual(part2(instructions), '5DB3')
        })
    })
})
