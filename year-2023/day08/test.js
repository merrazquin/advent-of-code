const assert = require('assert')
const { part1, part2 } = require('./script')

const dataA = 
`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ`

const dataB =
`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const dataC = 
`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

describe('Day 8: Haunted Wasteland', () => {
    describe('Part One', () => {
        it('Should find how many steps are required from AAA to ZZZ', () => {
            assert.strictEqual(part1(dataA), 2)
            assert.strictEqual(part1(dataB), 6)
        })
    })

    describe('Part Two', () => {
        it('Should find how many steps are required to terminate all paths on an node ending in Z', () => {
            assert.strictEqual(part2(dataC), 6)
        })
    })
})

