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

const getFullAllergenList = foodList => {
    const allAllergens = new Set()
    foodList.forEach(food => {
        food.allergens.forEach(allergen => allAllergens.add(allergen))
    })
    return [...allAllergens]
}

const identifyAllIngredients = foodList => {
    const allIngredients = {}
    foodList.forEach(food => {
        food.ingredients.forEach(ingredient => {
            if (!allIngredients[ingredient]) {
                allIngredients[ingredient] = 0
            }
            allIngredients[ingredient]++
        })
    })
    return allIngredients
}
const identifySingleAllergen = (foodList,  allergen) => {
    let intersection = Object.keys(identifyAllIngredients(foodList))

    foodList.forEach(food => {
        const {allergens, ingredients} = food
        if (allergens.includes(allergen)) {
            intersection = ingredients.filter(ingredient => intersection.includes(ingredient))
        }
    })

    return intersection
}

const removePositionFromAllExcept = (position, mapping, except) => {
    const newMapping = {}
    for (let fieldName in mapping) {
        let positions = mapping[fieldName]
        if (fieldName != except) {
            const index = positions.indexOf(position)
            if (index != -1) {
                positions.splice(index, 1)
            }
        }
        newMapping[fieldName] = positions
    }
    return newMapping
}

const part1 = input => {
    let foodList = preprocessing(input)
    let mapping = {}
    const allergenList = getFullAllergenList(foodList)
    allergenList.forEach(allergen => {
        mapping[allergen] = identifySingleAllergen(foodList, allergen)
    })
    let breakout = false
    while (!breakout) {
        breakout = true
        for (let allergen in mapping) {
            const possibleIngredients = mapping[allergen]
            if ((typeof possibleIngredients == 'object') && possibleIngredients.length == 1) {
                // strip position from all but fieldName
                mapping = removePositionFromAllExcept(possibleIngredients[0], mapping, allergen)
                mapping[allergen] = possibleIngredients[0]
            } else if (typeof possibleIngredients == 'object') {
                breakout = false
            }
        }
    }

    foodList = preprocessing(input)
    const allIngredients = identifyAllIngredients(foodList)
    const allergicIngredients = Object.values(mapping)
    const nonAllergicIngredients = Object.keys(allIngredients).filter(ingredient => !allergicIngredients.includes(ingredient))
    console.log(mapping)
    let tally = 0
    nonAllergicIngredients.forEach(ingredient => {
        tally += allIngredients[ingredient]
    })
    return tally
}

// Part 2
// ======

const part2 = input => {
    let foodList = preprocessing(input)
    let mapping = {}
    const allergenList = getFullAllergenList(foodList)
    allergenList.forEach(allergen => {
        mapping[allergen] = identifySingleAllergen(foodList, allergen)
    })
    let breakout = false
    while (!breakout) {
        breakout = true
        for (let allergen in mapping) {
            const possibleIngredients = mapping[allergen]
            if ((typeof possibleIngredients == 'object') && possibleIngredients.length == 1) {
                // strip position from all but fieldName
                mapping = removePositionFromAllExcept(possibleIngredients[0], mapping, allergen)
                mapping[allergen] = possibleIngredients[0]
            } else if (typeof possibleIngredients == 'object') {
                breakout = false
            }
        }
    }

    foodList = preprocessing(input)
    const sortedIngredients = Object.keys(mapping).sort((a, b) => a < b ? -1 : 1).map(allergen => mapping[allergen])

    return sortedIngredients.join(',')
}

module.exports = { part1, part2 }
