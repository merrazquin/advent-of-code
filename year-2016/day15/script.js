'use strict'

class Disc {
    constructor (id, numPositions, initPosition) {
        this.id = parseInt(id)
        this.numPositions = parseInt(numPositions)
        this.initPosition = parseInt(initPosition)
        this.position = parseInt(initPosition)
    }
    reset(t = 0) {
        this.position = (this.initPosition + t) % this.numPositions
    }
    tick (t = 1) {
        this.position = (this.position + t + 1) % this.numPositions
    }
    ballCanPass() {
        return this.position === 0
    }
}
const getDiscs = discInput => {
    const discRegex = /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./
    return discInput.map(discInfo => {
        const [id, numPositions, initPosition] = discInfo.match(discRegex).slice(1)
        return new Disc(id, numPositions, initPosition)
    })
}
const findOptimalTime = discs => {
    let t = 0
    do {
        discs.forEach(disc => disc.reset(t))
        discs.forEach((disc, index) => disc.tick(index))
        if (discs.every(disc => disc.ballCanPass())) {
            return t
        }
        t++
    } while(t)
}
// Part 1
// ======

const part1 = input => {
    const discs = getDiscs(input.trim().split('\n'))
    return findOptimalTime(discs)
}

// Part 2
// ======

const part2 = input => {
    const discs = getDiscs(input.trim().split('\n'))
    const lastDisc = discs[discs.length - 1]
    const newDisc = new Disc(lastDisc.id + 1, 11, 0)
    discs.push(newDisc)
    return findOptimalTime(discs)
}

module.exports = { part1, part2 }