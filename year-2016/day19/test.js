const assert = require('assert')
const { part1, part2 } = require('./script')

const numElves = 5

describe('Day 19: An Elephant Named Joseph', () => {
    describe('Part One', () => {
        it('should return the elf with all presents', () => {
            assert.strictEqual(part1(numElves), 3)
        })
    })


    describe('Part Two', () => {
        it('should return the elf with all presents', () => {
            assert.strictEqual(part2(numElves), 2)
        })
    })
})
