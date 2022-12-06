const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

describe('Day 5: Scratch', () => {
    describe('Part One', () => {
        it('Get score with p1 rules', () => {
            assert.strictEqual(part1(data), 'CMZ')
        })
    })

    describe('Part Two', () => {
        it('Get score with p2 rules', () => {
            assert.strictEqual(part2(data), 'MCD')
        })
    })
})

