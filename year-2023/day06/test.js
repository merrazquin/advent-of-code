const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`Time:      7  15   30
Distance:  9  40  200`

describe('Day 6: Wait For It', () => {
    describe('Part One', () => {
        it('It should get the product of the number of ways you can beat the record', () => {
            assert.strictEqual(part1(data), 288)
        })
    })

    describe('Part Two', () => {
        it('It should get the product of the number of ways you can beat the record (single race)', () => {
            assert.strictEqual(part2(data), 71503)
        })
    })
})

