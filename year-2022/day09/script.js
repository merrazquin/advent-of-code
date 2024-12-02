'use strict'

// Setup
const preprocessingP1 = (input) => {
    const visitedLocations = new Set()
    visitedLocations.add('0_0')

    let headPos = { x: 0, y: 0 }
    let tailPos = { x: 0, y: 0 }

    input.trim().split('\n').forEach(instruction => {
        let [direction, steps] = instruction.split(' ')
        steps = parseInt(steps)
        moveAndFollow(direction, steps, headPos, tailPos, visitedLocations)
    })

    return visitedLocations
}
const preprocessingP2 = (input) => {
    const visitedLocations = new Set()
    visitedLocations.add('0_0')
    const knots = []
    const ropes = []
    for (let i = 0; i < 10; i++) {
        knots.push({x: 0, y: 0})
    }
    for (let i = 1; i < 9; i++) {
        ropes.push({
            headPos: knots[i],
            tailPos: knots[i+1]
        })
    }
    const tailPos = knots[knots.length - 1]

    input.trim().split('\n').forEach(instruction => {
        let [direction, steps] = instruction.split(' ')
        steps = parseInt(steps)
        while (steps--) {
            moveAndFollow(direction, 1, knots[0], knots[1])
            ropes.forEach(rope => {
                follow(rope.headPos, rope.tailPos, direction, rope.tailPos === tailPos ? visitedLocations : null)
                printGrid(knots)
            })
            console.log('moved all ropes')
        }
        if (direction === 'U') {
            process.exit()
        }
    })

    return visitedLocations
}

const follow = (headPos, tailPos, direction, visitedLocations = null) => {
    const steps = 1
    let adjuster
    switch (direction) {
    case 'R':
    case 'L':
        adjuster = direction == 'R' ? 1 : -1
        for (let i = 0; i < steps; i++) {
            moveKnotHorizontally(headPos, tailPos, adjuster)
            if (visitedLocations) {
                visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
            }
        }
        break
    case 'U':
    case 'D':
        adjuster = direction == 'D' ? 1 : -1
        for (let i = 0; i < steps; i++) {
            moveKnotVertically(headPos, tailPos, adjuster)
            if (visitedLocations) {
                visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
            }
        }
        break
    }
}

const moveAndFollow = (direction, steps, headPos, tailPos, visitedLocations = null) => {
    let adjuster
    switch (direction) {
    case 'R':
    case 'L':
        adjuster = direction == 'R' ? 1 : -1
        for (let i = 0; i < steps; i++) {
            headPos.x += adjuster
            moveKnotHorizontally(headPos, tailPos, adjuster)
            if (visitedLocations) {
                visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
            }
        }
        break
    case 'U':
    case 'D':
        adjuster = direction == 'D' ? 1 : -1
        for (let i = 0; i < steps; i++) {
            headPos.y += adjuster
            moveKnotVertically(headPos, tailPos, adjuster)
            if (visitedLocations) {
                visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
            }
        }
        break
    }
}

/* eslint-disable-next-line no-unused-vars */
const printGrid = (knots, prefix = '') => {
    const top_left = {x: 0, y: 0}
    const bottom_right = {x: 0, y: 0}
    knots.forEach(knot => {
        top_left.x = Math.min(knot.x, top_left.x)
        top_left.y = Math.min(knot.y, top_left.y)
        bottom_right.x = Math.max(knot.x, bottom_right.x)
        bottom_right.y = Math.max(knot.y, bottom_right.y)
    })
    knots = knots.map(knot => `${knot.x}_${knot.y}`)

    for (var y = top_left.y; y <= bottom_right.y; y++) {
        let rowStr = prefix
        for (var x = top_left.x; x <= bottom_right.x; x++) {
            const firstKnotAtPos = knots.indexOf(`${x}_${y}`)
            rowStr += firstKnotAtPos !== -1 ? firstKnotAtPos : '.'
        }
        console.log(rowStr)
    }
    console.log('*'.repeat(10))
}
const moveKnotHorizontally = (leader, knot, adjuster) => {
    if (Math.abs(leader.x - knot.x) > 1) {
        if (leader.y !== knot.y) {
            knot.y = leader.y
        }
        knot.x += adjuster
    }
}
const moveKnotVertically = (leader, knot, adjuster) => {
    if (Math.abs(leader.y - knot.y) > 1) {
        if (leader.x !== knot.x) {
            knot.x = leader.x
        }
        knot.y += adjuster
    }
}



// Part 1
// ======

const part1 = input => {
    const data = preprocessingP1(input)
    // data.forEach(pos => console.log(pos))
    return data.size
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessingP2(input)
    return data.size
}

module.exports = { part1, part2 }
