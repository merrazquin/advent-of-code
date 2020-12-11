const assert = require('assert')
const { part1, part2, nextGeneration2, visualize, findVisibleNeighbors, countOccupied, nextGeneration } = require('./script')

const seatingChart =
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
const secondChart =
`#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`
const p2test1 =
`.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`
const p2test2 =
`.............
.L.L.#.#.#.#.
.............`
const p2test3 =
`.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`
const nextGen2_3 = 
`#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`
const nextGen2_4 =
`#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`
const nextGen2_5 = 
`#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#`

describe('Day 11: Day Description', () => {
    describe('Part One', () => {
        it('should provide the number of occupied seats once seating has stabilized', () => {
            assert.strictEqual(part1(seatingChart), 37)
        })
    })

    describe('findVisibleNeighbors', () => {
        it('should only return visible neighbors', () => {
            let rows = p2test1.split('\n')
            let width = rows[0].length
            let input = rows.join('').split('')
            assert.strictEqual(countOccupied(findVisibleNeighbors(input.indexOf('L'), input, width)), 8)
            rows = p2test2.split('\n')
            input = rows.join('').split('')
            width = rows[0].length
            assert.strictEqual(countOccupied(findVisibleNeighbors(input.indexOf('L'), input, width)), 0)
            rows = p2test3.split('\n')
            input = rows.join('').split('')
            width = rows[0].length
            assert.strictEqual(countOccupied(findVisibleNeighbors(input.indexOf('L'), input, width)), 0)

            rows = secondChart.split('\n')
            input = rows.join('').split('')
            width = rows[0].length
            assert.strictEqual(countOccupied(findVisibleNeighbors(89, input, width)), 5)

            rows = nextGen2_3.split('\n')
            input = rows.join('').split('')
            width = rows[0].length
            assert.strictEqual(countOccupied(findVisibleNeighbors(58, input, width)), 0)

            rows = nextGen2_4.split('\n')
            input = rows.join('').split('')
            width = rows[0].length
            assert.strictEqual(countOccupied(findVisibleNeighbors(12, input, width)), 5)
        })
    })

    describe('nextGeneration', () => {
        it('should correctly generate the next generation', () => {
            let input = seatingChart.split('\n').join('').split('')
            assert.strictEqual(visualize(nextGeneration(input, 10, 4).join(''), 10), secondChart)
        })
    })
    describe('nextGeneration2', () => {
        it('should correctly generate the next generation with the newer ruleset', () => {
            let input = nextGen2_4.split('\n').join('').split('')
            assert.strictEqual(visualize(nextGeneration2(input, 10, 5).join(''), 10), nextGen2_5)
        })
    })

    describe('Part Two', () => {
        it('should provide the number of occupied seats once seating has stabilized', () => {
            assert.strictEqual(part2(seatingChart), 26)
        })
    })
})
