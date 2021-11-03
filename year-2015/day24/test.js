const assert = require('assert')
const { part1, part2 } = require('./script')

const packages = 
`1
2
3
4
5
7
8
9
10
11`

describe('Day 24: It Hangs in the Balance', () => {
    describe('Part One', () => {
        it('should return the quantum entanglement of the first group of packages in the ideal configuration (3 compartments)', () => {
            assert.strictEqual(part1(packages), 99)
        })
    })

    describe('Part Two', () => {
        it('should return the quantum entanglement of the first group of packages in the ideal configuration (4 compartments)', () => {
            assert.strictEqual(part2(packages), 44)
        })
    })
})
