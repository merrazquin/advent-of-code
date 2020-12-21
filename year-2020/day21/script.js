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

const identifiyAllergens = (foodList) => {
    let allAllergens = {}
    // go food by food in the foodList. For each ingredient in a food list, 
    // check other foods for that ingredient, find where the allergens intersects

    // find all food lists which list the allergen
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
                        // let badFood = compAllergens.filter(allergen => allergens.includes(allergen));
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
    return allAllergens
}
const part1 = input => {
    let foodList = preprocessing(input)
    console.log(identifiyAllergens(foodList))
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
