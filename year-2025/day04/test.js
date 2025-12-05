const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

describe('Day 4: Printing Department', () => {
    describe('Part One', () => {
        it('Should return how many rolls of paper can be accessed by a forklift', () => {
            assert.strictEqual(part1(data), 13)
        })
    })

    describe('Part Two', () => {
        it('Should return how many rolls of paper can actually be accessed by a forklift', () => {
            assert.strictEqual(part2(data), 43)
        })
    })
})

