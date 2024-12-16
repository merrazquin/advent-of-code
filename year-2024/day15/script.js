'use strict'
const {getNeighboringCell, debugGrid} = require('../../utils')
// Setup
const preProcessing = input => {
    let [grid, instructions] = input.split('\n\n')
    grid = grid.split('\n')
    const width = grid[0].length
    grid = grid.join('').split('')
    instructions = instructions.split('\n').join('').split('')
    return {width, grid, instructions}
}

const expandGrid = (grid, width) => {
    const expandedGrid = []
    grid.forEach(element => {
        switch (element) {
            case '.':
                expandedGrid.push('.', '.')
                break;
            case '#':
                expandedGrid.push('#', '#')
                break;
            case '@':
                expandedGrid.push('@', '.')
                break;
            case 'O':
                expandedGrid.push('[', ']')
                break;
        }
    })
    return {expandedGrid, expandedWidth: width * 2}
}

// Part 1
// ======

const DIRECTIONS = {
    '^': 'N',
    '>': 'E',
    'v': 'S',
    '<': 'W'
}
const move = (robot, instruction, grid, width) => {
    const nextPosition = getNeighboringCell(robot, DIRECTIONS[instruction], grid, width)
    const nextCell = grid[nextPosition]

    let newRobotPosition = robot
    switch (nextCell) {
        case '#':
            // do nothing
            break;
        case '.':
            // move into the space, leaving a space in its place
            grid[robot] = '.'
            newRobotPosition = nextPosition
            grid[newRobotPosition] = '@'
            break;
        case 'O':
            newRobotPosition = pushBox(robot, nextPosition, instruction, grid, width)
            break
        case '[':
        case ']':
            const box = [nextPosition]
            if (nextCell === '[') {
                box.push(nextPosition + 1)
            } else {
                box.push(nextPosition - 1)
            }
            newRobotPosition = pushBigBox(robot, box, instruction, grid, width)
            break;
    }
    return newRobotPosition
}

const pushBigBox = (robot, boxPositions, instruction, grid, width) => {
    let newRobotPosition = robot
    if (instruction == '<' || instruction == '>') {
        // pushing sideways is similar to regular push
        const nextPosition = getNeighboringCell(boxPositions[1], DIRECTIONS[instruction], grid, width)
        const nextCell = grid[nextPosition]
        switch (nextCell) {
            case '#':
                // do nothing
                break;
            case '.':
                grid[nextPosition] = grid[boxPositions[1]]
                grid[boxPositions[1]] = grid[boxPositions[0]]
                grid[boxPositions[0]] = '@'
                grid[robot] = '.'
                newRobotPosition = boxPositions[0]
                break;
            case '[':
            case ']':
                boxPositions.push(nextPosition)
                let otherCell = getNeighboringCell(nextPosition, DIRECTIONS[instruction], grid, width)
                while (grid[otherCell] == ']' || grid[otherCell] == '[') {
                    boxPositions.push(otherCell)
                    otherCell = getNeighboringCell(otherCell, DIRECTIONS[instruction], grid, width)
                }
                if (grid[otherCell] === '.') {
                    boxPositions.push(otherCell)
                    while (boxPositions.length > 1) {
                        grid[boxPositions.pop()] = grid[boxPositions[boxPositions.length - 1]]
                    }

                    newRobotPosition = boxPositions[0]
                    grid[robot] = '.'
                    grid[newRobotPosition] = '@'
                }
                break;
        }
        return newRobotPosition
    } else {
        // pushing up & down is a trickier beast
        let toBePushed = []
        const isPushable = canBoxBePushed(boxPositions[0], instruction, grid, width, toBePushed)
        if (isPushable) {
            newRobotPosition = boxPositions[0]
            toBePushed = Array.from(new Set([... toBePushed])).sort((a, b) => a - b)
            if (instruction === 'v') {
                toBePushed.reverse()
            }

            while (toBePushed.length) {
                const currCell = toBePushed.shift()
                const newPos = getNeighboringCell(currCell, DIRECTIONS[instruction], grid, width)
                grid[newPos] = grid[currCell]
                grid[currCell] = '.'
            }

            grid[newRobotPosition] = '@'
            grid[robot] = '.'
        }
    }

    return newRobotPosition
}

const canBoxBePushed = (boxPosition, instruction, grid, width, toBePushed = []) => {
    if (grid[boxPosition] === '#') {
        return false
    }
    if (grid[boxPosition] === '.') {
        return true
    }

    const box = [boxPosition]
    if (grid[boxPosition] === '[') {
        box.push(boxPosition + 1)
    } else if (grid[boxPosition] === ']') {
        box.unshift(boxPosition - 1)
    }
    toBePushed.push(... box)
    const nextPositions = box.map(nextPosition => getNeighboringCell(nextPosition, DIRECTIONS[instruction], grid, width))
    return nextPositions.every(nextPosition => canBoxBePushed(nextPosition, instruction, grid, width, toBePushed))
}

const pushBox = (robot, boxPosition, instruction, grid, width) => {
    const nextPosition = getNeighboringCell(boxPosition, DIRECTIONS[instruction], grid, width)
    const nextCell = grid[nextPosition]

    let newRobotPosition = robot
    switch (nextCell) {
        case '#':
            // do nothing
            break;
        case '.':
            grid[nextPosition] = 'O'
            newRobotPosition = boxPosition
            grid[newRobotPosition] = '@'
            grid[robot] = '.'
            break;
        case 'O':
            let boxes = [nextPosition]
            let otherCell = getNeighboringCell(nextPosition, DIRECTIONS[instruction], grid, width)
            while (grid[otherCell] == 'O') {
                boxes.push(otherCell)
                otherCell = getNeighboringCell(otherCell, DIRECTIONS[instruction], grid, width)
            }
            if (grid[otherCell] === '.') {
                boxes.push(otherCell)
                newRobotPosition = boxPosition
                while (boxes.length) {
                    grid[boxes.shift()] = 'O'
                }
                grid[robot] = '.'
                grid[newRobotPosition] = '@'
            }
            break;
    }

    return newRobotPosition
}

const part1 = input => {
    const {grid, width, instructions} = preProcessing(input)
    let robot = grid.indexOf('@')
    while (instructions.length) {
        const instruction = instructions.shift()
        robot = move(robot, instruction, grid, width)
    }
    let tally = 0
    grid.forEach((element, index) => {
        if (element === 'O') {
            const row = Math.floor(index / width)
            const col = index % width

            tally += (row * 100) + col
        }
    })
    return tally
}

// Part 2
// ======

const part2 = input => {
    let {grid, width, instructions} = preProcessing(input)
    const {expandedGrid, expandedWidth} = expandGrid(grid, width)
    
    let robot = expandedGrid.indexOf('@')
    while (instructions.length) {
        const instruction = instructions.shift()
        robot = move(robot, instruction, expandedGrid, expandedWidth)
    }
    let tally = 0
    expandedGrid.forEach((element, index) => {
        if (element === '[') {
            const row = Math.floor(index / expandedWidth)
            const col = index % expandedWidth

            tally += (row * 100) + col
        }
    })
    return tally
}

module.exports = { part1, part2 }
