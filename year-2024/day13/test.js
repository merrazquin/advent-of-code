const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

describe('Day 13: Claw Contraption', () => {
    describe('Part One', () => {
        it('should determine the fewest tokens needed to win all possible prizes', () => {
            assert.strictEqual(part1(data), 480)
        })
    })

    describe('Part Two', () => {
        it('should determine the fewest tokens needed to win all possible prizes (adjusted)', () => {
            assert.strictEqual(part2(data), 875318608908)
        })
    })
})

