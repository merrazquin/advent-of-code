const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`2199943210
3987894921
9856789892
8767896789
9899965678`

describe('Day 9: Smoke Basin', () => {
    describe('Part One', () => {
        it('should find all low points', () => {
            assert.strictEqual(part1(input), 15)
        })
    })

    describe('Part Two', () => {
        it('should return product of 3 largest basins', () => {
            assert.strictEqual(part2(input), 1134)
        })
    })
})

