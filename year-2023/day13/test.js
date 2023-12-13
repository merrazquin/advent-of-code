const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

const dataEdge = 
`...##......##.#
.#....#..##..#.
#.####.##.#....
##....##.#.#...
#.####.#######.
........#.#####
##.#..##....#.#
#.#..#.#.###...
#.#..#.#.###...`

const dataEdge2 = 
`##.....#...
##.....#...
#..###....#
##.#..#.##.
#..#####..#
#.#....#.#.
.##.##....#
.###..###.#
...#.......
....#.#.###
#......#.##
...#.##....
...#.##....
#......#.##
....#.#.###
...#.......
.###..#####`

describe('Day 13: Point of Incindence', () => {
    describe('Part One', () => {
        it('Should summarize the notes', () => {
            assert.strictEqual(part1(data), 405)
            assert.strictEqual(part1(dataEdge), 800, 'Edge case1')
            assert.strictEqual(part1(dataEdge2), 100, 'Edge case2')
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

