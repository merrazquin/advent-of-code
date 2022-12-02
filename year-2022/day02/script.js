'use strict'
/*
A - Rock
B - Paper
C - Scissors

X - loose
Y - draw
Z - win
*/
const { sumAll } = require('../../utils')
const mapping = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
    A_X: 'C',// loose against rock
    B_X: 'A', // loose against paper
    C_X: 'B', // loose against scissors
    A_Y: 'A', // draw against rock
    B_Y: 'B', // draw against paper
    C_Y: 'C', // draw against scissors
    A_Z: 'B', // win against rock
    B_Z: 'C', // win against paper
    C_Z: 'A'// win against scissors
}

// Setup
const preprocessing = (input, p2 = false) => input.trim().split('\n').map(round => {
    let [opponent, me] = round.split(' ')
    if (p2) {
        me = mapping[`${opponent}_${me}`]
    }
    opponent = mapping[opponent]
    me = mapping[me]
    let score = me
    let result = me - opponent
    
    if (opponent == me) {
        score += 3 
    } else if (result == 1 || result == -2) {
        score += 6
    }
    return {opponent, me, score}
})


// Part 1
// ======

const part1 = input => {
    const guide = preprocessing(input)
    return sumAll(guide.map(result => result.score))
}

// Part 2
// ======

const part2 = input => {
    const guide = preprocessing(input, true)
    return sumAll(guide.map(result => result.score))
}

module.exports = { part1, part2 }
