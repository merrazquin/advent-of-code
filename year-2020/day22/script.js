'use strict'

// Setup
const playRound = (deck1, deck2) => {
    let card1 = deck1.shift()
    let card2 = deck2.shift()

    if (card1 > card2) {
        deck1.push(card1, card2)
    } else {
        deck2.push(card2, card1)
    }
}
const preprocessing = input => {
    let [deck1, deck2] = input.split('\n\n')
    deck1 = deck1.split('\n').slice(1).map(card => parseInt(card))
    deck2 = deck2.split('\n').slice(1).map(card => parseInt(card))
    return {
        deck1, 
        deck2
    }
}

// Part 1
// ======
const calculateWinningScore = winningDeck => {

}

const part1 = input => {
    const {deck1, deck2} = preprocessing(input)

    let round = 0
    while (deck1.length && deck2.length) {
        round++
        playRound(deck1, deck2)
    }

    console.log('game won after', round, 'rounds')
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
