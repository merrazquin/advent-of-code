'use strict'

const { convertRowsToCols, sumAll, memoize } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n')

const rollStones = (col, flipped = false) => {
    let changed = false

    for (let i = 0; i < col.length -1; i++) {
        let left = col[i]
        let right = col[i + 1]

        const doSwap = flipped ? (right === '.' && left === 'O') : (right === 'O' && left === '.')
        if (doSwap) {
            ([right, left] = [left, right])
            col[i] = left
            col[i + 1] = right
            changed = true
        }
    }

    if (changed) {
        rollStones(col, flipped)
    }
    return col
}

const calcLoad = col => col.reduce((total, item, index) => item === 'O' ? (total + index + 1) : total, 0)

// Part 1
// ======

const part1 = input => {
    const cols = convertRowsToCols(preProcessing(input)).map(col => calcLoad(rollStones(col).reverse()))
    return sumAll(cols)
}

// Part 2
// every call to convertRowsToCols changes the "vantage point" of the grid
//  passing `true` for flipped changes the direction in which the stones need to roll
// ======
const cycle = platform => {
    // roll north
    platform = convertRowsToCols(platform).map(col => rollStones(col).join(''))

    // roll west
    platform = convertRowsToCols(platform).map(col => rollStones(col).join(''))

    // roll south
    platform = convertRowsToCols(platform).map(col => rollStones(col, true).join(''))

    // roll east
    platform = convertRowsToCols(platform).map(col => rollStones(col, true).join(''))

    return platform
}
const part2 = input => {

    let platform = preProcessing(input)
    let prevPlatform = platform.join('\n') 

    const cache = {}
    cache[prevPlatform] = 0
    
    let i = 0
    let target = 1000000000
    const memoizedCycle = memoize(cycle)

    while (i < target) {
        i++
        platform = memoizedCycle(platform)
        if (platform.join('\n') == prevPlatform) {
            break
        }
        prevPlatform = platform.join('\n')
        if (cache[prevPlatform] !== undefined) {
            const cycleLength = i - cache[prevPlatform]
            const newTarget = (1000000000 - cache[prevPlatform]) % cycleLength + i
            target = Math.min(target, newTarget)
        }
        cache[prevPlatform] = i
    }

    return sumAll(convertRowsToCols(platform).map(col => calcLoad(col.reverse())))
}

module.exports = { part1, part2 }
