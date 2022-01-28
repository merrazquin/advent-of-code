'use strict'

const { findNeighbors, chunk, debugGrid } = require('../../utils')

// Setup
const parseInput = input => {
    let [enhancementAlgo, inputImage] = input.split('\n\n')
    const splitGrid = inputImage.split('\n')
    const gridWidth = splitGrid[0].length
    inputImage = splitGrid.join('').split('')
    return {enhancementAlgo, inputImage, gridWidth}
}
const generateNewInputImage = (inputImage, gridWidth, enhancementAlgo, defaultChar) => {
    return inputImage.map((pixel, index) => findEnhancedPixel(inputImage, gridWidth, index, enhancementAlgo, defaultChar))
}

const findEnhancedPixel = (inputImage, gridWidth, index, enhancementAlgo, defaultChar = '.') => {
    let neighbors = findNeighbors(index, inputImage, gridWidth, true, false, true, defaultChar).map(pixel => pixel === '#' ? 1 : 0)
    // console.log(chunk(neighbors, 3).join('\n'))
    // process.exit()
    let lookup = parseInt(neighbors.join(''), 2)
    return enhancementAlgo[lookup]
}
const padForNextGen = (inputImage, gridWidth, padding = 1, char = '.') => {
    const newRow = char.repeat(gridWidth + (padding * 2))
    let rows = chunk(inputImage, gridWidth).map(row => `${char.repeat(padding)}${row}${char.repeat(padding)}`)
    gridWidth += (padding * 2)
    while (padding--) {
        rows.unshift(newRow)
        rows.push(newRow)
    }
    inputImage = rows.join('').split('')
    return {
        gridWidth,
        inputImage
    }
}

// Part 1
// ======

const part1 = (input, steps = 2) => {
    let {enhancementAlgo, inputImage, gridWidth} = parseInput(input)
    // debugGrid(inputImage, gridWidth, 0, 'original')
    
    let padded, i = 1
    while (i <= steps) {
        let padChar = enhancementAlgo[0]
        let defaultChar = '.'

        if (padChar == '#' && i % 2 != 0) {
            defaultChar = '#'
        }

        padded = padForNextGen(inputImage, gridWidth, 1, padChar)
        inputImage = padded.inputImage
        gridWidth = padded.gridWidth

        inputImage = generateNewInputImage(inputImage, gridWidth, enhancementAlgo, defaultChar)
        debugGrid(inputImage, gridWidth)
        i++
    }

    debugGrid(inputImage, gridWidth)
    console.log(fudge(inputImage, gridWidth, 1).filter(pixel => pixel == '#').length)

    return inputImage.filter(pixel => pixel == '#').length
} 
const fudge = (inputImage, gridWidth, shave) => {
    let arr = chunk(inputImage, gridWidth).map(row => {
        let rowArr = row.split('')
        let i = 0
        while (i++ < shave) {
            rowArr.unshift()
            rowArr.pop()
        }
        return rowArr.join('')
    })
    while(shave--) {
        arr.unshift()
        arr.pop()
    }
    return arr.join('').split('')
}
// 5624 too high
// 5614 INCORRECT (probably too high?) @ 3:24PM locked for 5 minutes
// 0 @ 4:01 locked for 5 minutes
// 5419 INCORRECT and someone else's answer @ 4:21 locked for 5 minutes
// Part 2
// 5511 not correct

// 5448 8th incorrect guess
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }