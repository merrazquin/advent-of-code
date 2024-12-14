const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

describe('Day 14: Restroom Redoubt', () => {
    describe('Part One', () => {
        it('should determine the safety factor be after exactly 100 seconds have elapsed', () => {
            assert.strictEqual(part1(data, 11, 7), 12)
        })
    })

    describe('Part Two', () => {
        it('should determine the fewest number of seconds that must elapse for the robots to display the Easter egg', () => {
            assert.strictEqual(part2(data, 11, 7), 1)
        })
    })
})

