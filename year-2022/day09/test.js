const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const p2Data = 
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

describe.only('Day 9: ', () => {
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), 13)
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(p2Data), 36)
        })
    })

})

