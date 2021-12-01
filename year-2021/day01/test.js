const assert = require('assert')
const { part1, part2 } = require('./script')

const report = 
`199
200
208
210
200
207
240
269
260
263`

describe('Day 1: Sonar Sweep', () => {
    describe('Part One', () => {
        it('should return the number of increases betweeen individual depths', () => {
            assert.strictEqual(part1(report), 7)
        })
    })

    describe('Part Two', () => {
        it('should return the number of increases between three-measurement sliding windows', () => {
            assert.strictEqual(part2(report), 5)
        })
    })
})

