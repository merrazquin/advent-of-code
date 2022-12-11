'use strict'

// Setup
const preprocessing = (input) => {
    let x = 1
    let cycles = []
    input.trim().split('\n').forEach(instruction => {
        const [operation, value] = instruction.split(' ')
        cycles.push(x)
        if (operation === 'addx') {
            x += parseInt(value)
            cycles.push(x)
        }
    })
    return cycles
}

const preprocessingP2 = (input) => {
    let rowPrintout = ''
    let printout = ''
    let spritePosition = 1
    let cycle = 1
    let pixel

    input.trim().split('\n').forEach(instruction => {
        const [operation, value] = instruction.split(' ')
        pixel = Math.abs(spritePosition - (cycle - 1)) <= 1 ? '#' : '.'
        rowPrintout += pixel
        if (rowPrintout.length === 40) {
            printout += rowPrintout + '\n'
            rowPrintout = ''
            cycle = 0
        }

        if (operation === 'addx') {
            cycle++
            pixel = Math.abs(spritePosition - (cycle - 1)) <= 1 ? '#' : '.'
            rowPrintout += pixel
            if (rowPrintout.length === 40) {
                printout += rowPrintout + '\n'
                rowPrintout = ''
                cycle = 0
            }
            spritePosition += parseInt(value)
        }
        cycle++
    })
    return printout
}

/*
Sprite position: ###.....................................

Start cycle   1: begin executing addx 15
During cycle  1: CRT draws pixel in position 0
Current CRT row: #

During cycle  2: CRT draws pixel in position 1
Current CRT row: ##
End of cycle  2: finish executing addx 15 (Register X is now 16)
Sprite position: ...............###......................

Start cycle   3: begin executing addx -11
During cycle  3: CRT draws pixel in position 2
Current CRT row: ##.

During cycle  4: CRT draws pixel in position 3
Current CRT row: ##..
End of cycle  4: finish executing addx -11 (Register X is now 5)
Sprite position: ....###.................................

...

Start cycle  19: begin executing noop
During cycle 19: CRT draws pixel in position 18
Current CRT row: ##..##..##..##..##.
End of cycle 19: finish executing noop

Start cycle  20: begin executing addx -1
During cycle 20: CRT draws pixel in position 19
Current CRT row: ##..##..##..##..##..

During cycle 21: CRT draws pixel in position 20
Current CRT row: ##..##..##..##..##..#
End of cycle 21: finish executing addx -1 (Register X is now 20)
Sprite position: ...................###..................
*/

// Part 1
// ======

const part1 = input => {
    const data = preprocessing(input)
    let signalStrengthSum = 0
    const cycleChecks = [20, 60, 100, 140, 180, 220]
    cycleChecks.forEach(cycle => {
        const signalStrength = (cycle * data[cycle - 2])
        signalStrengthSum += signalStrength
    })
    return signalStrengthSum
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessingP2(input)
    console.log(data)
    return data
}

module.exports = { part1, part2 }
