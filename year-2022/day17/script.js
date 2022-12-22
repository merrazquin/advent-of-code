'use strict'

// backwards L has to be rotated due to flipping
const rocks =
    `####

.#.
###
.#.

###
#..
#..

#
#
#
#

##
##`.split('\n\n').map(rock => {
            return rock.split('\n').map(row => row.split('').map(pixel => (pixel == '#' ? 1 : 0)))
        })

// Setup
// chamber is upside down, so everythign is flipped
const preprocessing = (input) => input.trim().split('').map(move => move == '>' ? -1 : 1)
const checkForCollision = (chamber, rock, x, y) => {
    // overlay rock at current position on top of chamber
    // # & # collide 
    // # & . don't collide
    // . & . don't collide
    // bitwise and (&) will work nicely here
    let collision = false
    for (let rockRowIndex = 0; rockRowIndex < rock.length; rockRowIndex++) {
        if (chamber[y]) {
            // compare rock row with chamber row
            const rockRow = ('0'.repeat(x) + rock[rockRowIndex].join('')).padEnd(9, '0')
            //console.log(`comparing ${rockRow} to ${chamber[y].join('')}`)

            if (eval(`0b${rockRow}`) & eval(`0b${chamber[y].join('')}`)) {
                collision = true
                break
            }
        }
        y++
    }
    return collision
}
const settleRockAtPosition = (chamber, rock, x, y) => {
    for (let rockRowIndex = 0; rockRowIndex < rock.length; rockRowIndex++) {
        if (!chamber[y]) {
            chamber[y] = ('1' + ('0'.repeat(x - 1) + rock[rockRowIndex].join('')).padEnd(7, '0') + '1').split('')
            y++
            continue
        }
        const newRockRow = ('0'.repeat(x) + rock[rockRowIndex].join('')).padEnd(9, '0').split('')
        chamber[y] = (eval(`0b${newRockRow.join('')}`) | eval(`0b${chamber[y].join('')}`)).toString(2).split('')
        y++
    }
}
const dropRock = (rock, chamber, chamberWidth, moves, x, y) => {
    // grab the next move and push it back onto the array
    const move = moves.shift()
    moves.push(move)

    // move left or right
    if (!checkForCollision(chamber, rock, x + move, y)) {
        x += move
    }

    // move down
    if (checkForCollision(chamber, rock, x, y - 1)) {
        // bitwise or (|) will help us update the chamber with new rocks
        settleRockAtPosition(chamber, rock, x, y)
        const newHeight = getHeight(chamber)
        while (chamber.length <= newHeight + 4) {
            chamber.push(`1${'0'.repeat(7)}1`.split('').map(pixel => parseInt(pixel)))
        }
        return newHeight
    }

    y--
    return dropRock(rock, chamber, chamberWidth, moves, x, y)
}

const printChamber = chamber => {
    const flippedChamber = JSON.parse(JSON.stringify(chamber))
    flippedChamber.reverse().forEach((row, rowIndex) => {
        console.log(row.reverse().map((pixel, pixelIndex) => {
            if (rowIndex === chamber.length - 1) {
                return (pixelIndex > 0 && pixelIndex < row.length - 1) ? '-' : '+'
            }
            return (parseInt(pixel) ?
                ((pixelIndex > 0 && pixelIndex < row.length - 1) ? '#' : '|') :
                '.'
            )
        }).join(''))
    })
    console.log('\n')
}

const processRocks = (input, rockCount) => {
    const chamberWidth = 7
    
    // if we model the chamber upside down, then we gucci
    const chamber = ['1'.repeat(9).split('').map(pixel => parseInt(pixel)), `1${'0'.repeat(7)}1`.split('').map(pixel => parseInt(pixel)), `1${'0'.repeat(7)}1`.split('').map(pixel => parseInt(pixel)), `1${'0'.repeat(7)}1`.split('').map(pixel => parseInt(pixel)), `1${'0'.repeat(7)}1`.split('').map(pixel => parseInt(pixel))]
    const moves = preprocessing(input)

    let currentHeight = getHeight(chamber)
    while (rockCount--) {
        const rock = rocks.shift()
        rocks.push(rock)

        // left edge is two units away from the left wall
        let x = chamber[0].length - (3 + rock[0].length)

        // bottom edge is three units away from floor or highest point
        let y = currentHeight + 4

        currentHeight = Math.max(dropRock(rock, chamber, chamberWidth, moves, x, y), currentHeight)
    }

    return currentHeight
}

const getHeight = chamber => {
    let copy = chamber.slice()
    let currentRow = copy.pop()
    while (currentRow.join('') === '100000001') {
        currentRow = copy.pop()
    }
    return copy.length
}

// Part 1
// ======

const part1 = input => {
    return processRocks(input, 2022)
}

// Part 2
// ======

const part2 = input => {
    return processRocks(input, 1000000000000)
}

module.exports = { part1, part2, printChamber }
