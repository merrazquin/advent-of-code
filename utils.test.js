const assert = require('assert')
const { parseTree, rotatePointAroundAxisCounterClockwise,  rotatePointAroundAxisClockwise} = require('./utils')

const TreeModel = require('tree-model')
const tree = new TreeModel()

const input = {
    category_a: { child_a: 3, child_b: 2 },
    child_b: {sub_child: 5}
}
/*

               cat_a
            /         \
        child_a (x3) child_b (x2)
                        \
                      sub_child (x5)

- 1 cat_a
- 3 child_a
- 2 child_b
- 10 sub_child
- 15 total
*/

const simplerInput = {
    child_b: {child_c: 1},
    category_a: { child_a: 1},
    child_a: {child_b: 1},
    child_c: 0
}
/*
        category_a
        /       
       child_a  
       \
       child_b
       /
       child_c


*/
describe('Utils', () => {
    describe('parseTree', () => {
        it('should correctly parse complex data', () => {
            const parsedTree = tree.parse({ name: 'root', count: 1, children: [] })
            const rootNode = parseTree(input, parsedTree, 'category_a', 1)
        
            assert.strictEqual(rootNode.all().length, 16)
        })

        it('should correctly parse simpler data', () => {
            const parsedTree = tree.parse({name: 'root', count: 1, children: []})
            const rootNode = parseTree(simplerInput, parsedTree, 'category_a', 1)

            assert.strictEqual(rootNode.all().length, 4)
        })
    })

    describe('rotatePointAroundAxisCounterClockwise', () => {
        it('should throw an error if degrees isn\'t a multiple of 90', () => {
            const x = 0, y = 0
            assert.throws(() => {rotatePointAroundAxisCounterClockwise({x, y}, {x, y}, 87)}, Error)
        })
        it('should rotate a point counter-clockwise around {0, 0}', () => {
            assert.deepStrictEqual(rotatePointAroundAxisCounterClockwise({x: 1, y:2}, {x:0, y:0}, 90), {x: 2, y: -1})
            assert.deepStrictEqual(rotatePointAroundAxisCounterClockwise({x: 1, y:2}, {x:0, y:0}, 180), {x: -1, y: -2})
            assert.deepStrictEqual(rotatePointAroundAxisCounterClockwise({x: 1, y:2}, {x:0, y:0}, 270), {x: -2, y: 1})
        })
        it('should rotate a point counter-clockwise around a given axis (origin point)', () => {
            assert.deepStrictEqual(rotatePointAroundAxisCounterClockwise({x: 5, y:-6}, {x:2, y:-1}, 90), {x: -3, y: -4})
        })
    })
    
    describe('rotatePointAroundAxisClockwise', () => {
        it('should throw an error if degrees isn\'t a multiple of 90', () => {
            const x = 0, y = 0
            assert.throws(() => {rotatePointAroundAxisClockwise({x, y}, {x, y}, 87)}, Error)
        })
        it('should rotate a point clockwise around {0, 0}', () => {
            assert.deepStrictEqual(rotatePointAroundAxisClockwise({x: 1, y: 2}, {x: 0, y: 0}, 90), {x: -2, y: 1})
            assert.deepStrictEqual(rotatePointAroundAxisClockwise({x: 1, y: 2}, {x: 0, y: 0}, 180), {x: -1, y: -2})
            assert.deepStrictEqual(rotatePointAroundAxisClockwise({x: 1, y: 2}, {x: 0, y: 0}, 270), {x: 2, y: -1})
        })
        it('should rotate a point clockwise around a give axis (origin point)', () => {
            assert.deepStrictEqual(rotatePointAroundAxisClockwise({x: 5, y: -6}, {x: 2, y: -1}, 90), {x: 7, y: 2})
        })
    })
})

