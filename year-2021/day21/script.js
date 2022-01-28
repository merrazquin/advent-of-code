'use strict'
const {sumAll} = require('../../utils')
// Setup
class Player {
    constructor(turn, startingPos) {
        this.turn = turn
        this.rollCount = 0
        this.score = 0
        this.pos = startingPos
    }
    rollDie(die) {
        const rollResult = die.roll(3)
        const oldPos = this.pos
        const newSpace = (this.pos + sumAll(rollResult))
        this.pos = (newSpace % 10 == 0) ? 10 : (newSpace % 10)
        this.score += this.pos
        // console.log('Player', this.turn, 'rolls', rollResult.join('+'), `(${sumAll(rollResult)} + ${oldPos} = ${newSpace}) and moves to space ${this.pos} for a total score of ${this.score}`)
        if (this.pos == 0) {
            process.exit()
        }
        this.rollCount += 3
    }
    toString() {
        return `${this.turn}: pos: ${this.pos}, score: ${this.score}, rollCount: ${this.rollCount}`
    }
}
class Die {
    constructor(faces = 100, deterministic = true) {
        this.faces = 100
        this.currentFace = 0
    }
    roll(numTimes = 3) {
        let rolls = []
        while (numTimes--) {
            ++this.currentFace
            rolls.push(this.currentFace)
            if (this.currentFace == 100) {
                this.currentFace = 0
            }            
        }
        return rolls
    }
    toString() {
        return this.currentFace
    }
}
// Part 1
// ======

const part1 = (input, target = 1000, deterministic = true) => {
    
    const [p1, p2] = input.trim().split('\n').map(playerInfo => parseInt(playerInfo.split(': ')[1]))
    const player1 = new Player(1, p1)
    const player2 = new Player(2, p2)
    const die = new Die(100, deterministic)

    do {
        player1.rollDie(die)
        if (player1.score >= target) {
            return player2.score * (player1.rollCount + player2.rollCount)
        }
        player2.rollDie(die)
        if (player2.score >= target) {
            return player1.score * (player1.rollCount + player2.rollCount)
        }
    }while (player1.score < target && player2.score < target)
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }
