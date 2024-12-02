const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

describe('Day 17: Clumsy Crucible', () => {
    describe('Part One', () => {
        it('Should find a path which minimizes heat loss and report the heat loss', () => {
            assert.strictEqual(part1(data), 102)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

