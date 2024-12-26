'use strict'

// Setup
const preProcessing = input => input.split('\n')
const numberPad = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10
}
const dPad = {
    up: 0,
    A: 1,
    left: 2,
    down: 3,
    right: 4
}

const createNumpad = () => {
    const numpadNumVertices = 11
    const numpadEdges = [
        [7, 8], [7, 4], [8, 9], [8, 5], [9, 6],
        [4, 5], [4, 1], [5, 6], [5, 2], [6, 3],
        [1, 2], [2, 3], [2, 0], [3, 10],
        [0, 10]
    ]
    const numpadGraph = Array.from({length: numpadNumVertices}, () => [])
    for (const edge of numpadEdges) {
        numpadGraph[edge[0]].push(edge[1])
        numpadGraph[edge[1]].push(edge[0])
    }
    return numpadGraph
}

const createDirectionalPad = () => {
    const directionalPadVertices = 5
    const directionalPadEdges = [
        [dPad.up, dPad.A], [dPad.up, dPad.down], [dPad.A, dPad.right],
        [dPad.left, dPad.down], [dPad.down, dPad.right]
    ]
    const directionalPadGraph = Array.from({length: directionalPadVertices}, () => [])
    for (const edge of directionalPadEdges) {
        directionalPadGraph[edge[0]].push(edge[1])
        directionalPadGraph[edge[1]].push(edge[0])
    }
    return directionalPadGraph
}

// map dpad to numpad
const numPadDirections = {
    7: {8: dPad.right, 4: dPad.down},
    8: {7: dPad.left, 5: dPad.down, 9: dPad.right},
    9: {8: dPad.left, 6: dPad.down},
    4: {5: dPad.right, 1: dPad.down, 7: dPad.up},
    5: {4: dPad.left, 2: dPad.down, 6: dPad.right, 8: dPad.up},
    6: {5: dPad.left, 3: dPad.down, 9: dPad.up},
    1: {2: dPad.right, 4: dPad.up},
    2: {1: dPad.left, 0: dPad.down, 3: dPad.right, 5: dPad.up},
    3: {2: dPad.left, 10: dPad.down, 6: dPad.up},
    0: {10: dPad.right, 2: dPad.up},
    10: {0: dPad.left, 3: dPad.up},
}

const conservativeDPadMovements = {
    [dPad.A]: {
        [dPad.up]: [dPad.A, dPad.up],
        [dPad.down]: [dPad.A, dPad.right, dPad.down],
        [dPad.left]: [dPad.A, dPad.right, dPad.down, dPad.left],
        [dPad.right]: [dPad.A, dPad.right]
    },
    [dPad.up]: {
        [dPad.A]: [dPad.up, dPad.A],
        [dPad.down]: [dPad.up, dPad.down],
        [dPad.left]: [dPad.up, dPad.down, dPad.left],
        [dPad.right]: [dPad.up, dPad.down, dPad.right]
    },
    [dPad.down]: {
        [dPad.A]: [dPad.down, dPad.right, dPad.A],
        [dPad.up]: [dPad.down, dPad.up],
        [dPad.left]: [dPad.down, dPad.left],
        [dPad.right]: [dPad.down, dPad.right]
    },
    [dPad.left]: {
        [dPad.A]: [dPad.left, dPad.down, dPad.right, dPad.A],
        [dPad.up]: [dPad.left, dPad.down, dPad.up],
        [dPad.down]: [dPad.left, dPad.down],
        [dPad.right]: [dPad.left, dPad.down, dPad.right]
    },
    [dPad.right]: {
        [dPad.A]: [dPad.right, dPad.A],
        [dPad.up]: [dPad.right, dPad.down, dPad.up],
        [dPad.down]: [dPad.right, dPad.down],
        [dPad.left]: [dPad.right, dPad.down, dPad.left]
    }
}

const conservativeNumberPadMovements = {
    0: {
        1: [0, 2, 1],
        2: [0, 2],
        3: [0, 2, 3],
        4: [0, 2, 5, 4],
        5: [0, 2, 5],
        6: [0, 2, 5, 6],
        7: [0, 2, 5, 8, 7],
        8: [0, 2, 5, 8],
        9: [0, 2, 5, 8, 9],
        [numberPad.A]: [0, numberPad.A]
    },
    1: {
        2: [1, 2],
        3: [1, 2, 3],
        4: [1, 4],
        5: [1, 4, 5],
        6: [1, 4, 5, 6],
        7: [1, 4, 7],
        8: [1, 4, 7, 8],
        9: [1, 4, 7, 8, 9],
        0: [1, 2, 0],
        [numberPad.A]: [1, 2, 3, numberPad.A]
    },
    2: {
        1: [2, 1],
        3: [2, 3],
        4: [2, 5, 4],
        5: [2, 5],
        6: [2, 5, 6],
        7: [2, 5, 8, 7],
        8: [2, 5, 8],
        9: [2, 5, 8, 9],
        0: [2, 0],
        [numberPad.A]: [2, 3, numberPad.A]
    },
    3: {
        1: [3, 2, 1],
        2: [3, 2],
        4: [3, 2, 1, 4],
        5: [3, 2, 5],
        6: [3, 3],
        7: [3, 2, 1, 4, 7],
        8: [3, 2, 5, 8],
        9: [3, 6, 9],
        0: [3, 2, 0],
        [numberPad.A]: [3, numberPad.A]
    },
    4: {
        1: [4, 1],
        2: [4, 1, 2],
        3: [4, 1, 2, 3],
        5: [4, 5],
        6: [4, 5, 6],
        7: [4, 7],
        8: [4, 7, 8],
        9: [4, 7, 8, 9],
        0: [4, 5, 2, 0],
        [numberPad.A]: [4, 5, 6, 3, numberPad.A]
    },
    5: {
        1: [5, 2, 1],
        2: [5, 2],
        3: [5, 2, 3],
        4: [5, 4],
        6: [5, 6],
        7: [5, 8, 7],
        8: [5, 8],
        9: [5, 8, 9],
        0: [5, 2, 0],
        [numberPad.A]: [5, 2, 0, numberPad.A]
    },
    6: {
        1: [6, 5, 4, 1],
        2: [6, 5, 2],
        3: [6, 3],
        4: [6, 5, 4],
        5: [6, 5],
        7: [6, 9, 8, 7],
        8: [6, 9, 8],
        9: [6, 9],
        0: [6, 5, 2, 0],
        [numberPad.A]: [6, 3, numberPad.A]
    },
    7: {
        1: [7, 4, 1],
        2: [7, 4, 1, 2],
        3: [7, 4, 1, 2, 3],
        4: [7, 4],
        5: [7, 4, 5],
        6: [7, 4, 5, 6],
        8: [7, 8],
        9: [7, 8, 9],
        0: [7, 8, 5, 2, 0],
        [numberPad.A]: [7,8, 9, 6, 3, numberPad.A]
    },
    8: {
        1: [8, 5, 2, 1],
        2: [8, 5, 2],
        3: [8, 5, 2, 3],
        4: [8, 5, 4],
        5: [8, 5],
        6: [8, 5, 6],
        7: [8, 7],
        9: [8, 9],
        0: [8, 5, 2, 0],
        [numberPad.A]: [8, 5, 2, 0, numberPad.A]
    },
    9: {
        1: [9, 6, 3, 2, 1],
        2: [9, 6, 3, 2],
        3: [9, 6, 3],
        4: [9, 8, 7, 4],
        5: [9, 8, 5],
        6: [9, 6],
        7: [9, 8, 7],
        8: [9, 8],
        0: [9, 8, 5, 2, 0],
        [numberPad.A]: [9, 6, 3, numberPad.A]
    },
    0: {
        1: [0, 2, 1],
        2: [0, 2],
        3: [0, 2, 3],
        4: [0, 2, 5, 4],
        5: [0, 2, 5],
        6: [0, 2, 5, 6],
        7: [0, 2, 5, 8, 7],
        8: [0, 2, 5, 8],
        9: [0, 2, 5, 8, 9],
        [numberPad.A]: [0, numberPad.A]
    },
    [numberPad.A]: {
        1: [numberPad.A, 3, 2, 1],
        2: [numberPad.A, 3, 2],
        3: [numberPad.A, 3],
        4: [numberPad.A, 3, 6, 5, 4],
        5: [numberPad.A, 3, 6, 5],
        6: [numberPad.A, 3, 6],
        7: [numberPad.A, 3, 6, 9, 8, 7],
        8: [numberPad.A, 3, 6, 9, 8],
        9: [numberPad.A, 3, 6, 9],
        0: [numberPad.A, 0],
    }
}

