const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

describe('Day 2: Gift Shop', () => {
    describe('Part One', () => {
        it('Should sum all invalid IDs that contain a pattern repeated exactly once', () => {
            assert.strictEqual(part1(data), 1227775554)
        })
    })

    describe('Part Two', () => {
        it('Should sum all invalid IDs that contain any size repeating pattern', () => {
            assert.strictEqual(part2(data), 4174379265)
        })
    })
})

