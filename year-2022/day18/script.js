'use strict'

// Setup
const preprocessing = (input) => input.trim().split('\n').map(cube => {
    const [x, y, z] = cube.split(',').map(num => parseInt(num))
    return { x, y, z }
})
const preprocessingP2 = (input) => input.trim().split('\n').reduce((obj, cube) => {
    const [x, y, z] = cube.split(',').map(num => parseInt(num))
    obj[`${x}_${y}_${z}`] = { x, y, z }
    return obj
}, {})


// Part 1
// ======
const cubesAreTouching = (cubeA, cubeB) => {
    // cubes touch if they have 2 axes in common and abs of the difference between the 3rd axis is 1
    return (Math.abs(cubeA.x - cubeB.x) + Math.abs(cubeA.y - cubeB.y) + Math.abs(cubeA.z - cubeB.z)) === 1
}
const getSurfaceArea = (cubes, logHits) => {
    let surfaceArea = cubes.length * 6
    for (let cubeAIndex = 0; cubeAIndex < cubes.length - 1; cubeAIndex++) {
        for (let cubeBIndex = cubeAIndex + 1; cubeBIndex < cubes.length; cubeBIndex++) {
            const cubeA = cubes[cubeAIndex]
            const cubeB = cubes[cubeBIndex]
            if (cubesAreTouching(cubeA, cubeB)) {
                if (logHits) {
                    console.log(cubeA, 'and', cubeB, 'are two adjoined airpockets')
                }
                surfaceArea -= 2
            }
        }
    }
    return surfaceArea
}
const findAirPockets = cubeDict => {
    const cubes = Object.values(cubeDict)
    // air pockets exist if there is no cube at x, y, z, and cubes touch it on all sides?
    let xList = cubes.map(cube => cube.x)
    let yList = cubes.map(cube => cube.y)
    let zList = cubes.map(cube => cube.z)

    const minX = Math.min(...xList)
    const maxX = Math.max(...xList)
    const minY = Math.min(...yList)
    const maxY = Math.max(...yList)
    const minZ = Math.min(...zList)
    const maxZ = Math.max(...zList)

    console.log(minX, maxX)
    console.log(minY, maxY)
    console.log(minZ, maxZ)

    let airPockets = []
    let surfaceArea = 0
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                if (!cubeDict[`${x}_${y}_${z}`]) {
                    airPockets.push({x, y, z})
                    if (cubeDict[`${x}_${y}_${z - 1}`]) surfaceArea++
                    if (cubeDict[`${x}_${y}_${z + 1}`]) surfaceArea++
                    if (cubeDict[`${x}_${y - 1}_${z}`]) surfaceArea++
                    if (cubeDict[`${x}_${y + 1}_${z}`]) surfaceArea++
                    if (cubeDict[`${x - 1}_${y}_${z}`]) surfaceArea++
                    if (cubeDict[`${x + 1}_${y}_${z}`]) surfaceArea++
                }
            }
        }
    }
    
    console.log(`Found ${surfaceArea} surface area`)
    return surfaceArea
}
const part1 = input => {
    const cubes = preprocessing(input)
    return getSurfaceArea(cubes)
}


// Part 2
// ======

// 4044 too high for p2
// 438 too LOW for p2
// 2376 with 4 or more sides touching - TOO LOW

// 2424? (4 or more) - NOT RIGHT
// 3462? (5 or more) - NOT RIGHT

// 3444 wiht 5 or more sides touching - not right 
const part2 = input => {
    const surfaceArea = part1(input)
    const cubes = preprocessingP2(input)
    const airPockets = findAirPockets(cubes)
    return surfaceArea - airPockets
}

module.exports = { part1, part2 }
