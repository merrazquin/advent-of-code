'use strict'
const { sumAll } = require('../../utils')

/**
Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
*/

// Setup
const preProcessing = (input, faces) => input.split('\n').map(hand => {
    const [cards, bid] = hand.split(/\s+/).map((val, index) => index === 1 ? parseInt(val) : val.split('').map(val => !isNaN(val) ? parseInt(val) : faces[val]))
    const sortedCards = sortCards(cards)
    return {cards, bid, sortedCards, originalHand: hand}
})
const sortCards = hand => hand.reduce((cards, card) => {
    if (!cards[card]) cards[card] = 0
    cards[card]++
    return cards
}, {})

// Part 1
// ======
const isFiveOfAKind = (hand, jacksWild = false) => {
    const keys = Object.keys(hand.sortedCards)
    if (keys.length === 1) {
        return true
    }
    return jacksWild && hand.cards.includes(1) && keys.length === 2
}
const isFourOfAKind = (hand, jacksWild = false) => {
    const handObj = hand.sortedCards
    const values = Object.values(handObj).sort((a , b) => b - a)
    if (jacksWild && hand.cards.includes(1))
    {
    // JJ488
        const {'1':jacks, ...newObj} = handObj
        return (jacks + Object.values(newObj).sort((a, b) => b - a)[0]) === 4
    }
    return values.filter(val => val === 4).length === 1
}
const isFullHouse = (hand, jacksWild = false) => {
    const handObj = hand.sortedCards
    const keys = Object.keys(handObj)
    const vals = Object.values(handObj)
    if (keys.length === 2 && vals.includes(3) && vals.includes(2)) {
        return true
    }
    if (jacksWild) {
        return keys.length == 3 && hand.cards.includes(1)
    }
    return false
}
const isThreeOfAKind = (hand, jacksWild = false) => {
    const handObj = hand.sortedCards
    const values = Object.values(handObj).sort((a , b) => b - a)
    if (jacksWild && hand.cards.includes(1))
    {
        const {'1':jacks, ...newObj} = handObj
        return (jacks + Object.values(newObj).sort((a, b) => b - a)[0]) === 3
    }
    return values.filter(val => val === 3).length === 1
}
const isTwoPair = (hand, jacksWild = false) => {
    const handObj = hand.sortedCards

    if (jacksWild && hand.cards.includes(1)) {
        return false
    }

    return Object.values(handObj).filter(val => val === 2).length === 2
}
const isOnePair = (hand, jacksWild = false) => {
    if (Object.values(hand.sortedCards).filter(val => val === 2).length === 1) {
        return true
    }
    if (jacksWild) {
        return hand.cards.includes(1)
    }
    return false
}
const isHighCard = (hand, jacksWild = false) => {
    if (Object.values(hand.sortedCards).every(val => val === 1)) {
        return true
    }
    if (jacksWild) {
        return !hand.cards.includes(1)
    }
    return false
}
const getHigherCard = (handA, handB) => {
    for (let i = 0; i < handA.cards.length; i++) {
        if (handA.cards[i] !== handB.cards[i]) {
            return handA.cards[i] > handB.cards[i] ? handA : handB
        }
    }
}
const rankHands = (handA, handB, jacksWild = false) => {
    // 1 - handA higher, -1 handB higher
    const rankings = [isFiveOfAKind, isFourOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isHighCard]
    for (const ranking of rankings) {
        let handATest = ranking(handA, jacksWild)
        let handBTest = ranking(handB, jacksWild)

        if (handATest && handBTest) {
            const higherCard = getHigherCard(handA, handB)
            return higherCard == handA ? 1 : -1
        }

        if (handATest || handBTest) {
            return handATest ? 1 : -1
        }
    }
}

const part1 = input => {
    const faces = {
        'T': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    }
    const rankedHands = preProcessing(input, faces).sort(rankHands)
    return sumAll(rankedHands.map((hand, index) => (index + 1) * hand.bid))
}

// Part 2
// ======

const part2 = input => {
    const faces = {
        'T': 10,
        'J': 1,
        'Q': 12,
        'K': 13,
        'A': 14
    }
    const rankedHands = preProcessing(input, faces).sort((handA, handB) => rankHands(handA, handB, true))
    return sumAll(rankedHands.map((hand, index) => (index + 1) * hand.bid))
}

module.exports = { part1, part2, isFiveOfAKind, isFourOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isHighCard, sortCards }
