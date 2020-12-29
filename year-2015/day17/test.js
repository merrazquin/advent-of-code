const assert = require('assert')
const { part1, part2 } = require('./script')

const containers = 
`20
15
10
5
5`

describe('Day 17: No Such Thing as Too Much', () => {
    describe('Part One', () => {
        it('should return how many different combinations of containers can exactly fit all x liters of eggnog', () => {
            assert.strictEqual(part1(containers, 25), 4)
        })
    })

    describe('Part Two', () => {
        it('should return how many different combinations use the least number of containers to fit all x liters of eggnog', () => {
            assert.strictEqual(part2(containers, 25), 3)
        })
    })
})
