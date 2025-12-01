'use strict'

// Setup
const max = 99
const preProcessing = input => input.trim().split('\n').map(el => {
    const [dir, val] = [el.slice(0, 1), parseInt(el.slice(1))]
    return {dir: dir == 'L' ? -1 : 1, val}
})

// Part 1
// ======

const part1 = input => {
    let currNum = 50
    const instructions = preProcessing(input)

    let tally = 0
    instructions.forEach(({dir, val}) => {
        if (val > max) {
            val %= (max + 1)
        }
        currNum += (dir * val)
        if (currNum > max) {
            currNum -= (max + 1)
        }
        if (currNum < 0) {
            currNum += (max + 1)
        }

        if (currNum === 0) {
            tally++
        }
    })

    return tally
}

// Part 2
// ======
const part2 = input => {
    let currNum = 50
    const instructions = preProcessing(input)
    let tally = 0
    instructions.forEach(({dir, val}) => {
        const fullRev = Math.floor(val / (max + 1))
        const remainder = val % (max + 1)
        tally += fullRev
        let newNum = currNum + (dir * remainder)

        if (currNum + (remainder * dir) === 0) {
            tally++
        } else if (dir < 0 && currNum !== 0 && currNum + (remainder * dir) < 0) {
            tally++
        } else if (dir > 0 && currNum !== 0 && (remainder + currNum) > max) {
            tally++
        }
        if (newNum > max) {
            newNum -= (max + 1)
        }
        if (newNum < 0) {
            newNum += (max + 1)
        }
        currNum = newNum

    })
    return tally
}

module.exports = { part1, part2 }