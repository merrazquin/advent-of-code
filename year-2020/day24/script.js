'use strict'
const {sumAll} = require('../../utils')
// Setup
const BLACK = '-1'
const WHITE = '1'

const preprocessing = input => {
    const regex = /(se)|(sw)|(nw)|(ne)|(e)|(w)/g
    return input.split('\n').map(row => {
        regex.lastIndex = -1
        return [...row.matchAll(regex)].map(match => match[0])
    })
}

// Part 1
// ======
const findTile = directions => {
    directions = directions.slice()
    // start at 0,0 (center)
    let x = 0, y = 0
    while (directions.length) {
        const currDirection = directions.shift()
        switch (currDirection) {
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
    }

    return {x, y}
}
const part1 = input => {
    const tileMap = {}
    const directions = preprocessing(input)

    directions.forEach(seqence => {
        const {x, y} = findTile(seqence)
        const tileKey = `${x}|${y}`
        if (!tileMap[tileKey]) {
            tileMap[tileKey] = WHITE
        }
        tileMap[tileKey] = tileMap[tileKey] * -1
    });

    return sumAll(Object.values(tileMap).map(tile => tile == BLACK))
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
