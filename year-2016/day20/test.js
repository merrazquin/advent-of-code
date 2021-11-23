const assert = require('assert')
const { part1, part2 } = require('./script')

const blockedIps = 
`5-8
0-2
4-7`

describe('Day 20: Firewall Rules', () => {
    describe('Part One', () => {
        it('should return the lowest unblocked IP', () => {
            assert.strictEqual(part1(blockedIps), 3)
        })
    })


    describe('Part Two', () => {
        it('should return the number of unblocked IPs', () => {
            assert.strictEqual(part2(blockedIps, 9), 2)
        })
    })
})
