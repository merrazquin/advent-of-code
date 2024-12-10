const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

describe('Day 10: Hoof It', () => {
    describe('Part One', () => {
        it('should calculate the total score of all trailheads', () => {
            assert.strictEqual(part1(data), 36)
        })
    })

    describe('Part Two', () => {
        it('should calculate the total rating of all trailheads', () => {
            assert.strictEqual(part2(data), 81)
        })
    })
})

