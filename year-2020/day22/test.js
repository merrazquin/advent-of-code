const assert = require('assert')
const { part1, part2 } = require('./script')

const decks = 
`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`

describe('Day 22: Crab Combat', () => {
    describe('Part One', () => {
        it('should return the winner\'s score at the end of the game', () => {
            assert.strictEqual(part1(decks), 306)
        })
    })

    describe ('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(decks), 306)
        })
    })
})
