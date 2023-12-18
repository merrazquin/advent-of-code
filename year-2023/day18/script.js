'use strict'

const { getNeighboringCell } = require('../../utils')

// Setup
const preProcessing = (input, p2 = false) => input.split('\n').map(instruction => {
    const [direction, val, color] = instruction.replace(/[()#]/g, '').split(/\s+/)
    const stepCount = parseInt(val)

    return p2 ? parseP2Instruction(color) : {direction, stepCount}
})

const directions = {
    '0': 'R',
    '1': 'D',
    '2': 'L',
    '3': 'U'
}
const parseP2Instruction = color => {
    color = color.split('')
    const direction = directions[color.pop()]
    const stepCount = parseInt(`0x${color.join('')}`, 16)

    return {direction, stepCount}
}
// Part 1
// ======
const buildAndParseGrid = instructions => {
    const holes = new Set()
    let x = 0
    let y = 0
    let minX = 0, minY = 0, maxX = 0, maxY = 0
    let key = `${x}_${y}`
    holes.add(key)

    const xSet = new Set(), ySet = new Set()
    instructions.forEach(instruction => {
        let stepCount = instruction.stepCount
        switch (instruction.direction) {
        case 'L':
            while (stepCount--) {
                x--
                xSet.add(x)
                key = `${x}_${y}`
                holes.add(key)
            }
            break
        case 'R':
            while (stepCount--) {
                x++
                xSet.add(x)
                key = `${x}_${y}`
                holes.add(key)
            }
            break
        case 'U':
            while (stepCount--) {
                y--
                ySet.add(y)
                key = `${x}_${y}`
                holes.add(key)
            }
            break
        case 'D':
            while (stepCount--) {
                y++
                ySet.add(y)
                key = `${x}_${y}`
                holes.add(key)
            }
            break
        }
        minX = Math.min(x, minX)
        minY = Math.min(y, minY)
        maxX = Math.max(x, maxX)
        maxY = Math.max(y, maxY)

    })

    const width = maxX - minX + 1
    const height = maxY - minY + 1
    const xMod = minX < 0 ? Math.abs(minX) : 0
    const yMod = minY < 0 ? Math.abs(minY) : 0
    const flatGrid = new Array(width * height).fill('.')
    const path = []
    for (const hole of holes) {
        let [x, y] = hole.split('_').map(val => parseInt(val))

        x += xMod
        y += yMod

        const index = x + (y * width)
        path.push(index)
        flatGrid[index] = '#'
    }

    let insideCount = 0
    let tracker = -1
    flatGrid.forEach((_, tile) => {
        const inPath = path.indexOf(tile)
        const southernTile = getNeighboringCell(tile, 'S', flatGrid, width)

        if (southernTile === -1) {
            return
        }

        if (inPath === -1 && tracker === 1) {
            insideCount++
        }

        if (flatGrid[tile] === '#' && flatGrid[southernTile] === '#') {
            tracker *= -1
        }
    })

    return holes.size + insideCount
}
const part1 = input => {
    const instructions = preProcessing(input)
    return buildAndParseGrid(instructions)
}

// Part 2
// ======

const part2 = input => {
    return 0
}

module.exports = { part1, part2 }
