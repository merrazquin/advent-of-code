const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

describe('Day 3: Gear Ratios', () => {
    describe('Part One', () => {
        it('Should find the sum of all of the part numbers in the engine schematic', () => {
            assert.strictEqual(part1(data), 4361)
        })
    })

    describe('Part Two', () => {
        it('Should find the sum of all of the gear ratios in your engine schematic', () => {
            assert.strictEqual(part2(data), 467835)
        })
    })
})

