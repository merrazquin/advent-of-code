const assert = require('assert')
const { part1, part2, convertSNAFU, convertToSNAFU } = require('./script')

const data =
`1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`

const brochure =
`1 1
2 2
3 1=
4 1-
5 10
6 11
7 12
8 2=
9 2-
10 20
15 1=0
20 1-0
2022 1=11-2
12345 1-0---0
314159265 1121-1110-1=0`

const demoNumbers = 
`1=-0-2 1747
12111 906
2=0= 198
21 11
2=01 201
111 31
20012 1257
112 32
1=-1= 353
1-12 107
12 7
1= 3
122 37`

describe('Day :', () => {
    describe('convertSNAFU', () => {
        it('should convert from SNAFU to decimal', () => {
            brochure.split('\n').forEach(conversion => {
                const [decimal, snafu] = conversion.split(' ')
                assert.strictEqual(convertSNAFU(snafu).toString(), decimal)
            })
            demoNumbers.split('\n').forEach(conversion => {
                const [snafu, decimal] = conversion.split(' ')
                assert.strictEqual(convertSNAFU(snafu).toString(), decimal)
            })
        })
    })

    describe('convertToSNAFU', () => {
        it('should convert from decimal to SNAFU', () => {
            assert.strictEqual(convertToSNAFU(4890), '2=-1=0')
        })
    })

    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), '2=-1=0')
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 0)
        })
    })
})

