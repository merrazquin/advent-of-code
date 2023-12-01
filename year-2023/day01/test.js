const assert = require('assert')
const { part1, part2, parseNumbers } = require('./script')

const p1Data = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const p2Data = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

describe('Day 1: Trebuchet?!', () => {
    describe('parseNumbers', () => {
        it('Should correctly parse a mix of spelled out numbers and numbers', () => {
            assert.strictEqual(parseNumbers('xtwone3four'), '2134')
        })

        it('Should correctly parse overlapping numbers', () => {
            assert.strictEqual(parseNumbers('eightwothree'), '823')
        })
    })

    describe('Part One', () => {
        it('Find the sum of all of the calibration values', () => {
            assert.strictEqual(part1(p1Data), 142)
        })
    })

    describe('Part Two', () => {
        it('Find the sum of all of the calibration values', () => {
            assert.strictEqual(part2(p2Data), 281)
        })
    })

})

