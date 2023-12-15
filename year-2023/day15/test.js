const assert = require('assert')
const { part1, part2, hashAlgo } = require('./script')

const data = 
'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

describe('Day 15: Lens Library', () => {
    describe ('hashAlgo', () => {
        it('Should find the result of running the HASH algorithm on HASH', () => {
            assert.strictEqual(hashAlgo('HASH'), 52)
        })
    })
    describe('Part One', () => {
        it('Should find the total of running the HASH algo on each init seq', () => {
            assert.strictEqual(part1(data), 1320)
        })
    })

    describe('Part Two', () => {
        it('Should find the total focusing power of all lenses', () => {
            assert.strictEqual(part2(data), 145)
        })
    })
})

