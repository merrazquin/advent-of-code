'use strict'

// Setup

const preprocessing = input => {
    return input.split('\n').map(food => {
        let [ingredients, allergens] = food.split('(contains ')
        ingredients = ingredients.trim().split(' ')
        allergens = allergens.substring(0, allergens.length - 1).split(', ')
        return {
            ingredients,
            allergens
        }
    })
}

// Part 1
// ======

const part1 = input => {
    return preprocessing(input)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
