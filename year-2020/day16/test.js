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

const ticketInfo2 = 
`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

const ticketInfo3 = 
`departure field a: 0-1 or 4-19
row: 0-5 or 8-19
departure field b: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

describe('Day 16: Ticket Translation', () => {
    describe('Part One', () => {
        it('should return the ticket scanning error rate (sum of all invalid values on ticket)', () => {
            assert.strictEqual(part1(ticketInfo), 71)
        })
    })

    describe('Part Two', () => {
        it('should return the product of all departure field info on your ticket', () => {
            assert.strictEqual(part2(ticketInfo2), 1)
            assert.strictEqual(part2(ticketInfo3), 156)
        })
    })
})
