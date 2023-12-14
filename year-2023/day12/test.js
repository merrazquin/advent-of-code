const assert = require('assert')
const { part1, part2, findPermutations } = require('./script')

const data = 
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

describe('Day 12:', () => {
    describe('findPermutations', () => {
        it('Should find all viable permutations of valid spring arrangements for a single spring/size config', () => {
            assert.strictEqual(findPermutations('???.###'.split(''), [1,1,3]), 1)
            assert.strictEqual(findPermutations('.??..??...?##.'.split(''), [1,1,3]), 4)
            assert.strictEqual(findPermutations('?#?#?#?#?#?#?#?'.split(''), [1,3,1,6]), 1)
            assert.strictEqual(findPermutations('????.#...#...'.split(''), [4,1,1]), 1)
            assert.strictEqual(findPermutations('????.######..#####.'.split(''), [1,6,5]), 4)
            assert.strictEqual(findPermutations('?###????????'.split(''), [3,2,1]), 10)
        })
    })
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
