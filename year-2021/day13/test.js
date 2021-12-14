const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

const part2Output =
`#####
#...#
#...#
#...#
#####
.....
.....`

describe('Day 13: Transparent Origami', () => {
    describe('Part One', () => {
        it('should return the number of dots visible after the first fold', () => {
            assert.strictEqual(part1(input), 17)
        })
    })

    describe('Part Two', () => {
        it('should display the code after performing all folds on the paper', () => {
            assert.strictEqual(part2(input), part2Output)
        })
    })
})

