'use strict'

const { convertRowsToCols, manhattan, sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n').map(row => row.split(''))

const findExpansionPoints = universe => {
    const xExpansions = []
    const yExpansions = []

    universe.forEach((row, y) => {
        if (!row.some(pos => pos === '#')) {
            yExpansions.push(y)
        }
    })

    const cols = convertRowsToCols(universe.map(row => row.join('')))
    cols.forEach((col, x) => {
        if (!col.some(pos => pos === '#')) {
            xExpansions.push(x)
        }
    })

    return {xExpansions, yExpansions}
}

const filterExpansions = (expansions, posA, posB) => {
    const [minX, maxX] = [posA.x, posB.x].sort((a, b)=> a-b)
    const [minY, maxY] = [posA.y, posB.y].sort((a, b)=> a-b)
    const xExpansions = expansions.xExpansions.filter(xExpansion => (minX < xExpansion && xExpansion < maxX)).length
    const yExpansions = expansions.yExpansions.filter(yExpansion => (minY < yExpansion && yExpansion < maxY)).length

    return xExpansions + yExpansions
}

const getGalaxies = universe => {
    const galaxies = []
    let id = 1
    universe.forEach((row, y) => {
        Array.from(row.join('').matchAll(/#/g)).map(candidate => {
            galaxies.push({x: candidate.index, y, id})
            id++
        })
    })

    return galaxies
}

// Part 1
// ======

const part1 = (input, expansionSize = 2) => {
    const universe = preProcessing(input)
    const expansions = findExpansionPoints(universe)
    const galaxies = getGalaxies(universe)
    const distances = {}
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = 1; j < galaxies.length; j++) {
            const key = [i, j].sort().join('_')
            if (i !== j && distances[key] === undefined) {
                const filteredExpansions = filterExpansions(expansions, galaxies[i], galaxies[j])
                distances[key] = manhattan(galaxies[i], galaxies[j]) + (filteredExpansions * expansionSize) - filteredExpansions
            }
        }
    }
    return sumAll(Object.values(distances))
}

// Part 2
// ======

const part2 = (input, expansionSize = 1000000) => {
    return part1(input, expansionSize)
}

module.exports = { part1, part2 }
