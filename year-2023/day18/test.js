const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`

const dataB = 
`R 1
D 2
R 5
U 2
L 2
U 2
R 2
U 5
L 6
D 2
R 2
D 3
L 2
D 2`

const dataC = 
`U 5
L 6
D 5
R 6`

const dataD = 
`R 2
D 2
L 2
U 2`

describe('Day 18: Lavaduct Lagoon', () => {
    describe('Part One', () => {
        it('Should find how many cubic meters of lava the lagoon can hold', () => {
            assert.strictEqual(part1(data), 62)
            assert.strictEqual(part1(dataB), 62)
            assert.strictEqual(part1(dataC), 42)
            assert.strictEqual(part1(dataD), 9)
        })
    })

    describe('Part Two', () => {
        it('Should find how many cubic meters of lava the lagoon can hold when parsing color as instructions', () => {
            assert.strictEqual(part2(data), 952408144115)
        })
    })
})