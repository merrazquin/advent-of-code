'use strict'

// Setup
const parsePoints = input => {
    return input.trim().split('\n').map(line => line.split(' -> ').map(point => {
        const [x, y] = point.trim().split(',').map(coord => parseInt(coord))
        return {x, y}
    })
    )
}

const fillGrid = points => {
    const maxX = points.reduce((acc, pair) => Math.max(acc, pair[0].x, pair[1].x), 0)
    const maxY = points.reduce((acc, pair) => Math.max(acc, pair[0].y, pair[1].y), 0)
    
    const grid = new Array(maxY + 1).fill('').map(() => new Array(maxX + 1).fill(0))

    points.forEach(pair => {
        const [pA, pB] = pair

        const startX = Math.min(pA.x, pB.x)
        const endX = Math.max(pA.x, pB.x)
        const startY = Math.min(pA.y, pB.y)
        const endY = Math.max(pA.y, pB.y)
        
        if (startX != endX && startY != endY) {

            let x = pA.x
            let y = pA.y

            let xMult = pA.x < pB.x ? 1 : -1
            let yMult = pA.y < pB.y ? 1 : -1

            while (x != (pB.x + xMult) && y != (pB.y + yMult)) {
                grid[y][x]++
                x += xMult
                y += yMult
            }
        } else if (startX == endX) {
            for (let y = startY; y <= endY; y++) {
                grid[y][startX]++
            }
        } else {
            for (let x = startX; x <= endX; x++) {
                grid[startY][x]++
            }
        }
    })
    // debug grid
    // console.log(grid.map(row => row.map(el => el == 0 ? '.' : el).join('')).join('\n'))
    return grid
}
// Part 1
// ======

const part1 = input => {
    const points = parsePoints(input).filter(point => point[0].x == point[1].x || point[0].y == point[1].y)
    return fillGrid(points).flat().filter(el => el > 1).length    
}

// Part 2
// ======

const part2 = input => {
    const points = parsePoints(input)
    return fillGrid(points).flat().filter(el => el > 1).length    
}

module.exports = { part1, part2 }
