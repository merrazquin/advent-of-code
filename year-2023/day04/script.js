'use strict'
const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => input.trim().split('\n').map(card => {
    const [_card, numbers] = card.split(': ')
    const [winners, candidates] = numbers.trim().split(' | ').map(set => set.trim().split(/\s+/).map(num => parseInt(num)))
    return { winners, candidates, copies: 1 }
})

const winCount = card => {
    const {winners, candidates} = card

    const won = winners.filter(value => candidates.includes(value));
    return won.length
}

const cardScore = numWon => {
    return numWon ? Math.pow(2, numWon - 1) : 0
}

// Part 1
// ======

const part1 = input => {
    return sumAll(preProcessing(input).map(card => cardScore(winCount(card))))
}

// Part 2
// ======

const part2 = input => {
    const cards = preProcessing(input).map((card, index) => {
        return {
            id: index + 1,
            wins: winCount(card),
            copies: 1
        }
    }).reduce((cards, card) => {
        cards[card.id] = card
        return cards
    }, {})

    let max = Object.keys(cards).pop()
    for (let i = 1; i < max; i++) {
        const wins = cards[i].wins
        if (!wins) continue
        for (let j = i + 1; j <= i + wins; j++) {
            cards[j].copies += cards[i].copies
        }
    }
    return sumAll(Object.values(cards).map(card => card.copies))
}

module.exports = { part1, part2 }
