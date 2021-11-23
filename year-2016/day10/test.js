const assert = require('assert')
const { part1, part2 } = require('./script')

const instructions = 
`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`

describe('Day 10: ', () => {
    describe('Part One', () => {
        it('should find the bot responsible for comparing 2 & 5', () => {
            assert.equal(part1(instructions, '2|5'), 2)
        })
    })


    describe('Part Two', () => {
        it('should find the product of microchip values in outputs 0, 1, and 2', () => {
            assert.equal(part2(instructions, '2|5'), 30)
        })
    })
})
