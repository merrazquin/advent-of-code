const assert = require('assert')
const { part1, part2 } = require('./script')

const [testInputVariable] = 
`[testInput]
...`

describe('Day [dayNumber]: [dayDescription]', () => {
    describe('Part One', () => {
        it('[assertionDescription]', () => {
            assert.strictEqual(part1([testInput]), [assertionValue])
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2([testInput]), [assertionValue])
        })
    })
})
