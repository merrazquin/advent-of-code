const assert = require('assert')
const { part1, part2, score } = require('./script')

const in1 = `0 1 10 99 999`
const in2 = `125 17`

describe('Day 11: Plutonian Pebbles', () => {
    describe('Part One', () => {
        it('should return how many stones after blinking 25 times', () => {
            assert.strictEqual(part1(in1, 1), 7)
            assert.strictEqual(part1(in2, 1), 3)
            assert.strictEqual(part1(in2, 2), 4)
            assert.strictEqual(part1(in2, 6), 22)
            assert.strictEqual(part1(in2, 25), 55312)
        })
    })

    describe('Part Two', () => {
        it('should return how many stones after blinking 75 times', () => {
            assert.strictEqual(part2(in1, 1), 7)
            assert.strictEqual(part2(in2, 1), 3)
            assert.strictEqual(part2(in2, 2), 4)
            assert.strictEqual(part2(in2, 6), 22)
            assert.strictEqual(part2(in2, 25), 55312)
        })
    })
})

