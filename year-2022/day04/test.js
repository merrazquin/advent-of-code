const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

describe('Day 4: Camp Cleanup', () => {
    describe('Part One', () => {
        it('Find the number of assignment pairs in which one range fully contains the other', () => {
            assert.strictEqual(part1(data), 2)
        })
    })

    describe('Part Two', () => {
        it('Find the number of assignment pairs in which one range partially overlaps the other', () => {
            assert.strictEqual(part2(data), 4)
        })
    })
})

