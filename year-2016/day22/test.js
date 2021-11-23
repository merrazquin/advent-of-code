const assert = require('assert')
const { part1, part2 } = require('./script')

const input = 
`root@ebhq-gridcenter# df -h
Filesystem              Size  Used  Avail  Use%
/dev/grid/node-x0-y0     92T   73T    19T   79%
/dev/grid/node-x0-y1     91T   66T    25T   72%
/dev/grid/node-x0-y3     85T   68T    17T   80%`

describe('Day 22: Grid Computing', () => {
    describe('Part One', () => {
        it('should return the number of viable pairs', () => {
            assert.strictEqual(part1(input), 0)
        })
    })


    describe.skip('Part Two', () => {
        it('should ', () => {
            part2()
        })
    })
})
