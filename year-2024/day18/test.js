const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

describe('Day 18: RAM Run', () => {
    describe('Part One', () => {
        it('should find the minimum number of steps needed to reach the exit', () => {
            assert.strictEqual(part1(data, 6, 12), 22)
        })
    })

    describe('Part Two', () => {
        it('should find the coordinates of the first byte that will prevent the exit from being reachable from your starting position', () => {
            assert.strictEqual(part2(data, 6, 12), '6,1')
        })
    })
})

