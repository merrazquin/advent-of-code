const assert = require('assert')
const { part1, part2 } = require('./script')

const dataA = 
`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`

const dataB = 
`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

const dataC =
`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`

describe('Day 10: Pipe Maze', () => {
    describe('Part One', () => {
        it('Should find the furthest position from the starting point', () => {
            assert.strictEqual(part1(dataA), 4)
            assert.strictEqual(part1(dataB), 8)
        })
    })

    describe('Part Two', () => {
        it('Should find the number of tiles enclosed by the loop', () => {
            assert.strictEqual(part2(dataC), 10)
        })
    })
})

