const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
'>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

describe('Day 17: Pyroclastic Flow', () => {
    describe('Part One', () => {
        it('Finds how tall the tower of rocks will be after 2022 rocks have stopped falling', () => {
            assert.strictEqual(part1(data), 3068)
        })
    })

    describe('Part Two', () => {
        it('Find how tall the tower of rocks will be after 1000000000000 have stopped falling', () => {
            assert.strictEqual(part2(data), 1514285714288)
        })
    })
})

