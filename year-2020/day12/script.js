'use strict'

const { rotatePointAroundAxisClockwise, rotatePointAroundAxisCounterClockwise } = require('../../utils')

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
    const directions = ['E', 'S', 'W', 'N']
    preprocessing(input).forEach(instruction => {
        const { direction, paces } = instruction
        if (direction == 'R') {
            const curInd = directions.indexOf(currDirection)
            const newInd = (curInd + (paces / 90)) % directions.length
            currDirection = directions[newInd]
            return
        }
        if (direction == 'L') {
            const curInd = directions.indexOf(currDirection)
            let newInd = (curInd - (paces / 90)) % directions.length
            if (newInd < 0) newInd = directions.length + newInd
            currDirection = directions[newInd]
            return
        }
        if (direction == 'F') {
            switch (currDirection) {
            case 'E':
                x += paces
                break
            case 'W':
                x -= paces
                break
            case 'N':
                y -= paces
                break
            case 'S':
                y += paces
                break
            }
            return
        }
        switch (direction) {
        case 'E':
            x += paces
            break
        case 'W':
            x -= paces
            break
        case 'N':
            y -= paces
            break
        case 'S':
            y += paces
            break
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
    const directions = ['E', 'S', 'W', 'N']
    input = preprocessing(input)
    input.forEach(instruction => {
        let { direction, paces } = instruction
        if (direction == 'R' || direction == 'L') {
            const curInd = directions.indexOf(currDirection)
            let newInd
            if (direction == 'R') {
                newInd = (curInd + (paces / 90)) % directions.length
            } else {
                newInd = (curInd - (paces / 90)) % directions.length
                if (newInd < 0) newInd = directions.length + newInd
            }
            currDirection = directions[newInd]
            let newWaypoint
            if (direction == 'R') {
                newWaypoint = rotatePointAroundAxisClockwise({ x: waypointX, y: waypointY }, { x: shipX, y: shipY }, paces)
            } else {
                newWaypoint = rotatePointAroundAxisCounterClockwise({ x: waypointX, y: waypointY }, { x: shipX, y: shipY }, paces)
            }
            waypointX = newWaypoint.x
            waypointY = newWaypoint.y
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

        switch (direction) {
        case 'E':
            waypointX += paces
            break
        case 'W':
            waypointX -= paces
            break
        case 'N':
            waypointY -= paces
            break
        case 'S':
            waypointY += paces
            break
        }
    })
    return Math.abs(shipX) + Math.abs(shipY)
}

module.exports = { part1, part2 }
