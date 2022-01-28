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
    for (let i = 0; i < count; i++) {
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
 * Finds all divisors of n
 * @param {Number} n 
 */
const findAllDivisors = n => {
    const divisors = new Set()
    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % i == 0) {
            divisors.add(i)
            if (n / i != i) {
                divisors.add(n / i)
            }
        }
    }
    return [...divisors].sort((a, b) => a - b)
}

const getAllPermutations = (options, l, r, permutations) => {
    if (l == r) {
        permutations.push(options.join('_'))
    } else {
        for (let i = 1; i <= r; i++) {
            let temp = options[i]
            options[i] = options[l]
            options[l] = temp

            getAllPermutations(options, l + 1, r, permutations)

            temp = options[i]
            options[i] = options[l]
            options[l] = temp
        }
    }

}

/**
 * Get all permutations of a string if a single character were to change
 * @param {string} baseString 
 * @param {Number} position position at which to start permutations
 * @param {[*]} options array of strings with which to fill character at position
 */
const getTokenizedPermutations = (baseString, index, options) => {
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
 * @param {string} token character in string which should be the point of permutations
 * @param {[*]} options array of characters with which to fill character at position
 */
const getAllTokenizedPermutations = (baseString, token, options) => {
    let permutations = [baseString]
    let currIndex = permutations.findIndex(mask => mask.indexOf(token) != -1)
    while (currIndex != -1) {
        let newPerms = getTokenizedPermutations(permutations[currIndex], permutations[currIndex].indexOf(token), options)
        permutations.splice(currIndex, 1)
        if (newPerms.length) {
            permutations.push(...newPerms)
        }
        currIndex = permutations.findIndex(mask => mask.indexOf(token) != -1)
    }
    return permutations
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
 * Populates combinations array with diffent subsets which sum to target
 * @param {[]} numbers 
 * @param {Number} target 
 * @param {[]} combinations 
 * @param {[]} partial 
 */
const subsetSum = (numbers, target, combinations, partial = []) => {
    let currentSum = sumAll(partial)

    if (currentSum === target) {
        combinations.push(partial)
    }
    
    if (currentSum >= target) {
        return
    }

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i]
        const remaining = numbers.slice(i + 1)
        subsetSum(remaining, target, combinations, partial.concat(n))
    }
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

/**
 * Populates combinations array with diffent subsets which multiply to target
 * @param {[]} numbers 
 * @param {Number} target 
 * @param {[]} combinations 
 * @param {[]} partial 
 */
const subsetProduct = (numbers, target, combinations, partial = []) => {
    let currentProduct = multiplyAll(partial)

    if (currentProduct === target) {
        combinations.push(partial)
    }
    
    if (currentProduct >= target) {
        return
    }

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i]
        const remaining = numbers.slice(i + 1)
        subsetSum(remaining, target, combinations, partial.concat(n))
    }
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
    // incling diagonal offset is width - 1
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
const findNeighbors = (index, cells, width, includeDiagonal = true, useIndex = false, includeSelf = false, defaultChar = '') => {
    const neighbors = []
    let neighbor
    const possibleNeighbors = includeDiagonal ? ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'] : ['N', 'E', 'S', 'W']
    possibleNeighbors.forEach((direction, n) => {
        neighbor = defaultChar
        let cell = getNeighboringCell(index, direction, cells, width)
        if (cell != -1) {
            neighbor = useIndex ? cell : cells[cell]
        }
        neighbors.push(neighbor)

        if (includeSelf && n == (possibleNeighbors.length / 2) - 1) {
            neighbors.push(cells[index])
        }
    })

    return neighbors
}

/**
 * Transposes an array such that ['abc', 'def', 'ghi']
 * becomes [['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i']]
 * @param {[]} rows 
 * @returns an array of columns
 */
const convertRowsToCols = rows => {
    const len = rows[0].length
    const cols = new Array(len).fill('').map(() => [])
    rows.forEach(row => {
        if (typeof row  == 'string') {
            row = row.split('')
        }
        row.forEach((col, index) => {
            cols[index].push(col)
        })
    })
    return cols
}

/**
 * @see https://www.cuemath.com/sum-of-integers-formula/
 * @param {Number} first 
 * @param {Number} last 
 * @returns sum of all integers betweeen first & last, inclusive
 */
const sumOfIntegers = (first, last) => {
    const n = last - first + 1
    return n * (first + last) / 2
}

