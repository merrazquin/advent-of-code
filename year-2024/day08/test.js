const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

describe('Day 8: Resonant Collinearity', () => {
    describe('Part One', () => {
        it('should find all unique locations of antinodes', () => {
            assert.strictEqual(part1(data), 14)
        })
    })

    describe('Part Two', () => {
        it('should find all unique locations of antinodes - with resonant harmmonics', () => {
            assert.strictEqual(part2(data), 34)
        })
    })
})

