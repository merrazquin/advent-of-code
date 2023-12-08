const assert = require('assert')
const { part1, part2, sortCards, isFourOfAKind, isFiveOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isHighCard } = require('./script')

const data = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe('Day :', () => {
    describe('isFiveOfAKind', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFiveOfAKind({cards: [2,2,2,2,1], sortedCards: sortCards([2,2,2,2,1])}, true), true)
            assert.equal(isFiveOfAKind({cards: [2,2,2,1,1], sortedCards: sortCards([2,2,2,1,1])}, true), true)
            assert.equal(isFiveOfAKind({cards: [2,3,3,3,3], sortedCards: sortCards([2,3,3,3,3])}, true), false)
            assert.equal(isFiveOfAKind({cards: [2,1,1,1,1], sortedCards: sortCards([2,1,1,1,1])}, true), true)
            assert.equal(isFiveOfAKind({cards: [2,2,1,1,1], sortedCards: sortCards([2,2,1,1,1])}, true), true)
        })
    })
    describe('isFourOfAKind', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFourOfAKind({cards: [10,5,5,1,5], sortedCards: sortCards([10,5,5,1,5])}, true), true, 'T55J5')
            assert.equal(isFourOfAKind({cards: [13,10,1,1,10], sortedCards: sortCards([13,10,1,1,10])}, true), true, 'KTJJT')
            assert.equal(isFourOfAKind({cards: [12,12,12,1,14], sortedCards: sortCards([12,12,12,1,14])}, true), true, 'QQQJA')
            assert.equal(isFourOfAKind({cards: [2,2,1,1,3], sortedCards: sortCards([2,2,1,1,3])}, true), true, '22JJ3')
            assert.equal(isFourOfAKind({cards: [2,2,2,1,3], sortedCards: sortCards([2,2,2,1,3])}, true), true, '222J3')
        })
    })
    describe('isFullHouse', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFullHouse({cards: [2,2,2,3,1], sortedCards: sortCards([2,2,2,3,1])}, true), true, '2223J')
            assert.equal(isFullHouse({cards: [2,2,3,3,1], sortedCards: sortCards([2,2,3,3,1])}, true), true, '2233J')
            assert.equal(isFullHouse({cards: [2,2,3,1,1], sortedCards: sortCards([2,2,3,1,1])}, true), true, '223JJ')
            assert.equal(isFullHouse({cards: [2,2,3,4,1], sortedCards: sortCards([2,2,3,4,1])}, true), false, '2234J')
        })
    })

    describe('isThreeOfAKind', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isThreeOfAKind({cards: [2,2,2,3,4], sortedCards: sortCards([2,2,2,3,4])}, true), true, '22234')
            assert.equal(isThreeOfAKind({cards: [2,2,4,3,1], sortedCards: sortCards([2,2,4,3,1])}, true), true, '2243J')
            assert.equal(isThreeOfAKind({cards: [2,5,4,1,1], sortedCards: sortCards([2,5,4,1,1])}, true), true, '254JJ')
        })
    })

    describe('isTwoPair', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isTwoPair({cards: [2,2,3,3,4], sortedCards: sortCards([2,2,3,3,4])}, true), true, '22334')
            assert.equal(isTwoPair({cards: [2,2,3,1,4], sortedCards: sortCards([2,2,3,1,4])}, true), true, '223J4')
            assert.equal(isTwoPair({cards: [2,2,1,1,4], sortedCards: sortCards([2,2,1,1,4])}, true), true, '22JJ4')
        })
    })
    describe('rankings', () => {
        const FIVE = 1
        const FOUR = 2
        const FULL_HOUSE = 3
        const THREE = 4
        const TWO_PAIR = 5
        const ONE_PAIR = 6
        const HIGH_CARD = 7
        const rankings = [isFiveOfAKind, isFourOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isHighCard]
        const scoreHand = (hand, jacksWild = true) => {
            let index = 0
            for (ranking of rankings) {
                index++
                if (ranking({cards: hand, sortedCards: sortCards(hand)}, jacksWild)) return index
            }
        }
        it('should perform correct rankings', () => {
            assert.equal(scoreHand([2,3,4,5,1]), ONE_PAIR, 'rank 2345J as one pair')
            assert.equal(scoreHand([2,2,2,2,1]), FIVE, 'rank 2222J as five of a kind')
            assert.equal(scoreHand([2,2,2,3,1]), FOUR, 'rank 2223J as four of a kind')
            assert.equal(scoreHand([2,2,3,3,1]), FULL_HOUSE, 'rank 2233J as full house')
            assert.equal(scoreHand([2,2,3,4,1]), THREE, 'rank 2234J as three of a kind')
            assert.equal(scoreHand([2,3,4,1,1]), THREE, 'rank 234JJ as three of a kind')
            assert.equal(scoreHand([2,2,4,1,1]), FOUR, 'rank 224JJ as four of a kind')
            assert.equal(scoreHand([2,3,3,1,4]), THREE, 'rank 233J4 as three of a kind')
            assert.equal(scoreHand([1,1,2,2,4]), FOUR, 'rank 233J4 as four of a kind')

            assert.equal(scoreHand([2,3,4,5,1], false), HIGH_CARD, 'rank 2345J as high card')
            assert.equal(scoreHand([2,2,4,4,1], false), TWO_PAIR, 'rank 2345J as two pair')
        })
    })
    describe('Part One', () => {
        it('', () => {
            assert.strictEqual(part1(data), 6440)
        })
    })

    describe('Part Two', () => {
        it('', () => {
            assert.strictEqual(part2(data), 5905)
        })
    })
})

