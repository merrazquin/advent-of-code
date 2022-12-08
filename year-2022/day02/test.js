const assert = require('assert')
const { part1, part2 } = require('./script')

const guide = 
`A Y
B X
C Z`

describe('Day 2: Rock Paper Scissors', () => {
    describe('Part One', () => {
        it('Get score with p1 rules', () => {
            assert.strictEqual(part1(guide), 15)
        })
    })

    describe('Part Two', () => {
        it('Get score with p2 rules', () => {
            assert.strictEqual(part2(guide), 12)
        })
    })
})

