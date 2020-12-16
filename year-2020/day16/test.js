const assert = require('assert')
const { part1, part2 } = require('./script')

const ticketInfo = 
`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

describe('Day 16: Ticket Translation', () => {
    describe('Part One', () => {
        it('should return the ticket scanning error rate (sum of all invalid values on ticket)', () => {
            assert.strictEqual(part1(ticketInfo, true), 71)
        })
    })

    describe.skip('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(ticketInfo), 71)
        })
    })
})
