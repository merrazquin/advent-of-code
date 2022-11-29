'use strict'
const { convertRowsToCols } = require('../../utils')

// Setup
const getNumbersAndCards = input => {
    let [numbers, ...cards] = input.trim().split('\n\n')
    numbers = numbers.split(',').map(num => parseInt(num))
    cards = cards.map(card => card.trim().split('\n').map(row => row.trim().split(/\s+/g).map(num => parseInt(num))))
    return {numbers, cards}
}
const checkForWin = card => {
    const cardCols = convertRowsToCols(card)
    return card.some(row => row.every(num => num != undefined))  || cardCols.some(row => row.every(num => num != undefined))
}
const playBingo = (numbers, cards, findLast = false) => {
    const playedNumbersOnCards = new Array(cards.length).fill('').map(() => 
        new Array(5).fill('').map(() => 
            new Array(5).fill(undefined)
        )
    )
    const playedNumbers = []
    while(numbers.length) {
        let number = numbers.shift()
        playedNumbers.push(number)
        for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
            const card = cards[cardIndex]
            for (let rowIndex = 0; rowIndex < card.length; rowIndex++) {
                const row = card[rowIndex]
                const numIndex = row.indexOf(number)
                if (numIndex != -1) {
                    playedNumbersOnCards[cardIndex][rowIndex][numIndex] = number

                    if (checkForWin(playedNumbersOnCards[cardIndex]) && !findLast){
                        const unmarkedSum = card.reduce((acc, row) => {
                            return acc + row.reduce((rowAcc, num) => {
                                return rowAcc + (playedNumbers.includes(num) ? 0 : num)
                            }, 0)
                        }, 0)
                        return unmarkedSum * number
                    }

                    if (findLast) {
                        if (playedNumbersOnCards.every(card => checkForWin(card))) {
                            const unmarkedSum = card.reduce((acc, row) => {
                                return acc + row.reduce((rowAcc, num) => {
                                    return rowAcc + (playedNumbers.includes(num) ? 0 : num)
                                }, 0)
                            }, 0)
                            return unmarkedSum * number
                        }
                    }
                }
            }
        }
    }
}
// Part 1
// ======

const part1 = input => {
    const {numbers, cards} = getNumbersAndCards(input)
    return playBingo(numbers, cards)
}

// Part 2
// ======

const part2 = input => {
    const {numbers, cards} = getNumbersAndCards(input)
    return playBingo(numbers, cards, true)
}

module.exports = { part1, part2 }
