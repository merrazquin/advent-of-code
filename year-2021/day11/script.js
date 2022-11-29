'use strict'

const { findNeighbors } = require('../../utils')
// Setup
const tick = (grid, width) => {
    let flashedThisStep = []

    grid = grid.map(octopus => octopus + 1)
    let flashPoints = getFlashPoints(grid)
    while (flashPoints.length) {
        flashedThisStep.push(... flashPoints)
        processFlashPoints(flashPoints, grid, width)
        flashPoints = getFlashPoints(grid).filter(flashPoint => !flashedThisStep.includes(flashPoint))
    }
    grid = grid.map(octopus => octopus > 9 ? 0 : octopus)

    return {grid, flashedThisStep}
}

const getFlashPoints = grid => grid.map((octopus, index) => octopus > 9 ? index : -1).filter(flash => flash !== -1)

const processFlashPoints = (flashPoints, grid, width) => {
    flashPoints.forEach(flashPoint => {
        const neighbors = findNeighbors(flashPoint, grid, width, true, true).filter(neighbor => neighbor !== '')
        neighbors.forEach(neighbor => grid[neighbor]++)
    })
} 

// Part 1
// ======

const part1 = (input, cycles = 100) => {
    let grid = input.trim().split('\n')
    const width = grid[0].length
    grid = grid.join('').split('').map(num => parseInt(num))

    let flashes = 0
    let flashedThisStep
    while (cycles--) {
        ({grid, flashedThisStep} = tick(grid, width))
        flashes += flashedThisStep.length
    }
    return flashes
}

// Part 2
// ======

const part2 = input => {
    let grid = input.trim().split('\n')
    const width = grid[0].length
    grid = grid.join('').split('').map(num => parseInt(num))

    let cycles = 0
    let flashedThisStep
    do {
        ({grid, flashedThisStep} = tick(grid, width))
        cycles++
    } while (flashedThisStep.length !== grid.length)
    return cycles
}

module.exports = { part1, part2 }
