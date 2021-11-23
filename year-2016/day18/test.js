const assert = require('assert')
const { part1, getNextRow } = require('./script')


describe('Day 18: Like a Rogue', () => {
    describe ('getNextRow', () => {
        it('should return the next row', () => {
            assert.strictEqual(getNextRow('..^^.'), '.^^^^')
        })
    })
    
    describe('Part One', () => {
        it('should return the correct number of safe tiles', () => {
            assert.strictEqual(part1('.^^.^.^^^^', 10), 38)
        })
    })
})
