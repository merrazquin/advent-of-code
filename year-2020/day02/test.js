const assert = require('assert')
const { part1, part2 } = require('./script')

const passwords = 
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

describe('Day 2: Password Philosophy', () => {
    describe('Part One', () => {
        it('should provide the total number of valid passwords', () => {
            assert.strictEqual(part1(passwords), 2)
        })
    })

    describe ('Part Two', () => {
        it('should provide the total number of valid passwords (new policy)', () => {
            assert.strictEqual(part2(passwords), 1)
        })
    })
})

