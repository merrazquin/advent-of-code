'use strict'

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

const collectVertices = instructions => {
    const vertices = []
    let x = 0
    let y = 0
    let pathCount = 0
    instructions.forEach(instruction => {
        let stepCount = instruction.stepCount
        pathCount += stepCount
        switch (instruction.direction) {
        case 'L':
            x -= stepCount
            break
        case 'R':
            x += stepCount
            break
        case 'U':
            y -= stepCount
            break
        case 'D':
            y += stepCount
            break
        }
        vertices.push({x, y})
    })
    return {pathCount, vertices}
}
const picksTheorem = (inside, border) => {
    return inside + (border * .5) + 1
}
const shoelace = vertices => {
    const verticesArray = Array.from(vertices)
    const laces = verticesArray.reduce((acc, vertex, index) => {
        const nextVert = verticesArray[index + 1]
        const {x: x1, y: y1} = vertex
        const {x: x2, y: y2} = nextVert ? nextVert : verticesArray[0]

        acc.x += x1 * y2
        acc.y += x2 * y1
        
        return acc
    }, {x: 0, y:0})
    return 0.5 * Math.abs(laces.x - laces.y)
}
// Part 1
// ======

const part1 = (input, p2 = false) => {
    const instructions = preProcessing(input, p2)
    const {pathCount, vertices} = collectVertices(instructions)
    const inside = shoelace(vertices)
    return picksTheorem(inside, pathCount)
}

// Part 2
// ======

const part2 = input => {
    return part1(input, true)
}

module.exports = { part1, part2 }
