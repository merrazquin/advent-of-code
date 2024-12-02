const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

describe('Day 21: Step Counter', () => {
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data, 6), 16)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

