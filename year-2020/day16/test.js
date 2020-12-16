const assert = require('assert')
const { part1, part2 } = require('./script')

const ticketInfo = 
``

describe('Day 16: Ticket Translation', () => {
    describe('Part One', () => {
        it('should return the ticket scanning error rate (sum of all invalid values on ticket)', () => {
            assert.strictEqual(part1(ticketInfo), 71)
        })
    })

    describe ('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(ticketInfo), 71)
        })
    })
})
