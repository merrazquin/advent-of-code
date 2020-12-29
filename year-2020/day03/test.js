const assert = require('assert')
const { part1, part2 } = require('./script')

const geology = 
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

describe('Day 3: Toboggan Trajectory', () => {
    describe('Part One', () => {
        it('should return the number of trees encountered on a single slope', () => {
            assert.strictEqual(part1(geology), 7)
        })
    })

    describe('Part Two', () => {
        it('should find the product of trees across multiple slopes', () => {
            assert.strictEqual(part2(geology), 336)
        })
    })
})
