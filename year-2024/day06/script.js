'use strict'

// Setup
const preProcessing = input => input.split('\n')

// Part 1
// ======
const originalDirections = [
    {row: -1, col: 0, dir: 'up'},
    {row: 0, col: 1, dir: 'right'},
    {row: 1, col: 0, dir: 'down'},
    {row: 0, col: -1, dir: 'left'}
]
const part1 = (input, getPositions = false) => {
    const map = preProcessing(input)
    
    let currentRow = map.findIndex(row => row.includes('^'))
    let currentCol = map[currentRow].indexOf('^')
    
    const visited = new Set()
    const directions = originalDirections.slice()
    let movement = directions.shift()
    while (currentRow + movement.row < map.length && currentCol + movement.col < map[0].length) {
        if (map[currentRow + movement.row][currentCol + movement.col] === '#') {
            // rotate 90 degrees
            directions.push(movement)
            movement = directions.shift()
        } else {
            const position = `${currentRow}_${currentCol}`
            visited.add(position)
            currentRow += movement.row
            currentCol += movement.col
        }
    }
    visited.add(`${currentRow}_${currentCol}`)
    return getPositions ? visited : visited.size
}

// Part 2
// ======

const hasLoop = map => {
    let currentRow = map.findIndex(row => row.includes('^'))
    let currentCol = map[currentRow].indexOf('^')

    const visited = new Set()
    const directions = originalDirections.slice()
    let movement = directions.shift()
    while (currentRow + movement.row > -1 && currentRow + movement.row < map.length && currentCol + movement.col > -1 && currentCol + movement.col < map[0].length) {
        if (map[currentRow + movement.row][currentCol + movement.col] === '#') {
            // rotate 90 degrees
            directions.push(movement)
            movement = directions.shift()
        } else {
            const position = `${currentRow}_${currentCol}_${movement.dir}`
            if (visited.has(position)) {
                return true
            }
            visited.add(position)
            currentRow += movement.row
            currentCol += movement.col
        }
    }
    return false
}

const part2 = input => {
    const map = preProcessing(input)
    const startingRow = map.findIndex(row => row.includes('^'))
    const startingCol = map[startingRow].indexOf('^')

    let positions = part1(input, true)
    const altMaps = []
    positions.forEach(val => {
        const altMap = map.slice()
        const [row, col] = val.split('_').map(num => parseInt(num))
        if (`${row}_${col}` !== `${startingRow}_${startingCol}`) {
            const newRow = altMap[row].split('')
            newRow[col] = '#'
            altMap[row] = newRow.join('')
    
            altMaps.push(altMap)
        }
    })

    return altMaps.filter(hasLoop).length
}

module.exports = { part1, part2 }
