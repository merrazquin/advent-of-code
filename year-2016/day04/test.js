const assert = require('assert')
const { part1, part2 } = require('./script')

const rooms = 
`aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]
`

describe('Day 4: Security Through Obscurity', () => {
    describe('Part One', () => {
        it('should return the sum of real room sector IDs', () => {
            assert.strictEqual(part1(rooms), 1514)
        })
    })


    describe('Part Two', () => {
        it('should return the decrypted room name', () => {
            const [decryptedName] = part2('aaaaa-bbb-z-y-x-123[abxyz]')
            assert.strictEqual(decryptedName, 'ttttt uuu s r q')
        })
    })
})
