const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

describe('Day 23: Unstable Diffusion', () => {
    describe('Part One', () => {
        it('Find how many empty ground tiles are contained within elves rectangle', () => {
            assert.strictEqual(part1(data), 110)
        })
    })

    describe('Part Two', () => {
        it('Find the number of the first round where no Elf moves', () => {
            assert.strictEqual(part2(data), 20)
        })
    })
})

