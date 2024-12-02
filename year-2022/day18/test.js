const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

describe('Day 18: Boiling Boulders', () => {
    describe('Part One', () => {
        it('Find the surface area of the scanned lava droplet', () => {
            assert.strictEqual(part1(data), 64)
        })
    })

    describe('Part Two', () => {
        it('Find the exterior surface area of the scanned lava droplet', () => {
            assert.strictEqual(part2(data), 58)
        })
    })
})

