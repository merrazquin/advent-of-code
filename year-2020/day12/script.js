'use strict'

// Setup
const preprocessing = input => {
    return input.split('\n').map(instruction => {
        const arr = instruction.split('')
        return {
            direction: arr[0],
            paces: parseInt(arr.slice(1).join(''))
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
    });

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
        let {direction, paces} = instruction
        if (direction == 'R' || direction == 'L') {
            const curInd = directions.indexOf(currDirection)
            let newInd
            if (direction == 'R') {
                newInd = (curInd + (paces / 90)) % directions.length
            } else {
                newInd = (curInd - (paces / 90)) % directions.length
                if (newInd < 0) newInd = directions.length + newInd 
            }
            const origDist = distances({x:shipX, y:shipY}, {x: waypointX, y: waypointY}) 
            let dist = origDist
            currDirection = directions[newInd]
            console.log('rotating', direction, paces)
            if (direction == 'L') {
                paces = 360 - paces
            }
            console.log('  rotated to', currDirection)
            while (paces > 0) {
                waypointX = shipX + Math.abs(dist.x) 
                waypointY = shipY + Math.abs(dist.y)
                dist = distances({x:shipX, y:shipY}, {x: waypointX, y: waypointY}) 
                paces -= 90
            }
            console.log('   waypoint', waypointX, waypointY)
            return
        }

        if (direction == 'F') {
            console.log('moving ship forward non-mult', paces)
            const waypointMultipliers = distances({x: shipX, y: shipY}, {x: waypointX, y: waypointY})
            const wpDiffX = waypointX - shipX, wpDiffY = waypointY - shipY
            console.log('mults', waypointMultipliers)
            shipX += paces * waypointMultipliers.x
            shipY += paces * waypointMultipliers.y
            /* switch (currDirection) {
                case 'E':
                    shipX += paces * waypointMultipliers.x
                    break
                case 'W':
                    shipX -= paces* waypointMultipliers.x
                    break
                case 'N':
                    shipY -= paces * waypointMultipliers.y
                    break
                case 'S':
                    shipY += paces * waypointMultipliers.y
                    break
            } */
            waypointX = shipX + wpDiffX
            waypointY = shipY + wpDiffY

            console.log('ship:', shipX, shipY)
            console.log('waypoint:', waypointX, waypointY)
            return
        }
        console.log('moving waypoint', direction, paces)
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
        console.log('waypoint:', waypointX, waypointY)
    })
    return Math.abs(shipX) + Math.abs(shipY)
}

module.exports = { part1, part2 }
