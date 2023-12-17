const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`

describe('Day 16: The Floor Will Be Lava', () => {
    describe('Part One', () => {
        it('Should find the number of energized tiles', () => {
            assert.strictEqual(part1(data), 46)
        })
    })

    describe('Part Two', () => {
        it('Should find the max number of energized tiles', () => {
            assert.strictEqual(part2(data), 51)
        })
    })
})

