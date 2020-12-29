const assert = require('assert')
const { part1, part2 } = require('./script')

const replacements = 
`H => HO
H => OH
O => HH

HOH`

const replacements2 =
`H => HO
H => OH
O => HH

HOHOHO`

const fabrication = 
`e => H
e => O
H => HO
H => OH
O => HH

HOH`

describe('Day 19: Medicine for Rudolph', () => {
    describe('Part One', () => {
        it('should return how many distinct molecules can be created', () => {
            assert.strictEqual(part1(replacements), 4)
            assert.strictEqual(part1(replacements2), 7)
        })
    })

    describe('Part Two', () => {
        it('should return how many steps it would take to fabricate the medicine molecule', () => {
            assert.strictEqual(part2(fabrication), 3)
        })
    })
})
