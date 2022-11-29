const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

describe('Day 14: Extended Polymerization', () => {
    describe('Part One', () => {
        it('should return the difference between the most common and least common elements after 10 steps', () => {
            assert.strictEqual(part1(input), 1588)
        })
    })

    describe('Part Two', () => {
        it('should return the difference between the most common and least common elements after 40 steps', () => {
            assert.strictEqual(part2(input), 2188189693529)
        })
    })
})

