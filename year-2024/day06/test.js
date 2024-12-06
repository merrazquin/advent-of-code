const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

describe('Day 6: Day 6: Guard Gallivant', () => {
    describe('Part One', () => {
        it('should find how many distinct positions the guard visits before leaving the mapped area', () => {
            assert.strictEqual(part1(data), 41)
        })
    })

    describe('Part Two', () => {
        it('should find how many different obstruction positions would create a loop', () => {
            assert.strictEqual(part2(data), 6)
        })
    })
})

