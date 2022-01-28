'use strict'

// Setup
const parseInput = input => {
    return input.trim().split('\n').map(row => row.split(''))
}
const findSpaces = (cukes, spaceType) => {
    let empties = []
    cukes.reduce((empties, row, rowIndex) => 
        row.reduce((empties, space, colIndex) => {
            if (space === spaceType) {
                empties.push(`${rowIndex}_${colIndex}`)
            }
            return empties
        }, empties)
    , empties)
    return empties
}
const moveEast = cukes => {
    const eastward = findSpaces(cukes, '>')
    const width = cukes[0].length
    
    let nextPhase = JSON.parse(JSON.stringify(cukes))
    eastward.forEach(cukeCoord => {
        let [y, x] = cukeCoord.split('_').map(coord => parseInt(coord))
        let targetX = x + 1
        if (targetX >= width) {
            targetX = 0
        }

        if (cukes[y][targetX] === '.') {
            nextPhase[y][x] = '.'
            nextPhase[y][targetX] = '>'
        }
    })
    return nextPhase
}
const moveSouth = cukes => {
    const southward = findSpaces(cukes, 'v')
    const height = cukes.length

    let nextPhase = JSON.parse(JSON.stringify(cukes))
    southward.forEach(cukeCoord => {
        let [y, x] = cukeCoord.split('_').map(coord => parseInt(coord))
        let targetY = y + 1
        if (targetY >= height) {
            targetY = 0
        }

        if (cukes[targetY][x] === '.') {
            nextPhase[y][x] = '.'
            nextPhase[targetY][x] = 'v'
        }
    })
    return nextPhase
}
const optimized = cukes => {
    let nextPhase = JSON.parse(JSON.stringify(cukes))
    const height = cukes.length
    const width = cukes[0].length

    let empties = findSpaces(cukes, '.')
    empties.forEach(emptyCoord => {
        let [y, x] = emptyCoord.split('_').map(coord => parseInt(coord))
        let targetX = x - 1
        if (targetX < 0) {
            targetX = width - 1
        }

        if (cukes[y][targetX] === '>') {
            nextPhase[y][x] = '>'
            nextPhase[y][targetX] = '.'
        }
    })

    empties = findSpaces(nextPhase, '.')
    empties.forEach(emptyCoord => {
        let [y, x] = emptyCoord.split('_').map(coord => parseInt(coord))
        let targetY = y - 1
        if (targetY < 0) {
            targetY = height - 1
        }

        if (cukes[targetY][x] === 'v') {
            nextPhase[y][x] = 'v'
            nextPhase[targetY][x] = '.'
        }
    })

    return nextPhase

}
const debug = cukes => {
    cukes.forEach(row => {
        console.log(row.join(''))
    })
    console.log('')
}
const getFullString = cukes => {
    return cukes.reduce((str, row) => str + row.join(''), '')
}
// Part 1
// ======

const part1 = input => {
    let cukes = parseInput(input)
    let prevHash = getFullString(cukes)
    cukes = moveSouth(moveEast(cukes))
    let steps = 1
    while (getFullString(cukes) !== prevHash) {
        prevHash = getFullString(cukes)
        cukes = moveSouth(moveEast(cukes))
        steps++
    }
    return steps
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }
