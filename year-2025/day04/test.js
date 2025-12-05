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

describe('Day :', () => {
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), 13)
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 43)
        })
    })
})

