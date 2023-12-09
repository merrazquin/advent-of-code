const assert = require('assert')
const { part1, part2, getDifferences, getNext } = require('./script')

const data = 
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

describe('Day 9: Mirage Maintenance', () => {
    describe('getDifferences', () => {
        it('should return the array of differences', () => {
            let diffs = getDifferences([0,3,6,9,12,15])
            assert.strictEqual(diffs.length, 5)
            assert.equal(diffs.every(diff => diff === 3), true)

            diffs = getDifferences([10, 13, 16, 21, 30, 45])
            assert.strictEqual(diffs.length, 5)
            assert.equal(diffs.join('_'), '3_3_5_9_15')
        })
    })
    describe('getNext', () => {
        it('should return the next number in the history', () => {
            assert.strictEqual(getNext([0, 3, 6, 9, 12, 15], [3, 3, 3, 3, 3]), 18)
        })
    })
    describe('Part One', () => {
        it('Should find the sum of the extrapolated values', () => {
            assert.strictEqual(part1(data), 114)
        })
    })

    describe('Part Two', () => {
        it('Should find the sum of the extrapolated values', () => {
            assert.strictEqual(part2(data), 2)
        })
    })
})

