const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`30373
25512
65332
33549
35390`

describe('Day 8: Treetop Tree House', () => {
    describe('Part One', () => {
        it('Find how many trees are visible from outside the grid', () => {
            assert.strictEqual(part1(data), 21)
        })
    })

    describe('Part Two', () => {
        it('Find the highest scenic score', () => {
            assert.strictEqual(part2(data), 8)
        })
    })

})

