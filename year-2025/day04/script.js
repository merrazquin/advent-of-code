'use strict'
const { sumAll, findNeighbors } = require('../../utils')

// Setup
const preProcessing = input => {
    const wallData = input.trim().split('\n').map(row => row.split('').map(space => space == '@' ? 1 : 0))
    let width = wallData[0].length
    let wall = wallData.join(',').split(',')
    return {
        width,
        wall
    }

}

const isAccessible = (wall, width, index) => {
    return sumAll(findNeighbors(index, wall, width).map(el => parseInt(el == '1' ? 1 : 0))) < 4
}

// Part 1
// ======
const part1 = input => {
    const {width, wall} = preProcessing(input)
    let accessibleRolls = wall.map((el, index) => el == 1 ? index : -1).filter(el => el != -1).map(
        index => isAccessible(wall, width, index) ? index : -1
    ).filter(el => el != -1)
    
    return accessibleRolls.length
}

// Part 2
// ======

const part2 = input => {
    let {width, wall} = preProcessing(input)

    let tally = 0
    let recentlyRemovedRolls = 0

    do {
        let accessibleRolls = wall.map((el, index) => el == 1 ? index : -1).filter(el => el != -1).map(
            index => isAccessible(wall, width, index) ? index : -1
        ).filter(el => el != -1)
        
        recentlyRemovedRolls = accessibleRolls.length
        tally += recentlyRemovedRolls
        wall = wall.map((el, index) => accessibleRolls.includes(index) ? '0' : el)

    } while (recentlyRemovedRolls)
    
    return tally
}

module.exports = { part1, part2 }
