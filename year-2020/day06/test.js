const assert = require('assert')
const { part1, part2 } = require('./script')

const answers = 
`abc

a
b
c

ab
ac

a
a
a
a

b`

describe('Day 6: Custom Customs', () => {
    describe('Part One', () => {
        it('should return the sum of questions to which anyone answered yes', () => {
            assert.strictEqual(part1(answers), 11)
        })
    })

    describe('Part Two', () => {
        it('should return the sum of questions to which all parties in group answered yes', () => {
            assert.strictEqual(part2(answers), 6)
        })
    })
})
