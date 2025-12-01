const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const data2 = 
`L68
L30
R48
L5
R120
L55
L1
L99
R14
L82`

describe('Day :', () => {
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), 3)
        })
    })

    describe('Part Two', () => {
        it('R1000', () => {
            assert.strictEqual(part2('R1000'), 10)
        })
        it('R1049', () => {
            assert.strictEqual(part2('R1049'), 10)
        })
        it('R1057', () => {
            assert.strictEqual(part2('R1057'), 11)
        })
        it('L1057', () => {
            assert.strictEqual(part2('L1057'), 11)
        })
        it.only('test input', () => {
            // assert.strictEqual(part2(data), 6)
            assert.strictEqual(part2(data2), 7)
        })
    })
})

