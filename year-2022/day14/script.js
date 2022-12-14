'use strict'
// Setup
const preprocessing = (input, sandSource) => {
    let minX = 500
    let maxX = 500
    let maxDepth = 0
    let rockPaths = input.trim().split('\n').map(rockPath =>
        rockPath.split(' -> ').map(coord => {
            const [x, y] = coord.split(',').map(val => parseInt(val))
            minX = Math.min(minX, x)
            maxX = Math.max(maxX, x)
            maxDepth = Math.max(maxDepth, y)
            return { x, y }
        })
    ).map(rockPath => {
        return rockPath.map(coord => {
            return {
                x: coord.x - minX,
                y: coord.y
            }
        })
    })

    sandSource.x -= minX
    return {
        rockPaths,
        sandSource,
        maxWidth: maxX - minX,
        maxDepth
    }

}

// Part 1
// ======
const buildGrid = (rockPaths, maxWidth, maxDepth, sandSource) => {
    const grid = []
    for (let depth = 0; depth <= maxDepth; depth++) {
        const row = new Array(maxWidth + 1)
        row.fill('.')
        grid.push(row)
    }

    rockPaths.forEach(rockPath => {
        let nodeIndex = 0
        while (nodeIndex + 1 < rockPath.length) {
            let pointA = rockPath[nodeIndex]
            let pointB = rockPath[nodeIndex + 1]
            if (pointA.x > pointB.x || pointA.y > pointB.y) {
                // swap order
                let temp = pointA
                pointA = pointB
                pointB = temp
            }
            for (let column = pointA.x; column <= pointB.x; column++) {
                for (let row = pointA.y; row <= pointB.y; row++) {
                    grid[row][column] = '#'
                }
            }
            nodeIndex++
        }
    })

    grid[sandSource.y][sandSource.x] = '+'
    return grid
}

/* eslint-disable-next-line no-unused-vars */
const printGrid = (title, grid) => {
    console.log(title)
    grid.forEach(row => {
        console.log(row.join(''))
    })
    console.log('\n')
}

const dropSand = (grid, sandSource, p2 = false) => {
    const currPos = JSON.parse(JSON.stringify(sandSource))
    // condition for p2 would be y == 0, and y+1,x-1 & y+1,x+1 are both sand (o)
    if (p2 && currPos.y == 0 && grid[currPos.y + 1][currPos.x - 1] == 'o' && grid[currPos.y + 1][currPos.x + 1] == 'o') {
        return false
    }
    // attempt to move down
    if (grid[currPos.y + 1][currPos.x] == '.') {
        if (currPos.y + 1 >= grid.length) {
            return false
        }
        currPos.y++
        return dropSand(grid, currPos)
    } 
    // attempt to move diagonally down left
    else if (grid[currPos.y + 1][currPos.x - 1] == '.') {
        if (currPos.x - 1 == 0) {
            return false
        }
        currPos.y++
        currPos.x--
        return dropSand(grid, currPos)
    } 
    // attempt to move diagonally down right
    else if (grid[currPos.y + 1][currPos.x + 1] == '.') {
        if (currPos.x + 1 == grid[0].length - 1) {
            return false
        }
        currPos.y++
        currPos.x++
        return dropSand(grid, currPos)
    } else {
        grid[currPos.y][currPos.x] = 'o'
        return true
    }
}

const part1 = input => {
    const {
        rockPaths,
        sandSource,
        maxDepth,
        maxWidth
    } = preprocessing(input, { x: 500, y: 0 })
    const grid = buildGrid(rockPaths, maxWidth, maxDepth, sandSource)
    let units = 0
    while (dropSand(grid, sandSource)) {
        units++
    }
    
    return units
}

// Part 2
// ======

const part2 = input => {
    const {
        rockPaths,
        sandSource,
        maxDepth,
        maxWidth
    } = preprocessing(input, {x: 500, y: 0}, true)
    // pad left & right (THIS IS A KLUDGE, BUT IDGAF BECAUSE IT WORKS)
    const horizontalPadding = 500
    const grid = buildGrid(rockPaths, maxWidth, maxDepth, sandSource).map(row => {
        row.unshift(...'.'.repeat(horizontalPadding).split(''))
        row.push(...'.'.repeat(horizontalPadding).split(''))
        return row
    })

    // adjust sandsource
    sandSource.x = grid[0].indexOf('+')
    // add flooring
    const padding = new Array(grid[0].length)
    padding.fill('.')
    const floor = new Array(grid[0].length)
    floor.fill('#')
    grid.push(padding, floor)
    
    let units = 0
    while (dropSand(grid, sandSource, true)) {
        units++
    }
    
    return units + 1

}

module.exports = { part1, part2 }
