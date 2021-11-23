const assert = require('assert')
const { part1, part2 } = require('./script')

const message = 
`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`

describe('Day 6: Signals and Noise', () => {
    describe('Part One', () => {
        it('should return the error-corrected version of the message', () => {
            assert.strictEqual(part1(message), 'easter')
        })
    })


    describe('Part Two', () => {
        it('should return the error-corrected version of the message', () => {
            assert.strictEqual(part2(message), 'advent')
        })
    })
})
