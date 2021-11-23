const assert = require('assert')
const { part1, part2 } = require('./script')


describe('Day 9: Explosives in Cyberspace', () => {
    describe('Part One', () => {
        it('should return the decompressed length of a file', () => {
            assert.strictEqual(part1('ADVENT'), 6)
            assert.strictEqual(part1('A(1x5)BC'), 7)
            assert.strictEqual(part1('(3x3)XYZ'), 9)
            assert.strictEqual(part1('A(2x2)BCD(2x2)EFG'), 11)
            assert.strictEqual(part1('(6x1)(1x3)A'), 6)
            assert.strictEqual(part1('X(8x2)(3x3)ABCY'), 18)
        })
    })


    describe('Part Two', () => {
        it('should return the fully decompressed length of a file', () => {
            assert.strictEqual(part2('(3x3)XYZ'), 9)
            assert.strictEqual(part2('X(8x2)(3x3)ABCY'), 20)
            assert.strictEqual(part2('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241920)
            assert.strictEqual(part2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'), 445)
        })
    })
})