/*
javascript-astar 0.4.1
http://github.com/bgrins/javascript-astar
Freely distributable under the MIT License.
Implements the astar search algorithm in javascript using a Binary Heap.
Includes Binary Heap (with modifications) from Marijn Haverbeke.
http://eloquentjavascript.net/appendix2.html
*/
const pathTo = node => {
    let curr = node
    let path = []
    while (curr.parent) {
        path.unshift(curr)
        curr = curr.parent
    }
    return path    
}

const getHeap = () => {
    return new BinaryHeap(node => node.f)
}

const astar = {
    /**
    * Perform an A* Search on a graph given a start and end node.
    * @param {Graph} graph
    * @param {GridNode} start
    * @param {GridNode} end
    * @param {Object} [options]
    * @param {bool} [options.closest] Specifies whether to return the
               path to the closest node if the target is unreachable.
    * @param {Function} [options.heuristic] Heuristic function (see
    *          astar.heuristics).
    */
    search: function(graph, start, end, options) {
        graph.cleanDirty()
        options = options || {}
        const heuristic = options.heuristic || astar.heuristics.manhattan
        const closest = options.closest || false
  
        let openHeap = getHeap()
        let closestNode = start // set the start node to be the closest if required
  
        start.h = heuristic(start, end)
        graph.markDirty(start)
  
        openHeap.push(start)
  
        while (openHeap.size() > 0) {
  
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            const currentNode = openHeap.pop()
  
            // End case -- result has been found, return the traced path.
            if (currentNode === end) {
                return pathTo(currentNode)
            }
  
            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true
  
            // Find all neighbors for the current node.
            const neighbors = graph.neighbors(currentNode)
  
            for (let i = 0, il = neighbors.length; i < il; ++i) {
                const neighbor = neighbors[i]
  
                if (neighbor.closed || neighbor.isWall()) {
                    // Not a valid node to process, skip to next neighbor.
                    continue
                }
  
                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                const gScore = currentNode.g + neighbor.getCost(currentNode)
                const beenVisited = neighbor.visited
  
                if (!beenVisited || gScore < neighbor.g) {
  
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true
                    neighbor.parent = currentNode
                    neighbor.h = neighbor.h || heuristic(neighbor, end)
                    neighbor.g = gScore
                    neighbor.f = neighbor.g + neighbor.h
                    graph.markDirty(neighbor)
                    if (closest) {
                        // If the neighbour is closer than the current closestNode or if it's equally close but has
                        // a cheaper path than the current closest node then it becomes the closest node
                        if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                            closestNode = neighbor
                        }
                    }
  
                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor)
                    } else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor)
                    }
                }
            }
        }
  
        if (closest) {
            return pathTo(closestNode)
        }
  
        // No result was found - empty array signifies failure to find path.
        return []
    },
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    heuristics: {
        manhattan: function(pos0, pos1) {
            const d1 = Math.abs(pos1.x - pos0.x)
            const d2 = Math.abs(pos1.y - pos0.y)
            return d1 + d2
        },
        diagonal: function(pos0, pos1) {
            const D = 1
            const D2 = Math.sqrt(2)
            const d1 = Math.abs(pos1.x - pos0.x)
            const d2 = Math.abs(pos1.y - pos0.y)
            return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2))
        }
    },
    cleanNode: function(node) {
        node.f = 0
        node.g = 0
        node.h = 0
        node.visited = false
        node.closed = false
        node.parent = null
    }
}

/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 */
class Graph {
    constructor(gridIn, options) {
        options = options || {}
        this.nodes = []
        this.diagonal = !!options.diagonal
        this.grid = []
        for (let x = 0; x < gridIn.length; x++) {
            this.grid[x] = []
    
            for (let y = 0, row = gridIn[x]; y < row.length; y++) {
                const node = new GridNode(x, y, row[y])
                this.grid[x][y] = node
                this.nodes.push(node)
            }
        }
        this.init()
    }
  
    init() {
        this.dirtyNodes = []
        for (let i = 0; i < this.nodes.length; i++) {
            astar.cleanNode(this.nodes[i])
        }
    }
    
    cleanDirty() {
        for (let i = 0; i < this.dirtyNodes.length; i++) {
            astar.cleanNode(this.dirtyNodes[i])
        }
        this.dirtyNodes = []
    }
    
    markDirty(node) {
        this.dirtyNodes.push(node)
    }
    