// map dpad to dpad
const dPadDirections = {
    [dPad.up]: {[dPad.A]: dPad.right, [dPad.down]: dPad.down},
    [dPad.A]: {[dPad.up]: dPad.left, [dPad.right]: dPad.down},
    [dPad.left]: {[dPad.down]: dPad.right},
    [dPad.down]: {[dPad.left]: dPad.left, [dPad.up]: dPad.up, [dPad.right]: dPad.right},
    [dPad.right]: {[dPad.down]: dPad.left, [dPad.A]: dPad.up}
}

const dpadConversion = {
    0: '^',
    1: 'A',
    2: '<',
    3: 'v',
    4: '>'
}
const convertToDpad = key => {
    return dpadConversion[key]
}
const convertToNumPad = key => {
    return key === 10 ? 'A' : key
}

// Part 1
// ======

const part1 = (input, numRobots = 2) => {
    const codes = preProcessing(input)

    // robot 1 starts at A on the numpad
    const mainRobot = {
        currentKey: numberPad.A,
        keysPressed: []
    }

    // robot 2 starts at A on a dpad
    const middleRobot = {
        currentKey: dPad.A,
        keysPressed: []
    }
    
    // I start at A on a dpad
    const me = {
        currentKey: dPad.A,
        keysPressed: []
    }

    let tally = 0
    codes.forEach(code => {
        me.currentKey = dPad.A
        me.keysPressed = []

        mainRobot.currentKey = numberPad.A
        mainRobot.keysPressed = []

        middleRobot.currentKey = dPad.A
        middleRobot.keysPressed = []

        const codeVal = parseInt(code)
        code = code.split('')

        // for each "next key" in code: 
        while (code.length) {
            let nextNumPadKey = numberPad[code.shift()]
            // how does robot 1 get to the next key?
            // for each node in the path, get the directional pad key from where the robot currently is
            if (mainRobot.currentKey !== nextNumPadKey) {
                let numPadPath = conservativeNumberPadMovements[mainRobot.currentKey][nextNumPadKey].slice()
                while(numPadPath.length) {
                    let npKey = numPadPath.shift() 
                    if (npKey !== mainRobot.currentKey) {
                        const direction = numPadDirections[mainRobot.currentKey][npKey]
                        mainRobot.keysPressed.push(direction)
                        mainRobot.currentKey = npKey
                    }
                }
            }
            mainRobot.keysPressed.push(dPad.A)
        }

        // for each key pressed by robot1, map robot2's path
        while (mainRobot.keysPressed.length) {
            let nextRobot1Key = mainRobot.keysPressed.shift()

            // how does robot 2 get to the next key?
            if (middleRobot.currentKey !== nextRobot1Key) {
                // let dPadPath = getShortestPath(directionalPad, robot2.currentKey, nextRobot1Key, directionalPadVertices)
                let dPadPath = conservativeDPadMovements[middleRobot.currentKey][nextRobot1Key].slice()
                // for each node in the path, get the directional pad key from where the robot currently is
                while(dPadPath.length) {
                    let dpKey = dPadPath.shift()
                    if (dpKey !== middleRobot.currentKey) {
                        const direction = dPadDirections[middleRobot.currentKey][dpKey]
                        middleRobot.keysPressed.push(direction)
                        middleRobot.currentKey = dpKey
                    }
                }
            }
            middleRobot.keysPressed.push(dPad.A)
        }

        // for each key pressed by robot2, map my path
        while (middleRobot.keysPressed.length) {
            let nextRobot2Key = middleRobot.keysPressed.shift()

            // how do I get to the next key?
            if (me.currentKey !== nextRobot2Key) {
                // let dPadPath = getShortestPath(directionalPad, me.currentKey, nextRobot2Key, directionalPadVertices)
                let dPadPath = conservativeDPadMovements[me.currentKey][nextRobot2Key].slice()
                // for each node in the path, get the directional pad key from where I am curently
                while(dPadPath.length) {
                    let dpKey = dPadPath.shift()
                    if (dpKey !== me.currentKey) {
                        const direction = dPadDirections[me.currentKey][dpKey]
                        me.keysPressed.push(direction)
                        me.currentKey = dpKey
                    }
                }
            }
            me.keysPressed.push(dPad.A)
        }
        tally += me.keysPressed.length * codeVal
    })
    return tally
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2 }