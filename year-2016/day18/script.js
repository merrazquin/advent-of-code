'use strict'

const tileInNextRow = input => {
    return ['^^.', '.^^', '^..', '..^'].includes(input) ? '^' : '.'
}
const getNextRow = row => {
    return row.split('').map((tile, index) => {
        if (index === 0) {
            return tileInNextRow('.' + tile + row[index + 1]) 
        } else if (index === row.length - 1) {
            return tileInNextRow(row[index - 1] + tile + '.')
        }
        return tileInNextRow(row[index - 1] + tile + row[index + 1])
    }).join('')
    
}
 
// Part 1
// ======

const part1 = (input, numRows = 40) => {
    const floor = [input]
    while (floor.length < numRows) {
        floor.push(getNextRow(floor[floor.length - 1]))
    }
    return floor.reduce((safeTileCount, row) => {
        return safeTileCount + row.split('').filter(tile => tile === '.').length
    }, 0)
}

// Part 2
// ======199301

const part2 = (input, numRows = 400000) => {
    return part1(input, numRows)
}

module.exports = { part1, part2, getNextRow }