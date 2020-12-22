'use strict'
const { sumAll } = require('../../utils')
// Setup

const calculateWinningScore = winningDeck => {
    const len = winningDeck.length
    return sumAll(winningDeck.map((num, index) => num * (len - index)))
}

const playAGame = (deck1, deck2, recursiveMode = false) => {
    const history = []
    while (deck1.length && deck2.length) {
        const roundHash = deck1.join(',') + '|' + deck2.join(',')
        if (recursiveMode && history.includes(roundHash)) {
            deck2 = []
            break
        }
        history.push(roundHash)

        const card1 = deck1.shift()
        const card2 = deck2.shift()

        if (recursiveMode && deck1.length >= card1 && deck2.length >= card2) {
            const copiedDeck1 = deck1.slice(0, card1)
            const copiedDeck2 = deck2.slice(0, card2)

            const subGameWinner = playAGame(copiedDeck1, copiedDeck2, recursiveMode)

            if (subGameWinner == 'p1') {
                deck1.push(card1, card2)
            } else {
                deck2.push(card2, card1)
            }

        } else {
            if (card1 > card2) {
                deck1.push(card1, card2)
            } else {
                deck2.push(card2, card1)
            }
        }
    }

    return deck1.length ? 'p1' : 'p2'
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

const part1 = input => {
    const { deck1, deck2 } = preprocessing(input)
    return calculateWinningScore(playAGame(deck1, deck2, false) == 'p1' ? deck1 : deck2)
}

// Part 2
// ======

const part2 = input => {
    const { deck1, deck2 } = preprocessing(input)
    return calculateWinningScore(playAGame(deck1, deck2, true) == 'p1' ? deck1 : deck2)
}

module.exports = { part1, part2 }
