const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

describe('Day 4: Ceres Search', () => {
    describe('Part One', () => {
        it('should find all instances of XMAS in the word search', () => {
            assert.strictEqual(part1(data), 18)
        })
    })

    describe('Part Two', () => {
        it('should find all instances of Xs made of MAS in the word search', () => {
            assert.strictEqual(part2(data), 9)
        })
    })
})

