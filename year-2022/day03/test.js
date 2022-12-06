const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

describe('Day 3: Scratch', () => {
    describe('Part One', () => {
        it('Get score with p1 rules', () => {
            assert.strictEqual(part1(data), 157)
        })
    })

    describe('Part Two', () => {
        it('Get score with p2 rules', () => {
            assert.strictEqual(part2(data), 70)
        })
    })
})

