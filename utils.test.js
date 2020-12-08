const assert = require('assert')
const { parseTree } = require('./utils')

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
})

