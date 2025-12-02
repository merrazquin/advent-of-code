const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const data2 = 
`L68
L30
R48
L5
R120
L55
L1
L99
R14
L82`

describe('Day 1: Secret Entrance', () => {
    describe('Part One', () => {
        it('Should count the number of times the dial lands on 0 after a rotation', () => {
            assert.strictEqual(part1(data), 3)
        })
    })

    describe('Part Two', () => {
        it('Should count the number of times the dial passes or lands on 0', () => {
            assert.strictEqual(part2(data), 6)
            assert.strictEqual(part2(data2), 7)
        })
    })
})

