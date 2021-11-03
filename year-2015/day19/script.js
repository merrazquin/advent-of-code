'use strict'

// Setup

const preprocessing = input => {
    let [replacements, medicine] = input.split('\n\n')
    const replacementsMap = new Map()
    replacements.split('\n').forEach(replacement => {
        let [key, value] = replacement.split(' => ')
        if (!replacementsMap.has(key)) {
            replacementsMap.set(key, [])
        }
        replacementsMap.get(key).push(value)
    })

    return {
        medicine, 
        replacementsMap
    }
}

// Part 1
// ======

const part1 = input => {
    const {medicine, replacementsMap } = preprocessing(input)
    const molecules = new Set()
    const replacements = [...replacementsMap.entries()]
    replacements.forEach(replacement => {
        const [replacementKey, replacementValues] = replacement
        replacementValues.forEach(replacementValue => {
            let i = medicine.indexOf(replacementKey)
            while (i != -1) {
                molecules.add(medicine.substring(0, i) + replacementValue + medicine.substring(i + replacementKey.length))
                i = medicine.indexOf(replacementKey, i + 1)
            }
        })
    })

    return molecules.size
}

// Part 2
// ======

const reverseMap = replacementsMap => {
    const reversedMap = new Map()
    const replacements = [...replacementsMap.entries()]
    replacements.forEach(replacement => {
        const [replacementKey, replacementValues] = replacement
        replacementValues.forEach(replacementValue => {
            reversedMap.set(replacementValue, replacementKey)
        })
    })

    return reversedMap
}
const part2 = input => {
    let {medicine, replacementsMap} = preprocessing(input)
    replacementsMap = reverseMap(replacementsMap)

    let target = medicine
    let steps = 0
    let keys = [...replacementsMap.keys()]

    // Credit to /u/What-A-Baller
    // https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/cy4cu5b/?utm_source=reddit&utm_medium=web2x&context=3
    while (target != 'e'){
        let tmp = target
        keys.forEach(key => {
            if (target.indexOf(key) != -1) {
                target = target.replace(key, replacementsMap.get(key))
                steps++
            }
        })

        // if the string hasn't changed at all, shuffle the order of the replacements, and try again
        if (tmp == target) {
            target = medicine
            steps = 0
            keys = keys.sort(() => Math.random() > .5 ? -1 : 1)
        }
    }
    return steps
}

module.exports = { part1, part2 }
