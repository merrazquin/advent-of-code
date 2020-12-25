const assert = require('assert')
const { part1 } = require('./script')

const input = 
`5764801
17807724`

describe('Day 25: Combo Breaker', () => {
    describe('Part One', () => {
        it('should return the encryption key for the door/handle handshake', () => {
            assert.strictEqual(part1(input), 14897079)
        })
    })
})
