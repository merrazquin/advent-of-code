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
    const headPos = {x: 0, y: 0}
    for (let i = 0; i < 9; i++) {
        knots.push({ x: 0, y: 0 })
    }

    input.trim().split('\n').forEach(instruction => {
        let [direction, steps] = instruction.split(' ')
        steps = parseInt(steps)
        moveAndFollow(direction, steps, headPos, knots, visitedLocations)
        const tailPos = knots[knots.length - 1]
        // console.log(`after ${instruction} ${tailPos.x}_${tailPos.y}`)
        // printGrid(headPos, knots)
    })

    return visitedLocations
}
const printGrid = (headPos, knots, prefix = '') => {
    const top_left = {x: 0, y: 0};
    const bottom_right = {x: 0, y: 0};
    let allKnots  = [headPos, ...knots]
    allKnots.forEach(knot => {
        top_left.x = Math.min(knot.x, top_left.x)
        top_left.y = Math.min(knot.y, top_left.y)
        bottom_right.x = Math.max(knot.x, bottom_right.x)
        bottom_right.y = Math.max(knot.y, bottom_right.y)
    })
    allKnots = allKnots.map(knot => `${knot.x}_${knot.y}`)

    for (var y = top_left.y; y <= bottom_right.y; y++) {
        let rowStr = prefix
        for (var x = top_left.x; x <= bottom_right.x; x++) {
            const firstKnotAtPos = allKnots.indexOf(`${x}_${y}`);
            rowStr += firstKnotAtPos !== -1 ? allKnots.indexOf(`${x}_${y}`) : '.'
        }
        console.log(rowStr)
    }
    console.log('*'.repeat(10))
}
const moveKnotHorizontally = (leader, knot, adjuster) => {
    const moved = {x: 0, y: 0}
    if (Math.abs(leader.x - knot.x) > 1) {
        if (leader.y !== knot.y) {
            moved.y = leader.y - knot.y
            knot.y = leader.y
        }
        moved.x = adjuster
        knot.x += adjuster
    }
    return moved
}
const moveKnotVertically = (leader, knot, adjuster) => {
    const moved = {x: 0, y: 0}
    if (Math.abs(leader.y - knot.y) > 1) {
        if (leader.x !== knot.x) {
            moved.x = leader.x - knot.x
            knot.x = leader.x
        }
        moved.y = adjuster
        knot.y += adjuster
    }
    return moved
}
const moveAndFollow = (direction, steps, headPos, tailPos, visitedLocations, addToVisited = false) => {
    let adjuster
    
    switch (direction) {
        case 'R':
        case 'L':
            adjuster = direction == 'R' ? 1 : -1
            for (let i = 0; i < steps; i++) {
                headPos.x += adjuster
                if (tailPos.x !== undefined) {
                    moveKnotHorizontally(headPos, tailPos, adjuster)
                    visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
                }
            }
            break;
        case 'U':
        case 'D':
            adjuster = direction == 'D' ? 1 : -1
            for (let i = 0; i < steps; i++) {
                headPos.y += adjuster
                if (tailPos.y !== undefined) {
                    moveKnotVertically(headPos, tailPos, adjuster)
                    visitedLocations.add(`${tailPos.x}_${tailPos.y}`)
                }
            }
            break;
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
