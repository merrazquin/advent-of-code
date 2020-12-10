'use strict'

// Setup

// Part 1
// ======

const part1 = input => {
    const adapters = input.split('\n').map(num => parseInt(num)).sort((a, b) => a - b)
    let oneDiffs = 0, threeDiffs = 1, joltage = 0
    adapters.forEach(adapter => {
        const diff = adapter - joltage
        if (diff == 1) {
            oneDiffs++
        }
        if (diff == 3) {
            threeDiffs++
        }
        joltage = adapter
    })
    
    return oneDiffs * threeDiffs
}

const findPathsForAdapter = (adapter, paths) => {
    let possiblePaths = 0
    
    // look at the next 3 paths, and add those up
    for (var possiblePath = adapter + 1; possiblePath < adapter + 4; possiblePath++) {
        if (paths[possiblePath]) {
            possiblePaths += paths[possiblePath]
        }
    }
    paths[adapter] = possiblePaths
    // console.log('possible paths for', adapter, possiblePaths)
    return paths
}

const part2 = input => {
    // start on the high end
    const adapters = input.split('\n').map(num => parseInt(num)).sort((a, b) => b - a)
    adapters.unshift(adapters[0] + 3)
    adapters.push(0)
    let paths = {}
    paths[adapters[0]] = 1
    for (var i = 1; i < adapters.length; i++) {
        paths = findPathsForAdapter(adapters[i], paths)
    }
    return paths[adapters[adapters.length-1]]
}

module.exports = { part1, part2 }
