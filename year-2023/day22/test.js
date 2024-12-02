const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`

describe('Day 22: Sand Slabs', () => {
    describe('Part One', () => {
        it('Should find how many bricks could safely be chosen as the one to get disintegrated', () => {
            assert.strictEqual(part1(data), 5)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

