const assert = require('assert')
const { part1 } = require('./script')

const instructions = 
`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`

describe('Day 8: Two-Factor Authentication', () => {
    describe('Part One', () => {
        it('should return the number of toggled on cells', () => {
            assert.equal(part1(instructions, 7, 3), 6)
        })
    })
})
