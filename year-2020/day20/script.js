'use strict'

const { multiplyAll } = require("../../utils")

// Setup

const preprocessing = input => {
    return input.split('\n\n').map(tileInfo => {
        let [id, image] = tileInfo.split(':')
        id = parseInt(id.trim().split(' ')[1])
        image = image.trim()
        let imageArr = image.split('\n')
        let borders = [
            imageArr[0], // top
            imageArr[imageArr.length - 1], // bottom
            imageArr.map(row => row.split('')[0]).join(''), // left
            imageArr.map(row => row.split('')[row.split('').length - 1]).join('') // right
        ]
        return {id, image, borders}
    })
}

// Part 1
// ======

const part1 = input => {
    const imageData = preprocessing(input)
    // find matching border pairs
    // since tiles can be rotated and flipped, gotta check against all

    const matches = {}
    imageData.forEach(tile => {
        const {id, borders} = tile
        matches[id] = []
        imageData.forEach(comparisonTile => {
            if (comparisonTile.id != id) {
                let comparisonBorders = comparisonTile.borders
                borders.forEach(border => {
                    if (comparisonBorders.includes(border) || comparisonBorders.includes(border.split('').reverse().join(''))) {
                        matches[id].push(comparisonTile.id)
                    }
                })
            }
        })
    })
    console.log(matches)

    const prods = []
    for (const tileId in matches) {
        if (matches[tileId].length == 2) {
            prods.push(tileId)
        }
    }
    return multiplyAll(prods)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
