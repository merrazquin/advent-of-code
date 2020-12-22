'use strict'

// Setup
const playRound = (deck1, deck2) => {
    card1 = deck1.shift()
    card2 = deck2.shift()

    if (card1 > card2) {
        deck1.push(card1, card2)
    } else {
        deck2.push(card2, card1)
    }
}
const preprocessing = input => {
    return input.split('\n')
}

// Part 1
// ======

const part1 = input => {
    return preprocessing(input)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
