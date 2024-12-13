const assert = require('assert')
const { part1, part2 } = require('./script')

const example1 = 
`AAAA
BBCD
BBCC
EEEC`

const example2 =
`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`

const example3 =
`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

const example4 =
`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`

describe('Day 12: Garden Groups', () => {
    describe('Part One', () => {
        it('should return the total price of fencing all regions', () => {
            assert.strictEqual(part1(example1),140)
            assert.strictEqual(part1(example2),772)
            assert.strictEqual(part1(example3),1930)
        })
    })

    describe('Part Two', () => {
        it('should return the total price of fencing all regions (using bulk discount based on number of sides)', () => {
            assert.strictEqual(part2(example1),80)
            assert.strictEqual(part2(example2),436)
            assert.strictEqual(part2(example3),1206)
            assert.strictEqual(part2(example4), 236)
        })
    })
})

