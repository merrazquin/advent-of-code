const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

describe('Day 6: Trash Compactor', () => {
    describe('Part One', () => {
        it('Should calculate the cephalapod math homework', () => {
            assert.strictEqual(part1(data), 4277556)
        })
    })

    describe('Should calculate the cephalapod math homework *correctly*', () => {
        it.only('', () => {
            assert.strictEqual(part2(data), 3263827)
        })
    })
})

