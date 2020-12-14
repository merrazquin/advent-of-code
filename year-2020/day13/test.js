const assert = require('assert')
const { part1, part2 } = require('./script')

const busSchedule = 
`939
7,13,x,x,59,x,31,19`

const testSchedule2 = 
`ignored
17,x,13,19`

const testSchedule3 = 
`ignored
67,7,59,61`

const testSchedule4 = 
`ignored
67,x,7,59,61`

const testSchedule5 = 
`ignored
67,7,x,59,61`

const testSchedule6 = 
`ignored
1789,37,47,1889`

describe('Day 13: Shuttle Search', () => {
    describe('Part One', () => {
        it('should give the product of the earliest bus you can take multiplied by the number of minutes you\'ll need to wait', () => {
            assert.strictEqual(part1(busSchedule), 295)
        })
    })

    describe('Part Two', () => {
        it('should give the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list', () => {
            assert.strictEqual(part2(busSchedule), 1068781)
            assert.strictEqual(part2(testSchedule2), 3417)
            assert.strictEqual(part2(testSchedule3), 754018)
            assert.strictEqual(part2(testSchedule4), 779210)
            assert.strictEqual(part2(testSchedule5), 1261476)
            assert.strictEqual(part2(testSchedule6), 1202161486)
        })
    })
})
// 7:20 AM start
// 7:23 AM preprocessing done
// 7:34 AM p1
