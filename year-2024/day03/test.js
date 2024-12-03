const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const p2Data = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))'
describe('Day 3: Mull It Over', () => {
    describe('Part One', () => {
        it('should sum up the results of all the valid multiplications', () => {
            assert.strictEqual(part1(data), 161)
        })
    })

    describe('Part Two', () => {
        it('should take into account the enalbe and disable instructions before summing up the results of all the valid products', () => {
            assert.strictEqual(part2(p2Data), 48)
        })
    })
})

