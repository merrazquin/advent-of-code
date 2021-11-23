'use strict'
const toggleOnRect = (screen, x, y) => {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            screen[j][i] = 1
        }
    }
    return screen
}

const convertToColumns = (screen, w, h) => {
    let columns = new Array(w).fill(0).map(() => new Array(h).fill(0))
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            columns[i][j] = screen[j][i]
        }
    }
    return columns
}

const convertToRows = (screen, w, h) => {
    let rows = new Array(h).fill(0).map(() => new Array(w).fill(0))
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            rows[j][i] = screen[i][j]
        }
    }
    return rows
}

const rotate = (array, amount) => {
    while(amount--) {
        array.unshift(array.pop())
    }
    return array
}

const rotateColumn = (screen, column, amount) => {
    var columns = convertToColumns(screen, screen[0].length, screen.length)
    columns[column] = rotate(columns[column], amount)
    return convertToRows(columns, screen[0].length, screen.length)
}

const rotateRow = (screen, row, amount) => {
    screen[row] = rotate(screen[row], amount)
    return screen
}

const readout = screen => {
    console.log(screen.map(row => row.join('')).join('\n').replace(/0/g, ' ').replace(/1/g, '#'), '\n')
}
// Part 1
// ======

const part1 = (input, w = 50, h = 6) => {
    let screen = new Array(h).fill(0).map(() => new Array(w).fill(0))
    input.trim().split('\n').forEach(instruction => {
        if (instruction.indexOf('rect') == 0) {
            screen = toggleOnRect(screen, instruction.split(' ')[1].split('x')[0], instruction.split('x')[1])
        } else if (instruction.indexOf('rotate column') == 0) {
            const column = instruction.split(' ')[2].split('=')[1]
            const amount = instruction.split(' ')[4]
            screen = rotateColumn(screen, column, amount)
        } 
        else if (instruction.indexOf('rotate row') == 0) {
            const row = instruction.split(' ')[2].split('=')[1]
            const amount = instruction.split(' ')[4]
            screen = rotateRow(screen, row, amount)
        }
    })
    // part 2
    readout(screen)
    return screen.map(row => row.reduce((a, b) => a + b)).reduce((a, b) => a + b)
}

module.exports = { part1 }