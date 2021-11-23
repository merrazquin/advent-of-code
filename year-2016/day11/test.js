const assert = require('assert')
const { part1, part2 } = require('./script')

const situation = 
`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`

describe.skip('Day 11: Radioisotope Thermoelectric Generators', () => {
    describe('Part One', () => {
        it('should ', () => {
            assert.strictEqual(part1(situation), 11)
        })
    })


    describe('Part Two', () => {
        it('should ', () => {
            part2(situation)
        })
    })
})
