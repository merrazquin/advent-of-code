'use strict'

// Setup
const preProcessing = input => input.trim().split('\n').map(level => level.split(' ').map(l => parseInt(l)))

// Part 1
// ======

const isLevelSafe = (level, checkDampener = false) => {
    let joinedLevel = level.join()
    let ascSortedLevel = level.slice().sort((a, b) => a-b).join()
    let descSortedLevel = level.slice().sort((a, b) => b-a).join()

    let safe = false
    if (joinedLevel === ascSortedLevel || joinedLevel === descSortedLevel) {
        safe = level.every((val, index) => {
            if (index < level.length - 1) {
                const diff = Math.abs(val - level[index + 1]) 
                return diff >= 1 && diff <= 3
            }
            return true
        })
    } else {
        safe = false
    }
    
    if (!checkDampener) {
        return safe
    }

    for (let i = 0; i < level.length; i++) {
        let newLevel = level.slice()
        newLevel.splice(i, 1)
        if (isLevelSafe(newLevel)) {
            return true
        }
    }
    return false
}
const part1 = input => {
    return preProcessing(input).filter(level => isLevelSafe(level, false)).length
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input).filter(level => isLevelSafe(level, true)).length
}

module.exports = { part1, part2 }
