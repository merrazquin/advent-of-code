const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`F10
N3
F7
R90
F11`

const input2 =
`L270
N15
S10
E5
R90
W6`
/*
S
0, -15
0, -5
5, -5
W
-1, -5
*/

describe('Day 12: Rain Risk', () => {
    describe('Part One', () => {
        it('should return the Manhattan distance of the ship\'s current position to it\'s starting position', () => {
            assert.strictEqual(part1(input), 25)
            assert.strictEqual(part1(input2), 6)
        })
    })

    describe('Part Two', () => {
        it('should return the Manhattan distance of the ship\'s current position to it\'s starting position when using a waypoint', () => {
            assert.strictEqual(part2(input), 286)
        })
    })
})
// 2531 is incorrect
// 12:34am p1
// 1:48am 409934 too high for p2
// 1:50am 327542 too high
// 2:20am 120846 too high
// 6:50am start rotation refactor
// 7:11am rotation util complete
// 7:47am p2