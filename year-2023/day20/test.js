const assert = require('assert')
const { part1, part2 } = require('./script')

const exampleA = 
`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`

const exampleB =
`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`

describe('Day 20: Pulse Propagation', () => {
    describe('Part One', () => {
        it('Should find the product of low pulses and high pulses', () => {
            // assert.strictEqual(part1(exampleA), 32000000)
            assert.strictEqual(part1(exampleB, 1), 11687500)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(exampleA), 0)
        })
    })
})

