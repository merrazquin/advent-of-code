'use strict'
const {sumAll} = require('../../utils')
// Setup
const history = []

const calculateWinningScore = winningDeck => {
    const len = winningDeck.length
    return sumAll(winningDeck.map((num, index) => num * (len - index)))
}

const playSubRound = (deck1, deck2) => {

}

const playRound = (deck1, deck2, recurse = false) => {
    if (recurse) {
        const hash = deck1.join(',') + '|' + deck2.join(',')
        if (history.includes(hash)) {
            return calculateWinningScore(deck1)
        }
        history.push(hash)
    }

    let card1 = deck1.shift()
    let card2 = deck2.shift()

    if (recurse && deck1.length >= card1 && deck2.length > card2) {
        console.log('// play a sub-game to determine the winner')
        let copiedDeck1 = deck1.slice(0, card1)
        let copiedDeck2 = deck2.slice(0, card2)
        console.log(card1, ' - ', copiedDeck1)
        console.log(card2, ' - ', copiedDeck2)
        console.log('')

        let rounds = 0
        while (copiedDeck1.length && copiedDeck2.length) {
            let winningScore
            if(winningScore = playRound(copiedDeck1, copiedDeck2, true)) {
                return winningScore
            }
        }

        console.log('subgame won by player', (copiedDeck1.length ? 1 : 2))
        if (copiedDeck1.length) {
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

    return false
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
    const {deck1, deck2} = preprocessing(input)

    let round = 0
    while (deck1.length && deck2.length) {
        round++
        playRound(deck1, deck2)
    }
    console.log('game won after', round, 'rounds')

    return calculateWinningScore(deck1.length ? deck1 : deck2) 

}

// Part 2
// ======

const part2 = input => {
    const {deck1, deck2} = preprocessing(input)

    let round = 0
    while (deck1.length && deck2.length) {
        round++
        let winningScore
        if(winningScore = playRound(deck1, deck2, true)) {
            return winningScore
        }
    }
    console.log('game won after', round, 'rounds')

    return calculateWinningScore(deck1.length ? deck1 : deck2) 
}

module.exports = { part1, part2 }
