const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

describe('Day 14: Parabolic Reflector Dish', () => {
    describe('Part One', () => {
        it('Should find the total load on the north support beams', () => {
            assert.strictEqual(part1(data), 136)
        })
    })

    describe('Part Two', () => {
        it('Should find the total load on the north support beams after 1,000,000,000 cycles', () => {
            assert.strictEqual(part2(data), 64)
        })
    })
})

