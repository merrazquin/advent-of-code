'use strict'

const { sumAll } = require("../../utils")
const cache = {}
// Setup
const ACTIVE = 1
const INACTIVE = 0

const countActive = cells => {
    return cells.filter(cell => cell == ACTIVE).length
}

const processInstructions = input => {
    return input.trim().split('\n').map(instruction => {
        let [state, ranges] = instruction.split(' ')

        let [x, y, z] = ranges = ranges.split(',')
        let [minX, maxX] = x.split('=')[1].split('..').map(num => parseInt(num))
        let [minY, maxY] = y.split('=')[1].split('..').map(num => parseInt(num))
        let [minZ, maxZ] = z.split('=')[1].split('..').map(num => parseInt(num))
        return {
            state,
            minX, maxX,
            minY, maxY,
            minZ, maxZ
        }
    })
}
const findExcluded = (instructionA, instructionB) => {
    if (instructionA.state == instructionB.state){

        return {
            state: instructionA.state,
            minX: Math.min(instructionA.minX, instructionB.minX),
            maxX: Math.max(instructionA.maxX, instructionB.maxX),
            minY: Math.min(instructionA.minY, instructionB.minY),
            maxY: Math.max(instructionA.maxY, instructionB.maxY),
            minZ: Math.min(instructionA.minZ, instructionB.minZ),
            maxZ: Math.max(instructionA.maxZ, instructionB.maxZ)
        }
    }
}
const findSingleIntersection = (aMin, aMax, bMin, bMax) => {
    const min = bMin
    const max = aMax
}
const findOverlaps = instructions => {
    // group by on/off
    // within group, sort by minX, then minY, then minZ
}

const runInstructions = (instructions, constrain = false, constraint = 0) => {
    const cubes = {}
    instructions.forEach(instruction => {
        for(let x = instruction.minX; x <= instruction.maxX; x++) {
            if (constrain && Math.abs(x) > constraint) {
                continue
            }
            for(let y = instruction.minY; y <= instruction.maxY; y++) {
                if (constrain && Math.abs(y) > constraint) {
                    continue
                }
                for(let z = instruction.minZ; z <= instruction.maxZ; z++) {
                    if (constrain && Math.abs(z) > constraint) {
                        continue
                    }
                    cubes[`${x}_${y}_${z}`] = instruction.state == 'on' ? ACTIVE : INACTIVE
                    console.log(`${x},${y},${z}`)
                }
            }
        }
    })
    
    return cubes
}

// Part 1
// ======
const part1 = (input, constrain = true) => {
    const instructions = processInstructions(input)
    const constraint = 50

    const cubes = runInstructions(instructions, constrain, constraint)
    return sumAll(Object.values(cubes))
}

// Part 2
// ======

const part2 = input => {
    return part1(input, false)
}

module.exports = { part1, part2, processInstructions, findExcluded, runInstructions }
