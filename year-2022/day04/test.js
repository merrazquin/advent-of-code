const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

describe('Day 4: Scratch', () => {
    describe('Part One', () => {
        it('Get score with p1 rules', () => {
            assert.strictEqual(part1(data), 2)
        })
    })

    describe('Part Two', () => {
        it('Get score with p2 rules', () => {
            assert.strictEqual(part2(data), 4)
        })
    })
})

