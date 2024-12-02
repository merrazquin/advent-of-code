const assert = require('assert')
const { part1, part2 } = require('./script')

const p1Data = 
`3   4
4   3
2   5
1   3
3   9
3   3`


describe('Day 1: Historian Hysteria', () => {
    describe('Part One', () => {
        it('Find the total distance between your lists', () => {
            assert.strictEqual(part1(p1Data), 11)
        })
    })

    describe('Part Two', () => {
        it('Find the similarity score', () => {
            assert.strictEqual(part2(p1Data), 31)
        })
    })

})

