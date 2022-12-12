const assert = require('assert')
const { part1, part2 } = require('./script')

const guide = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

describe('Day 11: ', () => {
    describe('Part One', () => {
        it('Find the level of monkey business after 20 rounds', () => {
            assert.strictEqual(part1(guide), 10605)
        })
    })

    describe('Part Two', () => {
        it('Find the level of monkey business after 10,000 rounds (with no worry mitigation)', () => {
            assert.strictEqual(part2(guide), 2713310158)
        })
    })
})

