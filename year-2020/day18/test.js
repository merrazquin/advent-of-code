const assert = require('assert')
const { part1, part2 } = require('./script')

const homework = 
`1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`

describe('Day 18: Operation Order', () => {
    describe('Part One', () => {
        it('should evaluate the expression on each line of homework and provide the sum of the resulting values', () => {
            assert.strictEqual(part1(homework), 26457)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(homework), 51)
        })
    })
})
