const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

describe('Day 10: Syntax Scoring', () => {
    describe('Part One', () => {
        it('should find the total syntax error score', () => {
            assert.strictEqual(part1(input), 26397)
        })
    })

    describe('Part Two', () => {
        it('should find the middle completion score', () => {
            assert.strictEqual(part2(input), 288957)
        })
    })
})

