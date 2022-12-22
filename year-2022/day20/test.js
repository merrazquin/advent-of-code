const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`1
2
-3
3
-2
0
4`

const demo1 = 
`0
2
-4
3
6
3
17
-1
-19`

const demo2 = 
`1
2
3
4
5
1
2
3
0
`

describe('Day 20: Grove Positioning System', () => {
    describe('Part One', () => {
        it('Find sum of grove coordinates', () => {
            assert.strictEqual(part1(data), 3)
            assert.strictEqual(part1(demo1), 1)
            assert.strictEqual(part1(demo2), 6)
        })
    })

    describe('Part Two', () => {
        it('Find corrected sum of grove coordinates', () => {
            assert.strictEqual(part2(data), 1623178306)
        })
    })
})

