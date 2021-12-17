const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 'target area: x=20..30, y=-10..-5'

describe('Day 17: Trick Shot', () => {
    describe('Part One', () => {
        it('should return the highest y position it reaches on a trajectory for the target area', () => {
            assert.strictEqual(part1(input), 45)
        })
    })

    describe('Part Two', () => {
        it('should return the number of initial velocities which will cause the probe to be within the target area', () => {
            assert.strictEqual(part2(input), 112)
        })
    })
})

