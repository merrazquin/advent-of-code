const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`3-5
10-14
16-20
12-18

1
5
8
11
17
32`

describe('Day 5: Cafeteria', () => {
    describe('Part One', () => {
        it('Should return the number of fresh ingredients available', () => {
            assert.strictEqual(part1(data), 3)
        })
    })

    describe('Part Two', () => {
        it('Should return the maximum number of fresh ingredients possible', () => {
            assert.strictEqual(part2(data), 14)
        })
    })
})

