const assert = require('assert')
const { part1, part2 } = require('./script')

const xmas = 
`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

describe('Day 9: Encoding Error', () => {
    describe('Part One', () => {
        it('should find the first non-valid number', () => {
            assert.strictEqual(part1(xmas, 5), 127)
        })
    })

    describe('Part Two', () => {
        it('should find the sequence that adds up to the part1 answer', () => {
            assert.strictEqual(part2(xmas, 5), 62)
        })
    })
})
