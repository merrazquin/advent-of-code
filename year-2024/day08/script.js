'use strict'

// Setup
const preProcessing = input => input.split('\n')

// Part 1
// ======
const collectAntennae = map => {
    let re = /([a-zA-Z0-9])/g
    const antennae = {}
    map.forEach((row, rowIndex) => {
        re.lastIndex = 0
        let match
        while (match = re.exec(row)) {
            const nodeId = match[0]
            const colIndex = match.index

            if (!antennae[nodeId]) {
                antennae[nodeId] = new Set()
            }

            antennae[nodeId].add(`${rowIndex}_${colIndex}`)
        }
    })
    return antennae
}

const findAntinodes = (map, antennaA, antennaB) => {
    const [aRow, aCol] = antennaA.split('_').map(num => parseInt(num))
    const [bRow, bCol] = antennaB.split('_').map(num => parseInt(num))
    const antinodes = []
    let rowDif = aRow - bRow
    let colDif = aCol - bCol

    let newRow = aRow + rowDif
    let newCol = aCol + colDif

    if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
        antinodes.push(`${newRow}_${newCol}`)
    }

    rowDif = bRow - aRow
    colDif = bCol - aCol

    newRow = bRow + rowDif
    newCol = bCol + colDif

    if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
        antinodes.push(`${newRow}_${newCol}`)
    }
    return antinodes
}

const findAntinodesWithResonantHarmonics = (map, antennaA, antennaB) => {
    const [aRow, aCol] = antennaA.split('_').map(num => parseInt(num))
    const [bRow, bCol] = antennaB.split('_').map(num => parseInt(num))
    const antinodes = [antennaA, antennaB]

    let rowDif = aRow - bRow
    let colDif = aCol - bCol

    let newRow = aRow + rowDif
    let newCol = aCol + colDif

    while (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
        antinodes.push(`${newRow}_${newCol}`)
        newRow += rowDif
        newCol += colDif
    }

    rowDif = bRow - aRow
    colDif = bCol - aCol

    newRow = bRow + rowDif
    newCol = bCol + colDif

    while (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
        antinodes.push(`${newRow}_${newCol}`)
        newRow += rowDif
        newCol += colDif
    }
    return antinodes
}

const part1 = input => {
    const map = preProcessing(input)
    const antenna = collectAntennae(map)
    let antinodes = new Set()
    for (const antennaId in antenna) {
        const positions = [...antenna[antennaId]]
        do {
            const posA = positions.pop()
            positions.forEach(posB => {
                antinodes = new Set([...antinodes, ...findAntinodes(map, posA, posB)])
            })
        } while (positions.length)
    }

    return antinodes.size
}

// Part 2
// ======

const part2 = input => {
    const map = preProcessing(input)
    const antenna = collectAntennae(map)
    let antinodes = new Set()
    for (const antennaId in antenna) {
        const positions = [...antenna[antennaId]]
        do {
            const posA = positions.pop()
            positions.forEach(posB => {
                antinodes = new Set([...antinodes, ...findAntinodesWithResonantHarmonics(map, posA, posB)])
            })
        } while (positions.length)
    }

    return antinodes.size
}

module.exports = { part1, part2 }
