const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

describe('Day 9: Movie Theater', () => {
    describe('Part One', () => {
        it('Should calculate the largest possible rectangle defined by two red squares', () => {
            assert.strictEqual(part1(data), 50)
        })
    })

    describe('Part Two', () => {
        it.skip('', () => {
            assert.strictEqual(part2(data), 24)
        })
    })
})

