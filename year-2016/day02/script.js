'use strict'

// Setup
const keyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const verticalOffset = 3
const horizontalOffset = 1
const startingPoint = 5

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
    return input
}

module.exports = { part1, part2 }
