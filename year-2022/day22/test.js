const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

describe('Day 22: Monkey Map', () => {
    describe('Part One', () => {
        it('Find the final password', () => {
            assert.strictEqual(part1(data), 6032)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

