'use strict'

const { rotatePointAroundAxisClockwise, rotatePointAroundAxisCounterClockwise, cardinalRotateRight, cardinalRotateLeft, cardinalMove } = require('../../utils')

// Setup
const preprocessing = input => {
    return input.split('\n').map(instruction => {
        const arr = instruction.split('')
        return {
            direction: arr.shift(),
            paces: parseInt(arr.join(''))
        }
    })
}
// Part 1
// ======

const part1 = input => {
    let x = 0, y = 0
    let currDirection = 'E'
    preprocessing(input).forEach(instruction => {
        const { direction, paces } = instruction
        switch (direction) {
        case 'R':
            currDirection = cardinalRotateRight(currDirection, paces / 90)
            break
        case 'L':
            currDirection = cardinalRotateLeft(currDirection, paces / 90)
            break
        case 'F':
            ({ x, y } = cardinalMove({ x, y }, currDirection, paces))
            break
        default:
            ({ x, y } = cardinalMove({ x, y }, direction, paces))
        }
    })

    return Math.abs(x) + Math.abs(y)
}

// Part 2
// ======
const distances = (ship, waypoint) => {
    return {
        x: waypoint.x - ship.x,
        y: waypoint.y - ship.y
    }
}
const part2 = input => {
    let shipX = 0, shipY = 0, waypointX = 10, waypointY = -1
    let currDirection = 'E'
    input = preprocessing(input)
    input.forEach(instruction => {
        let { direction, paces } = instruction
        if (direction == 'R') {
            const newWaypoint = rotatePointAroundAxisClockwise({x: waypointX, y:waypointY}, {x: shipX, y: shipY}, paces)
            waypointX = newWaypoint.x
            waypointY = newWaypoint.y
            currDirection = cardinalRotateRight(currDirection, paces / 90)
            return
        }

        if (direction == 'L') {
            const newWaypoint = rotatePointAroundAxisCounterClockwise({x: waypointX, y:waypointY}, {x: shipX, y: shipY}, paces)
            waypointX = newWaypoint.x
            waypointY = newWaypoint.y
            currDirection = cardinalRotateLeft(currDirection, paces / 90)
            return
        }

        if (direction == 'F') {
            const waypointMultipliers = distances({ x: shipX, y: shipY }, { x: waypointX, y: waypointY })
            const wpDiffX = waypointX - shipX, wpDiffY = waypointY - shipY
            shipX += paces * waypointMultipliers.x
            shipY += paces * waypointMultipliers.y
            waypointX = shipX + wpDiffX
            waypointY = shipY + wpDiffY
            return
        }

        const newWaypoint = cardinalMove({x: waypointX, y: waypointY}, direction, paces)
        waypointX = newWaypoint.x
        waypointY = newWaypoint.y
    })
    return Math.abs(shipX) + Math.abs(shipY)
}

module.exports = { part1, part2 }
