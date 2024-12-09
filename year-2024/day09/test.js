const assert = require('assert')
const { part1, part2 } = require('./script')

const data = '2333133121414131402'

describe('Day 9: Disk Fragmenter', () => {
    describe('Part One', () => {
        it('should get the filesystem checksum after defragmenting', () => {
            assert.strictEqual(part1(data), 1928)
        })
    })

    describe('Part Two', () => {
        it('should get the filesystem checksum after defragmenting - keeping file blocks intact', () => {
            assert.strictEqual(part2(data), 2858)
            assert.strictEqual(part2('1011'), 1)
        })
    })
})
