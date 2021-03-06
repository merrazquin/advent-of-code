'use strict'

const TreeModel = require('tree-model')
const tree = new TreeModel()

/**
 * Converts data in the form of: 
 * {
 *   light_red: { bright_white: 1, muted_yellow: 2 },
 *   dark_orange: { bright_white: 3, muted_yellow: 4 },
 *   bright_white: { shiny_gold: 1 },
 *   muted_yellow: { shiny_gold: 2, faded_blue: 9 },
 *   shiny_gold: { dark_olive: 1, vibrant_plum: 2 },
 *   dark_olive: { faded_blue: 3, dotted_black: 4 },
 *   vibrant_plum: { faded_blue: 5, dotted_black: 6 },
 *   faded_blue: 0,
 *   dotted_black: 0
 * }
 * into a tree
 * @param {*} data 
 * @param {*} parentNode - node's parent
 * @param {string} name - node label
 * @param {Number} count - number of times this node should be added to parents
 */
const parseTree = (data, parentNode, name, count) => {
    let node
    for (var i = 0; i < count; i++) {
        node = tree.parse({ name, count, children: [] })
        const children = data[name]
        if (children) {
            for (const child in children) {
                parseTree(data, node, child, children[child])
            }
        }

        // Add this child to all instances of its parent type
        parentNode.all(foundParentNode => foundParentNode.model.name === parentNode.model.name)
            .forEach(foundParentNode => foundParentNode.addChild(node))
    }
    return node
}

/**
 * Vector difference
 * @param {{x:Number, y:Number}} pointA 
 * @param {{x:Number, y:Number}} pointB 
 * @returns {{x:Number, y:Number}} pointB - pointA
 */
const vectorDifference = (pointA, pointB) => {
    return {
        x: pointB.x - pointA.x,
        y: pointB.y - pointA.y
    }
}

/**
 * Rotates `point` around `axis` `degrees` counter-clockwise (in 90-degree increments)
 * Assumes "north" is negative
 * @param {{x: Number, y:Number}}  point 
 * @param {{x: Number, y:Number}}  axis 
 * @param {Number} degrees 
 * @returns {{x: Number, y:Number}} rotated point
 */
const rotatePointAroundAxisCounterClockwise = (point, axis, degrees) => {
    if (degrees % 90 != 0) {
        throw new Error(`${degrees} must be a multiple of 90`)
    }
    let offsets = vectorDifference(axis, point)
    let rotated = offsets
    while (degrees > 0) {
        rotated = {
            x: offsets.y,
            y: offsets.x * -1
        }
        offsets = rotated
        degrees -= 90
    }
    const newPoint = {
        x: axis.x + rotated.x,
        y: axis.y + rotated.y
    }
    return newPoint
}

/**
 * Rotates `point` around `axis` `degrees` clockwise (in 90-degree increments)
 * Assumes "north" is negative
 * @param {{x: Number, y:Number}}  point 
 * @param {{x: Number, y:Number}}  axis 
 * @param {Number} degrees 
 * @returns {{x: Number, y:Number}} rotated point
 */
const rotatePointAroundAxisClockwise = (point, axis, degrees) => {
    if (degrees % 90 != 0) {
        throw new Error(`${degrees} must be a multiple of 90`)
    }
    let offsets = vectorDifference(axis, point)
    let rotated = offsets
    while (degrees > 0) {
        rotated = {
            x: offsets.y * -1,
            y: offsets.x
        }
        offsets = rotated
        degrees -= 90
    }
    const newPoint = {
        x: rotated.x + axis.x,
        y: rotated.y + axis.y
    }
    return newPoint
}

const cardinalDirections = {
    E: 0,
    S: 1,
    W: 2,
    N: 3
}

const getCardinalDirection = direction => Object.keys(cardinalDirections).find(key => cardinalDirections[key] === direction)

/**
 * Rotate `direction` by `units` 
 * @param {string} direction (N, S, E, W)
 * @param {Number} units integer
 */
const cardinalRotate = (direction, units) => {
    if (parseInt(units) !== units) {
        throw new Error(`Expected integer for 'units', ${units} provided`)
    }
    const dirVal = cardinalDirections[direction]
    if (dirVal == undefined) {
        throw new Error(`Expected N, S, E, or W for 'direction', ${direction} provided`)
    }

    let newInd = (dirVal + units) % 4
    if (newInd < 0) {
        newInd += 4
    }

    return getCardinalDirection(newInd)
}

/**
 * Rotate `direction` left by `units` (counter-clockwise)
 * @param {string} direction (N, S, E, W)
 * @param {Number} units integer
 */
const cardinalRotateLeft = (direction, units) => {
    return cardinalRotate(direction, units * -1)
}
/**
 * Rotate `direction` right by `units` (clockwise)
 * @param {string} direction (N, S, E, W)
 * @param {Number} units integer
 */
const cardinalRotateRight = (direction, units) => {
    return cardinalRotate(direction, units)
}

/**
 * Move a point `paces` in `direction`
 * @param {{x:Number, y:Number}} origin 
 * @param {string} direction (N, S, E, W)
 * @param {Number} paces 
 */
const cardinalMove = (origin, direction, paces) => {
    let { x, y } = origin
    switch (direction) {
    case 'E':
        x += paces
        break
    case 'W':
        x -= paces
        break
    case 'N':
        y -= paces
        break
    case 'S':
        y += paces
        break
    }
    return { x, y }
}

/**
 * Greatest common denominator
 * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
 * @param {Number} x 
 * @param {Number} y 
 */
