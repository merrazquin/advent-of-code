const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`

describe('Day 9: All in a Single Night', () => {
    describe('Part One', () => {
        it('should provide the shortest distance of all routes', () => {
            assert.strictEqual(part1(input), 605)
        })
    })

    describe('Part Two', () => {
        it('should provide the longest distance of all routes', () => {
            assert.strictEqual(part2(input), 982)
        })
    })
})
