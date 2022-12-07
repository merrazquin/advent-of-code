const assert = require('assert')
const { part1, part2 } = require('./script')

const data = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe.only('Day 6: Scratch', () => {
    describe('Part One', () => {
        it('Get score with p1 rules', () => {
            assert.strictEqual(part1(data), 95437)
        })
    })

    describe('Part Two', () => {
        it('Get score with p2 rules', () => {
            assert.strictEqual(part2(data), 0)
        })
    })

})

