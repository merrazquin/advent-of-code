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

describe('Day 5: Supply Stacks', () => {
    describe('Part One', () => {
        it('Find the crates that end up on top of each stack when moved one by one', () => {
            assert.strictEqual(part1(data), 'CMZ')
        })
    })

    describe('Part Two', () => {
        it('Find the crates that end up on top of each stack when moved as a group', () => {
            assert.strictEqual(part2(data), 'MCD')
        })
    })
})

