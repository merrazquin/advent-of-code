const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`

describe('Day 23: LAN Party', () => {
    describe('Part One', () => {
        it('should find how many sets of 3 interconnected computers contain at least one computer with a name that starts with t', () => {
            assert.strictEqual(part1(data), 7)
        })
    })

    describe('Part Two', () => {
        it('should find the password to get into the LAN party', () => {
            assert.strictEqual(part2(data), 'co,de,ka,ta')
        })
    })
})