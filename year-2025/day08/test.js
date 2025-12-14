const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

describe('Day 8: Playground', () => {
    describe('Part One', () => {
        it('Should find the sizes of the 3 largest circuits after n connections', () => {
            assert.strictEqual(part1(data, 10), 40)
        })
    })

    describe('Part Two', () => {
        it('Should find the connection which causes all junction boxes to form a single circuit', () => {
            assert.strictEqual(part2(data), 25272)
        })
    })
})

