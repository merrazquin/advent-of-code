'use strict'

const {multiplyAll} = require('../../utils')
// Setup
const preProcessing = input => input.split('\n').map(robot => {
    const [_, originPoint, __, velocity] = robot.split(/[= ]/g)
    const [originX, originY] = originPoint.split(',').map(num => parseInt(num))
    const [velocityX, velocityY] = velocity.split(',').map(num => parseInt(num))

    return {
        origin: {x: originX, y: originY},
        velocity: {x: velocityX, y: velocityY}
    }
})

const tick = (robots, seconds, width, height) => {
    const outcome = robots.map(robot => {
        const endPos = {x: 0, y: 0}
        let {x: velX, y:velY} = robot.velocity

        if (velX < 0) {
            velX = width + velX
        }
        if (velY < 0) {
            velY = height + velY
        }
        endPos.x = ((velX * seconds) + robot.origin.x) % width
        endPos.y = ((velY * seconds) + robot.origin.y) % height
        return endPos
    })

    const allSeparate = outcome.every(robot => outcome.filter(otherRobot => `${otherRobot.x}_${otherRobot.y}` == `${robot.x}_${robot.y}`).length === 1)
    if (allSeparate) {
        console.log(`------ ${seconds} ------`)
        for (let y = 0; y < height; y++) {
            let row = ''
            for (let x = 0; x < width; x++) {
                const robot = outcome.find(pos => `${pos.x}_${pos.y}` == `${x}_${y}`)
                row += robot ? '*' : ' '
            }
            console.log(row)
        }
    }
    return allSeparate
}

// Part 1
// ======

const part1 = (input, width = 101, height = 103, seconds = 100) => {
    const robots = preProcessing(input)

    const outcome = robots.map(robot => {
        const endPos = {x: 0, y: 0}
        let {x: velX, y:velY} = robot.velocity

        if (velX < 0) {
            velX = width + velX
        }
        if (velY < 0) {
            velY = height + velY
        }
        endPos.x = ((velX * seconds) + robot.origin.x) % width
        endPos.y = ((velY * seconds) + robot.origin.y) % height
        return endPos
    })
    const [NW, NE, SE, SW] = [[], [], [], []]

    const horizontalMidpoint = Math.floor(width / 2)
    const verticalMidpoint = Math.floor(height / 2)
    outcome.forEach(robot => {
        const {x, y} = robot

        if (x < horizontalMidpoint) {
            if (y < verticalMidpoint) {
                NW.push(robot)
            } else if (y > verticalMidpoint) {
                SW.push(robot)
            }
        } else if (x > horizontalMidpoint) {
            if (y < verticalMidpoint) {
                NE.push(robot)
            } else if (y > verticalMidpoint) {
                SE.push(robot)
            }
        }
    });
    return multiplyAll([NW, NE, SE, SW].map(quadrant => quadrant.length))
}

// Part 2
// ======

const part2 = (input, width = 101, height = 103) => {
    const robots = preProcessing(input)
    let i = 0
    let allSeparate = false
    do {
        i++
        allSeparate = tick(robots, i, width, height)
    } while (!allSeparate)
    return i
}

module.exports = { part1, part2 }
