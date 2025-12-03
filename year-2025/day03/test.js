const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`987654321111111
811111111111119
234234234234278
818181911112111`

describe('Day 3: Lobby', () => {
    describe('Part One', () => {
        it('Should calculate the max joltage', () => {
            assert.strictEqual(part1('987654321111111'), 98)
            assert.strictEqual(part1('811111111111119'), 89)
            assert.strictEqual(part1('234234234234278'), 78)
            assert.strictEqual(part1('818181911112111'), 92)
            assert.strictEqual(part1('3361246654224456345614565445236613412443442534524666655261365666531522166125553226265651516625126789'), 89)
            assert.strictEqual(part1(data), 357)
        })
    })

    describe('Part Two', () => {
        it('Should calculate the actual max joltage', () => {
            assert.strictEqual(part2('987654321111111'), 987654321111)
            assert.strictEqual(part2('811111111111119'), 811111111119)
            assert.strictEqual(part2('234234234234278'), 434234234278)
            assert.strictEqual(part2('818181911112111'), 888911112111)
            assert.strictEqual(part2('3361246654224456345614565445236613412443442534524666655261365666531522166125553226265651516625126789'), 666666666789)
            assert.strictEqual(part2(data), 3121910778619)
        })
    })
})

