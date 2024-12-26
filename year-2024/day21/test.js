const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`029A
980A
179A
456A
379A`

describe('Day :', () => {
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), 126384)
        })
    })

    describe('Part Two', () => {
        it.skip('', () => {
            assert.strictEqual(part2(data), data)
        })
    })
})

