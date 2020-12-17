const assert = require('assert')
const { part1, part2 } = require('./script')

const initialState = 
`.#.
..#
###`

describe('Day 17: Conway Cubes', () => {
    describe('Part One', () => {
        it('should give how many cubes are left in the active state after a six-cycle boot process', () => {
            assert.strictEqual(part1(initialState), 112)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(initialState), 112)
        })
    })
})
// 6:37 AM start time