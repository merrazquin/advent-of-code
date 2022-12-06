'use strict'

const { sumAll } = require('../../utils')

// Setup
const preprocessing = (input) => input.trim().split('\n')
    .map(rucksack => {
        const mid = rucksack.length / 2
        let compartment1 = new Set(rucksack.slice(0, mid).split('').sort())
        let compartment2 = new Set(rucksack.slice(mid).split('').sort())

        for (let item of compartment1){
            if (compartment2.has(item)) {
                return {
                    commonItem: item,
                    rucksack: new Set([...compartment1, ...compartment2])
                }
            }
        }
        
    })

// Part 1
// ======

const part1 = input => {
    const data = preprocessing(input)
    return sumAll(data.map(item => {
        const charCode = item.commonItem.charCodeAt(0)
        const score = charCode < 91 ? (charCode - 38) : charCode - 96
        return score
    }))
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    let score = 0
    while (data.length) {
        const rucksack1 = data.shift().rucksack
        const rucksack2 = data.shift().rucksack
        const rucksack3 = data.shift().rucksack

        let uniqueItems = new Set([...rucksack1, ...rucksack2, ...rucksack3])
        uniqueItems.forEach(item => {
            if (rucksack1.has(item) && rucksack2.has(item) && rucksack3.has(item)) {
                const charCode = item.charCodeAt(0)
                score += charCode < 91 ? (charCode - 38) : charCode - 96
            }
        })
    }
    return score
}

module.exports = { part1, part2 }
