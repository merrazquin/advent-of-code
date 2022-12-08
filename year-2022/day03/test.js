const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

describe('Day 3: Rucksack Reorganization', () => {
    describe('Part One', () => {
        it('Find the priority sum of the item types which appear in both compartments of a rucksack', () => {
            assert.strictEqual(part1(data), 157)
        })
    })

    describe('Part Two', () => {
        it('Find the priority sum of the item type that corresponds to the badges of each three-Elf group', () => {
            assert.strictEqual(part2(data), 70)
        })
    })
})

