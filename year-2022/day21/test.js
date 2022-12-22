const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

describe('Day 21: Monkey Math', () => {
    describe('Part One', () => {
        it('Find then number the monkey named root will yell', () => {
            assert.strictEqual(part1(data), 152)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 301)
        })
    })
})

