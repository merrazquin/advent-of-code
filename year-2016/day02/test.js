const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`ULL
RRDDD
LURDL
UUUUD
`
describe.only('Day 2: Bathroom Security', () => {
    describe('Part One', () => {
        it('should return the correct code', () => {
            assert.strictEqual(part1(instructions), '1985')
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            // assert.strictEqual(part2(instructions), )
        })
    })
})
