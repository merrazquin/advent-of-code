const assert = require('assert')
const { part1, part2 } = require('./script')

const simpleInput =
`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf`

const input = 
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`

describe('Day 8: Seven Segment Search', () => {
    describe('Part One', () => {
        it('should return the number of times 1, 4, 7, and 8 appear', () => {
            const moddedInput = input.split('|\n').join('| ')
            assert.strictEqual(part1(moddedInput), 26)
        })
    })

    describe('Part Two', () => {
        it('should return the sum of the decoded values', () => {
            const moddedSimpleInput = simpleInput.split('|\n').join('| ')
            const moddedInput = input.split('|\n').join('| ')
            assert.strictEqual(part2(moddedSimpleInput), 5353)
            assert.strictEqual(part2(moddedInput), 61229)
        })
    })
})

