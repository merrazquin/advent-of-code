const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

const ex1 =
`Register A: 0
Register B: 0
Register C: 9

Program: 2,6`

const ex2 =
`Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`

const ex3 =
`Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

const ex4 =
`Register A: 0
Register B: 29
Register C: 0

Program: 1,7`

const ex5 =
`Register A: 0
Register B: 2024
Register C: 43690

Program: 4,0`

const exP2 =
`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

describe('Day :', () => {
    describe('Part One', () => {
        it('', () => {
            const {output: output1} = part1(data)
            assert.strictEqual(output1, '4,6,3,5,6,3,5,2,1,0')

            const {computer: computer2} = part1(ex1)
            assert.strictEqual(computer2.B, 1)

            const {output: output3} = part1(ex2)
            assert.strictEqual(output3, '0,1,2')

            const {computer: computer4, output: output4} = part1(ex3)
            assert.strictEqual(output4, '4,2,5,6,7,7,7,7,3,1,0')
            assert.strictEqual(computer4.A, 0)

            const {computer: computer5} = part1(ex4)
            assert.strictEqual(computer5.B, 26)

            const {computer: computer6} = part1(ex5)
            assert.strictEqual(computer6.B, 44354)
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(exP2), 117440)
        })
    })
})

