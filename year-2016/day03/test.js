const assert = require('assert')
const { part1, part2 } = require('./script')

const triangleRows = 
`10  10  15
5  10  25
`

const triangleColumns = 
`  5  301  501
10  302  502
41   54  276
82  464  354
202  402  602
203  403  603
`
describe('Day 3: Squares With Three Sides', () => {
    describe('Part One', () => {
        it('should return the number of possible triangles', () => {
            assert.strictEqual(part1(triangleRows), 1)
        })
    })


    describe('Part Two', () => {
        it('should return the number of possible triangles (by column)', () => {
            assert.strictEqual(part2(triangleColumns), 5)
        })
    })
})