    neighbors(node) {
        const ret = []
        const x = node.x
        const y = node.y
        const grid = this.grid
    
        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y])
        }
    
        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y])
        }
    
        // South
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1])
        }
    
        // North
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1])
        }
    
        if (this.diagonal) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1])
            }
    
            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1])
            }
    
            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1])
            }
    
            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1])
            }
        }
    
        return ret
    }
    
    toString() {
        const graphString = []
        const nodes = this.grid
        for (var x = 0; x < nodes.length; x++) {
            const rowDebug = []
            const row = nodes[x]
            for (let y = 0; y < row.length; y++) {
                rowDebug.push(row[y].weight)
            }
            graphString.push(rowDebug.join(' '))
        }
        return graphString.join('\n')
    }
}
  
class GridNode {
    constructor (x, y, weight) {
        this.x = x
        this.y = y
        this.weight = weight
    }
  
    toString() {
        return '[' + this.x + ' ' + this.y + '] ' + this.isWall()
    }
    
    getCost(fromNeighbor) {
        // Take diagonal weight into consideration.
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * 1.41421
        }
        return this.weight
    }
    
    isWall() {
        return this.weight === 0
    }
}
  
class BinaryHeap {
    constructor (scoreFunction) {
        this.content = []
        this.scoreFunction = scoreFunction
    }

    push(element) {
        // Add the new element to the end of the array.
        this.content.push(element)
  
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1)
    }
    
    pop() {
        // Store the first element so we can return it later.
        var result = this.content[0]
        // Get the element at the end of the array.
        var end = this.content.pop()
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end
            this.bubbleUp(0)
        }
        return result
    }

    remove(node) {
        let i = this.content.indexOf(node)
  
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        const end = this.content.pop()
  
        if (i !== this.content.length - 1) {
            this.content[i] = end
  
            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i)
            } else {
                this.bubbleUp(i)
            }
        }
    }
    
    size() {
        return this.content.length
    }
    
    rescoreElement(node) {
        this.sinkDown(this.content.indexOf(node))
    }
    
    sinkDown(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n]
  
        // When at 0, an element can not sink any further.
        while (n > 0) {
  
            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1
            var parent = this.content[parentN]
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element
                this.content[n] = parent
                // Update 'n' to continue at the new position.
                n = parentN
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break
            }
        }
    }
    
    bubbleUp(n) {
        // Look up the target element and its score.
        var length = this.content.length
        var element = this.content[n]
        var elemScore = this.scoreFunction(element)
        let done = false
  
        while (!done) {
        // Compute the indices of the child elements.
            var child2N = (n + 1) << 1
            var child1N = child2N - 1
            // This is used to store the new position of the element, if any.
            var swap = null
            var child1Score
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N]
                child1Score = this.scoreFunction(child1)
  
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N
                }
            }
  
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N]
                var child2Score = this.scoreFunction(child2)
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N
                }
            }
  
            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap]
                this.content[swap] = element
                n = swap
            }
            // Otherwise, we are done.
            else {
                done = true
            }
        }
    }
}

const chunk = (collection, length) => {
    if (typeof collection === 'object') {
        collection = collection.join('')
    }
    return collection.match(new RegExp('.{1,' + length + '}', 'g'))
}

/**
 * Takes a flat array of grid nodes and prints it out as rows of given width 
 * @param {[]} gridNodes 
 * @param {number} width 
 * @param {number} padding 
 * @param {string} label 
 */
const debugGrid = (gridNodes, width, padding = 1, label = '') => {
    if (!width) {
        throw new Error('Width is required')
    }
    if (label) console.log(label)
    let gridOutput = gridNodes.slice()
    while (gridOutput.length) {
        console.log(gridOutput.splice(0, width).map(num => num.toString().padStart(padding, ' ')).join(''))
    }
    console.log('\n')
}

module.exports = { 
    sumAll, multiplyAll, subsetSum, subsetProduct,
    parseTree,
    rotatePointAroundAxisCounterClockwise, rotatePointAroundAxisClockwise,
    cardinalRotateLeft, cardinalRotateRight, cardinalMove,
    lcm, gcd, findAllDivisors,
    getAllPermutations,
    getTokenizedPermutations, getAllTokenizedPermutations,
    solveLogicPuzzle,
    getNeighboringCell, findNeighbors,
    convertRowsToCols,
    sumOfIntegers,
    Graph, astar, GridNode,
    chunk,
    debugGrid
}
