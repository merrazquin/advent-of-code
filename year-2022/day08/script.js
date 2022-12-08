'use strict'

const { convertRowsToCols } = require('../../utils')

// Setup
const preprocessingPart1 = (input) => {
    const rows = input.trim().split('\n').map(row => row.split('').map(num => parseInt(num)))
    const cols = convertRowsToCols(input.trim().split('\n')).map(col => col.map(num => parseInt(num)))
    const numRows = rows.length
    const numCols = rows[0].length
    let numVisible = (numCols * 2) + ((numRows - 2) * 2)

    let visibleTreesFound = new Set()
    for (let row = 1; row < numRows - 1; row++) {
        for (let col = 1; col < numCols - 1; col++) {
            const tree = rows[row][col]
            if (rows[row].slice(0, col).every((rowNeighbor, index) => index === col || rowNeighbor < tree)) {
                visibleTreesFound.add(`${row}_${col}`)
            } else if (rows[row].slice(col + 1).every((rowNeighbor, index) => index === col || rowNeighbor < tree)) {
                visibleTreesFound.add(`${row}_${col}`)
            } else if (cols[col].slice(0, row).every((colNeighbor, index) => index === row || colNeighbor < tree)) {
                visibleTreesFound.add(`${row}_${col}`)
            } else if (cols[col].slice(row + 1).every((colNeighbor, index) => index === row || colNeighbor < tree)) {
                visibleTreesFound.add(`${row}_${col}`)
            }
        }
    }

    return visibleTreesFound.size + numVisible
}

const preprocessingPart2 = (input) => {
    const rows = input.trim().split('\n').map(row => row.split('').map(num => parseInt(num)))
    const cols = convertRowsToCols(input.trim().split('\n')).map(col => col.map(num => parseInt(num)))
    const numRows = rows.length
    const numCols = rows[0].length
    let maxScore = 0
    for (let row = 1; row < numRows - 1; row++) {
        for (let col = 1; col < numCols - 1; col++) {
            const tree = rows[row][col]
            let rowNeighbor, colNeighbor
            let scenicScore = 1
            
            // check top
            let score = 0
            for (colNeighbor = row - 1; colNeighbor >= 0; colNeighbor--) {
                score++
                if (cols[col][colNeighbor] >= tree) break
            }
            if (!score) continue
            scenicScore *= score
            // check left
            score = 0
            for (rowNeighbor = col - 1; rowNeighbor >= 0; rowNeighbor--) {
                score++
                if (rows[row][rowNeighbor] >= tree) break
            }
            if (!score) continue
            scenicScore *= score
            
            // check down
            score = 0
            for (colNeighbor = row + 1; colNeighbor < numRows; colNeighbor++) {
                score++
                if (cols[col][colNeighbor] >= tree) break
            }
            if (!score) continue
            scenicScore *= score
            
            // check right
            score = 0
            for (rowNeighbor = col + 1; rowNeighbor < numCols; rowNeighbor++) {
                score++
                if (rows[row][rowNeighbor] >= tree) break
            }
            if (!score) continue
            scenicScore *= score

            maxScore = Math.max(scenicScore, maxScore)
        }
    }
    return maxScore
}


// Part 1
// ======

const part1 = input => {
    const data = preprocessingPart1(input)
    return data
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessingPart2(input)
    return data
}

module.exports = { part1, part2 }
