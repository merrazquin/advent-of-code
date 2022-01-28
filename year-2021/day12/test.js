const assert = require('assert')
const { part1, part2 } = require('./script')

const inputA = 
`start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const inputB =
`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

const inputC = 
`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

describe('Day : ', () => {
    describe('Part One', () => {
        it('should ', () => {
            assert.strictEqual(part1(inputA), 10)
            assert.strictEqual(part1(inputB), 19)
            assert.strictEqual(part1(inputC), 256)
        })
    })

    describe('Part Two', () => {
        it('should ', () => {
            // assert.strictEqual(part2(input), 0)
        })
    })
})

