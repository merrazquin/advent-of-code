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

const input3 =
`F10
N3
F7
L90
F11`

const input4 =
`R90
R90
R90
R90`
describe('Day 12: An Alliteration', () => {
    describe.skip('Part One', () => {
        it('should return the correct answer for part 1', () => {
            assert.strictEqual(part1(input), 25)
            assert.strictEqual(part1(input2), 6)
        })
    })

    describe('Part Two', () => {
        it('should return the correct answer for part 2', () => {
            // assert.strictEqual(part2(input), 286)
            assert.strictEqual(part2(input4), 11)
        })
    })
})
// 2531 is incorrect
// 12:34am p1
// 1:48am 409934 too high for p2
// 1:50am 327542 too high
// 2:20am 120846 too high