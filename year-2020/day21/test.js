const assert = require('assert')
const { part1, part2 } = require('./script')

const foods = 
`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`

describe('Day 21: Allergen Assessment', () => {
    describe('Part One', () => {
        it('should return how many times non-allergenic ingredients appear on the list', () => {
            assert.strictEqual(part1(foods), 5)
        })
    })

    describe ('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(foods), 5)
        })
    })
})
