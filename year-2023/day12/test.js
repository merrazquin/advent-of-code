const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

describe('Day 12:', () => {
    describe('Part One', () => {
        it('Should find the sum of all possible valid spring arrangements', () => {
            assert.strictEqual(part1(data), 21)
        })
    })

    describe.skip('Part Two', () => {
        it('Should find the sum of all possible valid expanded spring arrangements', () => {
            assert.strictEqual(part2(data), 525152)
        })
    })
})
