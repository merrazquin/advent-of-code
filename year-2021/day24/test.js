const assert = require('assert')
const { part1, part2, processInstructions } = require('./script')

const inputA = 
`inp x
mul x -1`

const inputB = 
`inp z
inp x
mul z 3
eql z x`

const inputC = 
`inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`

const prodInput = 
`inp w
initA 14 16
inp w
initA 11 3
inp w
initA 12 2
inp w
initA 11 7
inp w
initB -10 13
inp w
initA 15 6
inp w
initB -14 10
inp w
initA 10 11
inp w
initB -4 6
inp w
initB -3 5
inp w
initA 13 11
inp w
initB -3 4
inp w
initB -9 4
inp w
initB -12 6`

describe('Day : ', () => {
    describe('Part One', () => {
        it.only('', () => {
            console.log(part1(prodInput))
        })
        it('should ', () => {
            let registers = processInstructions(1, inputA)
            assert.deepStrictEqual(registers, {w: 0, x: -1, y:0, z: 0})
            
            registers = processInstructions(39, inputB)
            assert.deepStrictEqual(registers, {w: 0, x: 9, y:0, z: 1})

            registers = processInstructions(38, inputB)
            assert.deepStrictEqual(registers, {w: 0, x: 8, y:0, z: 0})

            registers = processInstructions(9, inputC)
            assert.deepStrictEqual(registers, {w: 1, x: 0, y:0, z: 1})
        })
    })

    describe('Part Two', () => {
        it('should ', () => {
            // assert.strictEqual(part2(input), 0)
        })
    })
})

