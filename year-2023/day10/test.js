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
`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`

const dataD = 
`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`

const dataE =
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

    describe.skip('Part Two', () => {
        it('Should find the number of tiles enclosed by the loop', () => {
            assert.strictEqual(part2(dataC), 4)
            assert.strictEqual(part2(dataD), 8)
            assert.strictEqual(part2(dataE), 10)
        })
    })
})

