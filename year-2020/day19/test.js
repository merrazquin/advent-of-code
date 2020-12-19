const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`

describe('Day 19: Monster Messages', () => {
    describe('Part One', () => {
        it('should determine the number of messages that completely match rule 0', () => {
            assert.strictEqual(part1(input), 2)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(input), true)
        })
    })
})
