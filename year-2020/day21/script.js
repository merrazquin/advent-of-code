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
const removeIngredientFromAllExcept = (foodList, identifiedIngredient, index) => {
    // once an allergen has been identified, remove badIngredient from all other lists
    foodList.forEach((subFood, subIndex) => {
        if (subIndex != index) {
            const identifiedIngredientIndex = subFood.ingredients.indexOf(identifiedIngredient)
            if (identifiedIngredientIndex != -1) {
                subFood.ingredients.splice(identifiedIngredientIndex, 1)
            }
        }
    })
}

const getFullAllergenList = foodList => {
    const allAllergens = new Set()
    foodList.forEach(food => {
        food.allergens.forEach(allergen => allAllergens.add(allergen))
    })
    return [...allAllergens]
}

const identifiyAllergens = (foodList) => {
    let allAllergens = {}
    // sort foodlist by number of allergens and number of ingredients
    foodList.sort((foodA, foodB) => {
        // TODO: add 2D sort to utils
        return (foodA.allergens.length < foodB.allergens.length) ? -1 : (foodA.allergens.length > foodB.allergens.length) ? 1 : ((foodA.ingredients.length < foodB.ingredients.length) ? -1 : (foodA.ingredients.length > foodB.ingredients.length) ? 1 : 0)
    })

    // traverse allergens in each food in list
    // find all foods which list the allergen
    // all other mentions of the allergen must have an ingredient from that food
    foodList.forEach((food, index) => {
        let { ingredients, allergens } = food
        if (ingredients.length == 1 && allergens.length == 1) {
            let ingredient = ingredients.pop()
            let allergen = allergens.pop()
            allAllergens[allergen] = ingredient
            removeIngredientFromAllExcept(foodList, ingredient, index)
        }
        allergens.forEach(allergen => {
            if (allAllergens[allergen]) {
                return
            }
            foodList.forEach((subFood, subIndex) => {
                if (subIndex != index) {
                    const subAllergens = subFood.allergens
                    if (subAllergens.includes(allergen)) {
                        const subIngredients = subFood.ingredients
                        let intersectingIngredients = subIngredients.filter(subIngredient => ingredients.includes(subIngredient))
                        if (intersectingIngredients.length == 1) {
                            const identifiedIngredient = intersectingIngredients.pop()
                            allAllergens[allergen] = identifiedIngredient 
                            // once an allergen has been identified, remove ingredient from all other lists
                            removeIngredientFromAllExcept(foodList, identifiedIngredient, index)
                        }
                    }
                }
            })
        })
    });

    // one final pass for allergens 
    foodList.forEach(food => {
        let {ingredients, allergens} = food
        if (ingredients.length == 1 && allergens.length == 1) {
            const allergen = allergens.pop()
            if (!allAllergens[allergen]) {
                allAllergens[allergen] = ingredients.pop()
            }
        }
    })
    return allAllergens
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

    let tally = 0
    nonAllergicIngredients.forEach(ingredient => {
        tally += allIngredients[ingredient]
    })
    return tally
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
