const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

describe('Day 7: Bridge Repair', () => {
    describe('Part One', () => {
        it('should give the total calibration result', () => {
            assert.strictEqual(part1(data), 3749)
        })
    })

    describe('Part Two', () => {
        it('should give the total calibration result - with concatenation', () => {
            assert.strictEqual(part2(data), 11387)
        })
    })
})

