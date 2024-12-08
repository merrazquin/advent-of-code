'use strict'

const { convertRowsToCols } = require('../../utils')

// Setup
const preProcessing = input => input.split('\n')

// Part 1
// ======

/*
nobody can be more disgusted by this than I already am
I feel as though I've sold my soul for a pixelated star
*/
const findDiagonal = (rows, rowIndex, charIndex) => {
    let instances = 0

    let currX = charIndex
    let currY = rowIndex
    let letters = [rows[rowIndex].charAt(charIndex)]
    for (let x = -1, y = 1; y < 4 && currX + x >= 0 && currY + y < rows.length; x--, y++) {
        letters.push(rows[currY + y].charAt(currX + x))
    }
    if (letters.join('') == 'XMAS' || letters.reverse().join('') === 'XMAS') instances++
    currX = charIndex
    currY = rowIndex
    letters = letters = [rows[rowIndex].charAt(charIndex)]
    for (let x = 1, y = 1; y < 4 && currX + x <= rows[0].length && currY + y < rows.length; x++, y++) {
        letters.push(rows[currY + y].charAt(currX + x))
    }
    if (letters.join('') == 'XMAS' || letters.reverse().join('') === 'XMAS') instances++
    return instances
}

const findXMAS = (rows, rowIndex, charIndex) => {
    let currX = charIndex
    let currY = rowIndex
    let letters = [rows[rowIndex].charAt(charIndex)]

    if (currX + 2 < rows[0].length && currY + 2 < rows.length) {
        letters.push(rows[rowIndex + 1].charAt(charIndex + 1))
        letters.push(rows[rowIndex + 2].charAt(charIndex + 2))
        let joinedLetters = letters.join('')
        if (joinedLetters === 'MAS' || joinedLetters === 'SAM'){
            letters = [rows[rowIndex].charAt(charIndex + 2)]
            letters.push(rows[rowIndex + 1].charAt(charIndex + 1))
            letters.push(rows[rowIndex + 2].charAt(charIndex))
            joinedLetters = letters.join('')
            if (joinedLetters === 'MAS' || joinedLetters === 'SAM'){
                return 1
            }
        }
    }
    return 0
}

const part1 = input => {
    let rows = preProcessing(input)
    let instances = 0
    rows.forEach((row, rowIndex) => {
        instances += row.match(/XMAS/g)?.length || 0
        instances += row.match(/SAMX/g)?.length || 0

        const xsIndexes = [...row.matchAll(/X|S/g)].map(match => match.index)
        xsIndexes.forEach(xsIndex => {
            instances += findDiagonal(rows, rowIndex, xsIndex)
        })
    })
    let cols = convertRowsToCols(rows).map(col => col.join(''))
    cols.forEach(col => {
        instances += col.match(/XMAS/g)?.length || 0
        instances += col.match(/SAMX/g)?.length || 0
    })

    return instances
}

// Part 2
// ======

const part2 = input => {
    const rows = preProcessing(input)
    let instances = 0

    rows.forEach((row, rowIndex) => {
        const msIndexes = [...row.matchAll(/M|S/g)].map(match => match.index)
        msIndexes.forEach(msIndex => {
            instances += findXMAS(rows, rowIndex, msIndex)
        })
    })
    return instances
}

module.exports = { part1, part2 }
