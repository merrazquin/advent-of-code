const assert = require('assert')
const { part1, part2 } = require('./script')

const guide = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

describe('Day 12: Hill Climbing Algorithm ', () => {
    describe('Part One', () => {
        it('Find the shortest path', () => {
            assert.strictEqual(part1(guide), 31)
        })
    })

    describe('Part Two', () => {
        it('Find the shortest path from any square with elevation a', () => {
            assert.strictEqual(part2(guide), 29)
        })
    })
})

