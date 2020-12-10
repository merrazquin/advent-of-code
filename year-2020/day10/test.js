const assert = require('assert')
const { part1, part2 } = require('./script')

const adapters = 
`16
10
15
5
1
11
7
19
6
12
4`

const largerAdapterSet =
`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

describe('Day 10: Adapter Array', () => {
    describe('Part One', () => {
        it('should return the product of 1- and 3-jolt differences', () => {
            assert.strictEqual(part1(adapters), 35)
            assert.strictEqual(part1(largerAdapterSet), 220)
        })
    })

    describe('Part Two', () => {
        it('should return the total number of distinct ways you can arrange the adapters', () => {
            assert.strictEqual(part2(adapters), 8)
            assert.strictEqual(part2(largerAdapterSet), 19208)
        })
    })
})
// 7:03 AM start
// 7:13 AM first passing test
// 7:14 AM part 1
// 8:34 AM par2 2 test passing for one set
// 8:40 AM par2 2