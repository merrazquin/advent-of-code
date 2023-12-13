const assert = require('assert')
const { part1, part2, findSmudges } = require('./script')

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
    describe('findSmudges', () => {
        it('Should only return true if there is a single difference', () => {
            assert.strictEqual(findSmudges('#..#..###', '#..#..###'), 0, '0 smudges')
            assert.strictEqual(findSmudges('#..#..###', '#..##.###'), 1, '1 smudge')
            assert.strictEqual(findSmudges('#..#..###', '...##..##'), 3, 'Multiple smudges')
        })
    })
    describe('Part One', () => {
        it('Should summarize the notes', () => {
            assert.strictEqual(part1(data), 405)
            assert.strictEqual(part1(dataEdge), 800, 'Edge case1')
            assert.strictEqual(part1(dataEdge2), 100, 'Edge case2')
        })
    })

    describe('Part Two', () => {
        it('Find smudges before summarizing notes', () => {
            assert.strictEqual(part2(data), 400)
        })
    })
})

