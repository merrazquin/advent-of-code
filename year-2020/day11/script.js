'use strict'

// Setup
const OCCUPIED = '#'
const EMPTY = 'L'
const FLOOR = '.'

// Part 1
// ======
const countOccupied = seats => {
    return seats.filter(seat => seat == OCCUPIED).length
}
const getNeighboringCell = (i, direction, seating, width) => {
    // horizontal offset is 1, BUT
    // left edge modulo width = 0
    // right edge modulo width = width - 1
    // declining diagonal offset is width + 1
    // inclinng diagonal offset is width - 1
    // right diagonal offset is 
    // vertical offset is width
    let cell = -1
    switch (direction) {
    case 'NW':
        if (i % width > 0 && i > width - 1) {
            cell = i - (width + 1)
        }
        break
    case 'N':
        if (i > width - 1) {
            cell = i - width
        }
        break
    case 'NE':
        if (i > width - 1 && i % width < width - 1) {
            cell = i - (width - 1)
        }
        break
    case 'E':
        if (i % width < width - 1) {
            cell = i + 1
        }
        break
    case 'SE':
        if (i % width < width - 1 && i < seating.length - width) {
            cell = i + (width + 1)
        }
        break
    case 'S':
        if (i < seating.length - width) {
            cell = i + width
        }
        break
    case 'SW':
        if (i % width > 0 && i <= seating.length - width) {
            cell = i + (width - 1)
        }
        break
    case 'W':
        if (i % width > 0) {
            cell = i - 1
        }
        break
    }
    return cell
}
const findVisibleNeighborsInDirection = (i, seating, width, direction) => {
    const lineOfSightNeighbors = []
    let neighbor = ''
    let cell = getNeighboringCell(i, direction, seating, width)
    while (cell != -1) {
        neighbor = seating[cell]
        lineOfSightNeighbors.push(neighbor)
        if (neighbor != FLOOR) {
            break
        }
        cell = getNeighboringCell(cell, direction, seating, width)
    }

    return lineOfSightNeighbors
}
const findVisibleNeighbors = (i, seating, width) => {
    const lineOfSightNeighbors = []
    const directions = ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W']
    directions.forEach(direction => {
        lineOfSightNeighbors.push(...findVisibleNeighborsInDirection(i, seating, width, direction))
    })

    return lineOfSightNeighbors
}
const findNeighbors = (i, seating, width) => {
    const neighbors = []
    let neighbor
    ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W'].forEach(direction => {
        neighbor = ''
        let cell = getNeighboringCell(i, direction, seating, width)
        if (cell != -1) {
            neighbor = seating[cell]
        }
        if (neighbor.length) {
            neighbors.push(neighbor)
        }
    })

    return neighbors
}

const nextGeneration = (currentGeneration, width, threshold) => {
    return currentGeneration.map((spot, index) => {
        const occupiedNeighbors = countOccupied(findNeighbors(index, currentGeneration, width))
        if (spot == EMPTY && !occupiedNeighbors) {
            return OCCUPIED
        }
        if (spot == OCCUPIED && occupiedNeighbors >= threshold) {
            return EMPTY
        }
        return spot
    })
}

const nextGeneration2 = (currentGeneration, width, threshold) => {
    return currentGeneration.map((spot, index) => {
        const occupiedNeighbors = countOccupied(findVisibleNeighbors(index, currentGeneration, width))
        if (spot == EMPTY && !occupiedNeighbors) {
            return OCCUPIED
        }
        if (spot == OCCUPIED && occupiedNeighbors >= threshold) {
            return EMPTY
        }
        return spot
    })
}
const visualize = (seating, width) => {
    const r = new RegExp('.{' + width + '}', 'g')
    const visualization = seating.match(r).join('\n')
    return visualization
}

const part1 = input => {
    const rows = input.split('\n')
    const width = rows[0].length

    let currGen = rows.join('')
    let nextGen = nextGeneration(currGen.split(''), width, 4)
    while (nextGen.join('') != currGen) {
        currGen = nextGen.join('')
        nextGen = nextGeneration(currGen.split(''), width, 4)
    }
    return countOccupied(currGen.split(''))
}

// Part 2
// ======

const part2 = input => {
    const rows = input.split('\n')
    const width = rows[0].length
    let currGen = rows.join('')
    let nextGen = nextGeneration2(currGen.split(''), width, 5)
    while (nextGen.join('') != currGen) {
        currGen = nextGen.join('')
        nextGen = nextGeneration2(currGen.split(''), width, 5)
    }
    return countOccupied(currGen.split(''))
}

module.exports = { part1, part2, nextGeneration, nextGeneration2, visualize, findNeighbors, findVisibleNeighbors, countOccupied, findVisibleNeihborsInDirection: findVisibleNeighborsInDirection }
//6:35 AM start
//7:21 AM nextGen function completed
//8:04 AM part 1
// 8:12 AM start part 2
// 2:06 PM incorrect p2 answer (2145 too high)
// 3:59 PM correct p2 answer (had been off by one!!!!!!!)