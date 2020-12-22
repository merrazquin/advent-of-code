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

const infiniteGame = 
`Player 1:
43
19

Player 2:
2
29
14`

describe('Day 22: Crab Combat', () => {
    describe('Part One', () => {
        it('should return the winner\'s score at the end of the game', () => {
            assert.strictEqual(part1(decks), 306)
        })
    })

    describe('Part Two', () => {
        it('should return player 1\'s score if infinite recursion is detected', () => {
            assert.strictEqual(part2(infiniteGame), 105)
        })
        it('should return the winners\'s score at the end of a recursive game', () => {
            assert.strictEqual(part2(decks), 291)
        })
    })
})
