const assert = require('assert')
const { part1, modifiedDragonCurve, getChecksum, getData } = require('./script')

describe('Day 9: Explosives in Cyberspace', () => {
    describe('modifiedDragonCurve', () => {
        it('should correctly generate random data', () => {
            assert.equal(modifiedDragonCurve('1'), '100')
            assert.equal(modifiedDragonCurve('0'), '001')
            assert.equal(modifiedDragonCurve('11111'), '11111000000')
            assert.equal(modifiedDragonCurve('111100001010'), '1111000010100101011110000')
        })   
    })

    describe('getChecksum', () => {
        it('should correctly get the checksum', () => {
            assert.strictEqual(getChecksum('110010110100'), '100')
        })   
    })

    describe('getData', () => {
        it('should get data of the appropriate length', () => {
            assert.strictEqual(getData('1', 12), '100011001001')
        })
    })
   
    describe('Part One', () => {
        it('should return the checksum of a filled disk', () => {
            assert.strictEqual(part1('10000', 20), '01100')
        })
    })
})
