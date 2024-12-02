const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

describe('Day 2: Red-Nosed Reports', () => {
    describe('Part One', () => {
        it('Should find how many Red-Nosed reports are safe', () => {
            assert.strictEqual(part1(data), 2)
        })
    })

    describe('Part Two', () => {
        it('Should find how many Red-Nosed reports are safe, taking into consideration the Problem Dampener', () => {
            assert.strictEqual(part2(data), 4)
        })
    })

})

