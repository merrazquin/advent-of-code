const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

describe('Day 15: Chiton', () => {
    describe('Part One', () => {
        it('should return the lowest total risk on the original cave', () => {
            assert.strictEqual(part1(input), 40)
        })
    })

    describe('Part Two', () => {
        it('should return the lowest total risk on the expanded cave', () => {
            assert.strictEqual(part2(input), 315)
        })
    })
})

