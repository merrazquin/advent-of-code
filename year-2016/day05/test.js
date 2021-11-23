const assert = require('assert')
const { part1, part2 } = require('./script')

describe.skip('Day 5: How About a Nice Game of Chess', () => {
    describe('Part One', () => {
        it('should return the room passcode', () => {
            assert.strictEqual(part1('abc'), '18f47a30')
        }).timeout(600000)
    })


    describe('Part Two', () => {
        it('should return the correctly sorted passcode', () => {
            assert.strictEqual(part2('abc'), '05ace8e3')
        }).timeout(600000)
    })
})
