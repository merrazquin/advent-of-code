const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

describe('Day 13: Distress Signal', () => {
    describe('Part One', () => {
        it('Find the indices sum of pairs which are in the correct order', () => {
            assert.strictEqual(part1(data), 13)
        })
    })

    describe('Part Two', () => {
        it('Find the decoder key for the distress signal', () => {
            assert.strictEqual(part2(data), 140)
        })
    })
})

