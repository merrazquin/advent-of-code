'use strict'
const { sumAll } = require('../../utils')
// Setup
const BLACK = -1
const WHITE = 1

const preprocessing = input => {
    const regex = /(se)|(sw)|(nw)|(ne)|(e)|(w)/g
    return input.split('\n').map(row => {
        regex.lastIndex = -1
        return [...row.matchAll(regex)].map(match => match[0])
    })
}

// Part 1
// ======
const getHexNeighborCoords = (x, y, direction) => {
    switch (direction) {
    case 'e':
        x++
        break
    case 'w':
        x--
        break
    case 'ne':
        y--
        if (y % 2 == 0) {
            x++
        }
        break
    case 'nw':
        y--
        if (y % 2 != 0) {
            x--
        }
        break
    case 'se':
        y++
        if (y % 2 == 0) {
            x++
        }
        break
    case 'sw':
        y++
        if (y % 2 != 0) {
            x--
        }
        break
    }
    return {x, y}
}
const findTile = directions => {
    directions = directions.slice()
    let x = 0, y = 0
    while (directions.length) {
        const currDirection = directions.shift()
        let newCoords = getHexNeighborCoords(x, y, currDirection)
        x = newCoords.x
        y = newCoords.y
    }

    return { x, y }
}
const getInitialTileMap = directions => {
    const tileMap = {}

    directions.forEach(seqence => {
        const { x, y } = findTile(seqence)
        const tileKey = `${x}|${y}`
        if (!tileMap[tileKey]) {
            tileMap[tileKey] = WHITE
        }
        tileMap[tileKey] = tileMap[tileKey] * -1
    })
    return tileMap
}

const part1 = input => {
    const directions = preprocessing(input)
    const tileMap = getInitialTileMap(directions)
    return sumAll(Object.values(tileMap).map(tile => tile === BLACK))
}

// Part 2
// ======
const findNeighbors = (tileKey) => {
    let [origX, origY] = tileKey.split('|').map(val => parseInt(val))
    return ['ne', 'nw', 'se', 'sw', 'e', 'w'].map(direction => {
        let {x, y} = getHexNeighborCoords(origX, origY, direction)
        return `${x}|${y}`
    })
}
const nextGenerationForTile = (tileMap, tileKey) => {
    const tile = tileMap[tileKey] || WHITE
    const neighbors = findNeighbors(tileKey)
    const blackTileCount = neighbors.map(tileKey => tileMap[tileKey] || WHITE).filter(tile => tile === BLACK).length

    if (tile === BLACK && (blackTileCount == 0 || blackTileCount > 2)) {
        return WHITE
    } else if (tile === WHITE && blackTileCount === 2) {
        return BLACK
    } else {
        return tile
    }
}

const part2 = input => {
    const directions = preprocessing(input)
    let tileMap = getInitialTileMap(directions)

    let days = 100

    while (days--) {
        let maxX = Object.keys(tileMap).reduce((prevMax, key) => Math.max(prevMax, Math.abs(parseInt(key.split('|')[0]))), 0)
        let maxY = Object.keys(tileMap).reduce((prevMax, key) => Math.max(prevMax, Math.abs(parseInt(key.split('|')[1]))), 0)

        let nextTileMap = {}
        let x = maxX * -1 - 1
        for (x; x <= maxX + 1; x++) {
            let y = maxY * -1 - 1
            for(y; y <= maxY + 1; y++) {
                const tileKey = `${x}|${y}`
                if (!nextTileMap[tileKey]) {
                    const nextTile = nextGenerationForTile(tileMap, tileKey)
                    nextTileMap[tileKey] = nextTile
                }
            }
        }
    
        tileMap = nextTileMap
    }
    return Object.values(tileMap).filter(tile => tile === BLACK).length
}

module.exports = { part1, part2 }
