const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

describe.only('Day 1: Calorie Counting', () => {
    describe('Part One', () => {
        it('Find the total Calories being carried by that Elf carrying the most calories', () => {
            assert.strictEqual(part1(data), 24000)
        })
    })

    describe('Part Two', () => {
        it('Find the total Calories being carried by the top 3 Elves carrying the most calories', () => {
            assert.strictEqual(part2(data), 45000)
        })
    })

})

