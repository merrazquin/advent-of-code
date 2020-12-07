const assert = require('assert')
const { part1, part2 } = require('./script')

const baggageRules = 
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const moreBaggageRules =
`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`

describe('Day 7: Handy Haversacks', () => {
    describe('Part One', () => {
        it('should find all possible parents of a bag type', () => {
            assert.strictEqual(part1(baggageRules), 4)
        })
    })

    describe ('Part Two', () => {
        it('should find how many individual bags are required inside a particular bag type', () => {
            assert.strictEqual(part2(baggageRules), 32)
            assert.strictEqual(part2(moreBaggageRules), 126)
        })
    })
})
