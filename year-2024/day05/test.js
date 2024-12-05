const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

describe('Day 5: Print Queue', () => {
    describe('Part One', () => {
        it('should return the sum of the middle page numbers on correctly-ordered updates', () => {
            assert.strictEqual(part1(data), 143)
        })
    })

    describe('Part Two', () => {
        it('should return the sum of the middle page numbers on corrected updates', () => {
            assert.strictEqual(part2(data), 123)
        })
    })
})

