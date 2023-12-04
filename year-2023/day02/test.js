const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

describe.only('Day 2: Cube Conundrum', () => {
    describe('Part One', () => {
        it('Should find the sum of the IDs of the games which would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes', () => {
            assert.strictEqual(part1(data), 8)
        })
    })

    describe('Part Two', () => {
        it('Should find the sum of the power of all games', () => {
            assert.strictEqual(part2(data), 2286)
        })
    })
})

