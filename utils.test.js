const assert = require('assert')
const { parseTree, rotatePointAroundAxisCounterClockwise,  rotatePointAroundAxisClockwise, cardinalRotateLeft, cardinalRotateRight, gcd, lcm} = require('./utils')

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

    describe('cardinalRotateLeft', () => {
        it('should throw an error if units are not given as an integer', () => {
            assert.throws(() => {cardinalRotateLeft('E', 1.25)}, Error)
        })
        it('should throw an error if direction is unrecognized', () => {
            assert.throws(() => {cardinalRotateLeft('P', 1)}, Error)
        })
        it('should give the new direction of a given direction rotated a specified number of times left (counter-clockwise)', () => {
            assert.strictEqual(cardinalRotateLeft('N', 1), 'W')
            assert.strictEqual(cardinalRotateLeft('E', 3), 'S')
            assert.strictEqual(cardinalRotateLeft('S', 2), 'N')
            assert.strictEqual(cardinalRotateLeft('S', -1), 'W')
        })
    })

    describe('cardinalRotateRight', () => {
        it('should throw an error if units are not given as an integer', () => {
            assert.throws(() => {cardinalRotateRight('E', 1.25)}, Error)
        })
        it('should throw an error if direction is unrecognized', () => {
            assert.throws(() => {cardinalRotateRight('P', 1)}, Error)
        })
        it('should give the new direction of a given direction rotate a specified number of times right (clockwise)', () => {
            assert.strictEqual(cardinalRotateRight('N', 1), 'E')
            assert.strictEqual(cardinalRotateRight('E', 3), 'N')
            assert.strictEqual(cardinalRotateRight('S', 2), 'N')
            assert.strictEqual(cardinalRotateRight('S', -1), 'E')
        })
    })

    describe('gcd', () => {
        it('should throw an error if either argument is not a number', () => {
            assert.throws(() => {gcd(15, 'y')}, Error)
            assert.throws(() => {gcd('x', 3)}, Error)
        })
        it('should return the greatest common denominator of two numbers', () => {
            assert.strictEqual(gcd(8, 12), 4)
        })
    })

    describe('lcm', () => {
        it('should throw an error if either argument is not a number', () => {
            assert.throws(() => {lcm(15, 'y')}, Error)
            assert.throws(() => {lcm('x', 3)}, Error)
        })
        it('should return the least common multiple of two numbers', () => {
            assert.strictEqual(lcm(3, 5), 15)
        })
    })
})

