'use strict'

// Setup
const keyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const verticalOffset = 3
const horizontalOffset = 1
const startingPoint = 5

const actualKeyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D']
const moves = {
    'U': {2: 0, 5: 1, 6: 2, 7: 3, 9: 5, 10: 6, 11: 7, 12: 10},
    'D': {0: 2, 1: 5, 2: 6, 3: 7, 5: 9, 6: 10, 7: 11, 10: 12},
    'L': {2: 1, 3: 2, 5: 4, 6: 5, 7: 6, 8: 7, 10: 9, 11: 10},
    'R': {1: 2, 2: 3, 4: 5, 5: 6, 6: 7, 7: 8, 9: 10, 10: 11}
}

// Part 1
// ======

const part1 = input => {
    let currentIndex = keyPad.indexOf(startingPoint)
    let newIndex
    let code = []
    input.trim().split('\n')
        .forEach(instruction => {
            instruction.split('')
                .forEach(step => {
                    newIndex = -1
                    switch (step) {
                    case 'U':
                        if (currentIndex > 2) {
                            newIndex = currentIndex - verticalOffset
                        }
                        break
                    case 'D':
                        if (currentIndex < 6) {
                            newIndex = currentIndex + verticalOffset
                        }
                        break
                    case 'L':
                        if (currentIndex % 3 != 0) {
                            newIndex = currentIndex - horizontalOffset
                        }
                        break
                    case 'R':
                        if (currentIndex != 2 && currentIndex != 5) {
                            newIndex = currentIndex + horizontalOffset
                        }
                        break
                    }
                    if (newIndex >= 0 && newIndex < keyPad.length) {
                        currentIndex = newIndex
                    }

                })

            code.push(keyPad[currentIndex])
        })
    return code.join('')
}

// Part 2
// ======

const part2 = input => {
    let currentIndex = keyPad.indexOf(startingPoint)
    let newIndex
    let code = []
    input.trim().split('\n')
        .forEach(instruction => {
            instruction.split('')
                .forEach(step => {
                    newIndex = moves[step][currentIndex]
                    if (newIndex != undefined) {
                        currentIndex = newIndex
                    }
                })
            code.push(actualKeyPad[currentIndex])
        })
    return code.join('')
}

module.exports = { part1, part2 }
