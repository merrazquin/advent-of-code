const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

describe('Day 11: Cosmic Expansion', () => {
    describe('Part One', () => {
        it('Should find the sum of the shortest paths between every pair of galaxies, expansion size = 2', () => {
            assert.strictEqual(part1(data), 374)
        })
    })

    describe('Part Two', () => {
        it('Should find the sum of the shortest paths between every pair of galaxies, expansion sizes = 10 & 100', () => {
            assert.strictEqual(part2(data, 10), 1030)
            assert.strictEqual(part2(data, 100), 8410)
        })
    })
})