const gcd = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number')) {
        throw new Error(`Expected numbers, '${x}' and '${y}' provided`)
    }

    x = Math.abs(x)
    y = Math.abs(y)
    while (y) {
        const tempSwap = y
        y = x % y
        x = tempSwap
    }
    return x
}

/**
 * Least common multiple
 * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
 * @param {Number} x 
 * @param {Number} y 
 */
const lcm = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number')) {
        throw new Error(`Expected numbers, '${x}' and '${y}' provided`)
    }
    return (x * y) / gcd(x, y)
}

/**
 * Get all permutations of a string if a single character were to change
 * @param {string} baseString 
 * @param {Number} position position at which to start permutations
 * @param {[*]} options array of characters with which to fill character at position
 */
const getPermutations = (baseString, index, options) => {
    const permutation = baseString.split('')
    const permutations = []
    options.forEach(option => {
        permutation[index] = option.toString()
        permutations.push(permutation.join(''))
    })
    return permutations
}

/**
 * Get all permutations of a string if each instance of `char` were to change
 * @param {string} baseString 
 * @param {string} char character in string which should be the point of permutations
 * @param {[*]} options array of characters with which to fill character at position
 */
const getAllPermutations = (baseString, char, options) => {
    let addresses = [baseString]
    let currIndex = addresses.findIndex(mask => mask.indexOf(char) != -1)
    while (currIndex != -1) {
        let newPerms = getPermutations(addresses[currIndex], addresses[currIndex].indexOf(char), options)
        addresses.splice(currIndex, 1)
        if (newPerms.length) {
            addresses.push(...newPerms)
        }
        currIndex = addresses.findIndex(mask => mask.indexOf(char) != -1)
    }
    return addresses
}

/**
 * Add up all values of an array or object
 * @param {*} collection 
 */
const sumAll = collection => {
    if (typeof collection !== 'object') {
        throw new Error(`Expected object, ${typeof collection} provided`)
    }
    let array = collection
    if (!Object.hasOwnProperty.call(collection, 'length')) {
        // not an array, try to get the values
        array = Object.values(collection)
    }

    if (array.some((val) => isNaN(val))) {
        throw new Error('Expected numeric data')
    }
    return array.reduce((sum, val) => sum + val, 0)
}

/**
 * Multiply all items in array or object
 * @param {*} collection 
 */
const multiplyAll = collection => {
    if (typeof collection !== 'object') {
        throw new Error(`Expected object, ${typeof collection} provided`)
    }
    let array = collection
    if (!Object.hasOwnProperty.call(collection, 'length')) {
        // not an array, try to get the values
        array = Object.values(collection)
    }

    if (array.some((val) => isNaN(val))) {
        throw new Error('Expected numeric data')
    }

    if (!array.length) {
        return 0
    }
    
    return array.reduce((sum, val) => sum * val, 1)
}

const removePossibilityFromAllKeysExcept = (possibility, possibilitiesMap, exceptKey) => {
    const updatedPossibilitiesMap = {}
    for (let key in possibilitiesMap) {
        let possibilities = possibilitiesMap[key]
        if (key != exceptKey && typeof possibilities == 'object') {
            const index = possibilities.indexOf(possibility)
            if (index != -1) {
                possibilities.splice(index, 1)
            }
        }
        updatedPossibilitiesMap[key] = possibilities
    }
    return updatedPossibilitiesMap
}

/**
 * Pass in a mapping of keys with their possible values
 * get back a mapping of keys/value pairs
 * @param {{}} puzzle 
 */
const solveLogicPuzzle = puzzle => {
    let breakout = false
    let previousHash = JSON.stringify(puzzle)
    while (!breakout) {
        breakout = true
        for (let key in puzzle) {
            const possibleValues = puzzle[key]
            if ((typeof possibleValues == 'object') && possibleValues.length == 1) {
                puzzle = removePossibilityFromAllKeysExcept(possibleValues[0], puzzle, key)
                puzzle[key] = possibleValues[0]
            } else if (typeof possibleValues == 'object') {
                breakout = false
            }
        }
        let currentHash = JSON.stringify(puzzle)
        if (previousHash == currentHash) {
            breakout = true
        }
        previousHash = currentHash
    }

    return puzzle
}

const getNeighboringCell = (i, direction, cells, width) => {
    // horizontal offset is 1, BUT
    // left edge modulo width = 0
    // right edge modulo width = width - 1
    // declining diagonal offset is width + 1
    // inclinng diagonal offset is width - 1
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
        if (i % width < width - 1 && i < cells.length - width) {
            cell = i + (width + 1)
        }
        break
    case 'S':
        if (i < cells.length - width) {
            cell = i + width
        }
        break
    case 'SW':
        if (i % width > 0 && i <= cells.length - width) {
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
const findNeighbors = (i, cells, width) => {
    const neighbors = []
    let neighbor
    ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W'].forEach(direction => {
        neighbor = ''
        let cell = getNeighboringCell(i, direction, cells, width)
        if (cell != -1) {
            neighbor = cells[cell]
        }
        neighbors.push(neighbor)
    })

    return neighbors
}

module.exports = { 
    sumAll, multiplyAll,
    parseTree,
    rotatePointAroundAxisCounterClockwise, rotatePointAroundAxisClockwise,
    cardinalRotateLeft, cardinalRotateRight, cardinalMove,
    lcm, gcd,
    getPermutations, getAllPermutations,
    solveLogicPuzzle,
    getNeighboringCell, findNeighbors
}
