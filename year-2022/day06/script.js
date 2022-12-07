'use strict'


// Part 1
// ======

const part1 = input => {
    let index = 0
    let charsFound = 1;
    while (index < input.length) {
        const currChar = input.charAt(index++)
        const restOfPacket = input.substr(index, 4 - charsFound)

        if (restOfPacket.includes(currChar)) {
            charsFound = 1
        } else {
            charsFound++
            if(charsFound === 4) {
                return index + 1
            }
        }
    }
}

// Part 2
// ======

const part2 = (input) => {
    let index = 0
    let charsFound = 1;
    while (index < input.length) {
        const currChar = input.charAt(index++)
        const restOfPacket = input.substr(index, 14 - charsFound)

        if (restOfPacket.includes(currChar)) {
            charsFound = 1
        } else {
            charsFound++
            if(charsFound === 14) {
                return index + 1
            }
        }
    }
}

module.exports = { part1, part2 }
