'use strict'
const { sumAll, multiplyAll } = require('../../utils')
const numRe = new RegExp(/[0-9]+/g)
const symbolCheck = new RegExp(/[^0-9\.]/)
const asterisks = {}

// Setup
const preProcessing = (input) => input.map((ln, rowIndex) => {
    return Array.from(ln.matchAll(numRe)).map(candidate => {
        return {
            rowIndex,
            partIndex: candidate.index,
            partNumber: parseInt(candidate[0]),
            left: candidate.index - 1,
            right: candidate.index + candidate[0].length,
        }
    })
})

const isPartNumber = (candidate, listing, p2 = false) => {
    const {rowIndex, left, right} = candidate
    let row = listing[rowIndex]
    // concatenate neighbors
    let neighbors = ''
    if (left > -1) neighbors += row[left]
    if (right <= row.length - 1) neighbors += row[right]
    const min = left > -1 ? left : 0
    const max = right <= row.length - 1 ? right : row.length - 1
    let topline, bottomline
    if (rowIndex > 0) {
        topline = listing[rowIndex - 1].substring(min, max + 1)
        neighbors += topline
    }
    if (rowIndex < listing.length - 1) {
        bottomline = listing[rowIndex + 1].substring(min, max + 1)
        neighbors += bottomline
    }

    const isPart = symbolCheck.test(neighbors)

    if (isPart && p2) {
        if (row[left] === '*') {
            const key = rowIndex + '_' + left
            if (!asterisks[key]) {
                asterisks[key] = []
            }
            asterisks[key].push(candidate.partNumber)
        }
        if (row[right] === '*') {
            const key = rowIndex + '_' + right
            if (!asterisks[key]) {
                asterisks[key] = []
            }
            asterisks[key].push(candidate.partNumber)
        }
        if (topline !== undefined && topline.indexOf('*') !== -1) {
            const key = (rowIndex - 1) + '_' + (min + topline.indexOf('*'))
            if (!asterisks[key]) {
                asterisks[key] = []
            }
            asterisks[key].push(candidate.partNumber)
        }
        if (bottomline !== undefined && bottomline.indexOf('*') !== -1) {
            const key = (rowIndex + 1) + '_' + (min + bottomline.indexOf('*'))
            if (!asterisks[key]) {
                asterisks[key] = []
            }
            asterisks[key].push(candidate.partNumber)
        }
    }

    return isPart
}

// Part 1
// ======

const part1 = input => {
    const listing = input.trim().split('\n')
    return sumAll(preProcessing(listing).flat().filter(candidate => isPartNumber(candidate, listing)).map(candidate => candidate.partNumber))
}

// Part 2
// ======

const part2 = input => {
    const listing = input.trim().split('\n')
    preProcessing(listing).flat().forEach(candidate => isPartNumber(candidate, listing, true))
    return sumAll(Object.values(asterisks).filter(asterisk => asterisk.length === 2).map(asterisk => multiplyAll(asterisk)))
}
module.exports = { part1, part2 }
