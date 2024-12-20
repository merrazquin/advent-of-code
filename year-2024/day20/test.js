const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`

describe('Day 20: Race Condition', () => {
    describe('Part One', () => {
        it('should find how many cheats would save you at least 100 picoseconds', () => {
            assert.strictEqual(part1(data, 1), 44)
        })
    })

    describe('Part Two', () => {
        it.skip('should find how many cheats would save you at least 100 picoseconds (updated rules)', () => {
            assert.strictEqual(part2(data, 50), 285)
        })
    })
})

