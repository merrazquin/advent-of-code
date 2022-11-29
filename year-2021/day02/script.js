'use strict'

const { cardinalMove } = require('../../utils')

// Setup

// Part 1
// ======

const part1 = input => {
    let position = {x: 0, y: 0}
    let directions = {
        'forward': 'E',
        'up': 'N',
        'down': 'S'
    }

    input.trim().split('\n').forEach(instruction => {
        let [direction, paces] = instruction.split(' ')
        paces = parseInt(paces)
        position = cardinalMove(position, directions[direction], paces)
    })
    return position.x * position.y
}

// Part 2
// ======

const part2 = input => {
    let position = {x: 0, y: 0}
    let aim = 0
    input.trim().split('\n').forEach(instruction => {
        let [direction, paces] = instruction.split(' ')
        paces = parseInt(paces)

        switch (direction) {
        case 'forward':
            position = cardinalMove(position, 'E', paces)
            position = cardinalMove(position, 'S', aim * paces)
            break
        case 'up':
            aim -= paces
            break
        case 'down':
            aim += paces
            break
        }

    })
    return position.x * position.y
}

module.exports = { part1, part2 }
