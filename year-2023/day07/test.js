const assert = require('assert')
const { part1, part2, sortCards, isFourOfAKind, isFiveOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isHighCard } = require('./script')

const data = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe('Day 7: Camel Cards', () => {
    describe('isFiveOfAKind', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFiveOfAKind({cards: [2,2,2,2,1], sortedCards: sortCards([2,2,2,2,1])}, true), true, '2222J wild')
            assert.equal(isFiveOfAKind({cards: [2,2,2,2,1], sortedCards: sortCards([2,2,2,2,1])}, false), false, '2222J')

            assert.equal(isFiveOfAKind({cards: [2,2,2,1,1], sortedCards: sortCards([2,2,2,1,1])}, true), true, '222JJ wild')
            assert.equal(isFiveOfAKind({cards: [2,2,2,1,1], sortedCards: sortCards([2,2,2,1,1])}, false), false, '222JJ')

            assert.equal(isFiveOfAKind({cards: [2,2,1,1,1], sortedCards: sortCards([2,2,1,1,1])}, true), true, '22JJJ wild')
            assert.equal(isFiveOfAKind({cards: [2,2,1,1,1], sortedCards: sortCards([2,2,1,1,1])}, false), false, '22JJJ')

            assert.equal(isFiveOfAKind({cards: [2,1,1,1,1], sortedCards: sortCards([2,1,1,1,1])}, true), true, '2JJJJ wild')
            assert.equal(isFiveOfAKind({cards: [2,1,1,1,1], sortedCards: sortCards([2,1,1,1,1])}, false), false, '2JJJJ')

            assert.equal(isFiveOfAKind({cards: [1,1,1,1,1], sortedCards: sortCards([1,1,1,1,1])}, true), true, 'JJJJJ wild')
            assert.equal(isFiveOfAKind({cards: [1,1,1,1,1], sortedCards: sortCards([1,1,1,1,1])}, false), true, 'JJJJJ')
            
            assert.equal(isFiveOfAKind({cards: [2,2,2,2,2], sortedCards: sortCards([2,2,2,2,2])}, false), true, '22222')
        })
    })
    describe('isFourOfAKind', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFourOfAKind({cards: [2,2,3,3,1], sortedCards: sortCards([2,2,3,3,1])}, true), false, '2233J wild')

            assert.equal(isFourOfAKind({cards: [2,2,2,3,1], sortedCards: sortCards([2,2,2,3,1])}, true), true, '2223J wild')
            assert.equal(isFourOfAKind({cards: [2,2,2,3,1], sortedCards: sortCards([2,2,2,3,1])}, false), false, '2223J')

            assert.equal(isFourOfAKind({cards: [2,2,3,1,1], sortedCards: sortCards([2,2,3,1,1])}, true), true, '223JJ wild')
            assert.equal(isFourOfAKind({cards: [2,2,3,1,1], sortedCards: sortCards([2,2,3,1,1])}, false), false, '223JJ')

            assert.equal(isFourOfAKind({cards: [2,3,1,1,1], sortedCards: sortCards([2,3,1,1,1])}, true), true, '23JJJ wild')
            assert.equal(isFourOfAKind({cards: [2,3,1,1,1], sortedCards: sortCards([2,3,1,1,1])}, false), false, '23JJJ')

            assert.equal(isFourOfAKind({cards: [2,1,1,1,1], sortedCards: sortCards([2,1,1,1,1])}, true), false, '2JJJJ wild')
            assert.equal(isFourOfAKind({cards: [2,1,1,1,1], sortedCards: sortCards([2,1,1,1,1])}, false), true, '2JJJJ')

            // KTJJT
            assert.equal(isFourOfAKind({cards: [13,10,1,1,10], sortedCards: sortCards([13,10,1,1,10])}, true), true, 'KTJJT')
            assert.equal(isFourOfAKind({cards: [13,10,1,1,10], sortedCards: sortCards([13,10,1,1,10])}, false), false, 'KTJJT')

        })
    })
    describe('isFullHouse', () => {
        it('should interpret wild jacks correctly', () => {
            assert.equal(isFullHouse({cards: [2,2,2,3,1], sortedCards: sortCards([2,2,2,3,1])}, true), true, '2223J wild')
            assert.equal(isFullHouse({cards: [2,2,2,3,1], sortedCards: sortCards([2,2,2,3,1])}, false), false, '2223J')

            assert.equal(isFullHouse({cards: [2,2,3,3,1], sortedCards: sortCards([2,2,3,3,1])}, true), true, '2233J wild')
            assert.equal(isFullHouse({cards: [2,2,3,3,1], sortedCards: sortCards([2,2,3,3,1])}, false), false, '2233J')
            
            assert.equal(isFullHouse({cards: [2,2,3,1,1], sortedCards: sortCards([2,2,3,1,1])}, true), true, '223JJ wild')
            assert.equal(isFullHouse({cards: [2,2,3,1,1], sortedCards: sortCards([2,2,3,1,1])}, false), false, '223JJ')
            
            assert.equal(isFullHouse({cards: [2,2,3,4,1], sortedCards: sortCards([2,2,3,4,1])}, true), false, '2234J wild')
            assert.equal(isFullHouse({cards: [2,2,3,4,1], sortedCards: sortCards([2,2,3,4,1])}, false), false, '2234J')
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
            assert.equal(isTwoPair({cards: [13,13,6,7,7], sortedCards: sortCards([2,2,3,3,4])}, true), true, 'KK677 wild')
            assert.equal(isTwoPair({cards: [13,13,6,7,7], sortedCards: sortCards([2,2,3,3,4])}, false), true, 'KK677')

            // KTJJT
            assert.equal(isTwoPair({cards: [13,10,1,1,10], sortedCards: sortCards([13,10,1,1,10])}, true), false, 'KTJJT wild')
            assert.equal(isTwoPair({cards: [13,10,1,1,10], sortedCards: sortCards([13,10,1,1,10])}, false), true, 'KTJJT')


            assert.equal(isTwoPair({cards: [2,2,3,3,4], sortedCards: sortCards([2,2,3,3,4])}, true), true, '22334 wild')
            assert.equal(isTwoPair({cards: [2,2,3,1,4], sortedCards: sortCards([2,2,3,1,4])}, true), false, '223J4 wild')
            assert.equal(isTwoPair({cards: [2,2,1,1,4], sortedCards: sortCards([2,2,1,1,4])}, true), false, '22JJ4 wild')
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
            for (let ranking of rankings) {
                index++
                if (ranking({cards: hand, sortedCards: sortCards(hand)}, jacksWild)) return index
            }
        }
        it('should perform correct rankings', () => {
            assert.equal(scoreHand([2,3,4,5,1]), ONE_PAIR, 'rank 2345J as one pair (j wild)')
            assert.equal(scoreHand([2,3,4,5,1], false), HIGH_CARD, 'rank 2345J as high card')

            assert.equal(scoreHand([13,10,1,1,10]), FOUR, 'rank KTJJT as four of a kind (j wild)')
            assert.equal(scoreHand([13,10,11,11,10], false), TWO_PAIR, 'rank KTJJT as four of a kind')

            assert.equal(scoreHand([2,2,2,2,1]), FIVE, 'rank 2222J as five of a kind')
            assert.equal(scoreHand([2,2,2,3,1]), FOUR, 'rank 2223J as four of a kind')
            assert.equal(scoreHand([2,2,3,3,1]), FULL_HOUSE, 'rank 2233J as full house')
            assert.equal(scoreHand([2,2,3,4,1]), THREE, 'rank 2234J as three of a kind')
            assert.equal(scoreHand([2,3,4,1,1]), THREE, 'rank 234JJ as three of a kind')
            assert.equal(scoreHand([2,2,4,1,1]), FOUR, 'rank 224JJ as four of a kind')
            assert.equal(scoreHand([2,3,3,1,4]), THREE, 'rank 233J4 as three of a kind')
            assert.equal(scoreHand([1,1,2,2,4]), FOUR, 'rank JJ224 as four of a kind')

            assert.equal(scoreHand([2,3,4,5,1], false), HIGH_CARD, 'rank 2345J as high card')
            assert.equal(scoreHand([2,2,4,4,1], false), TWO_PAIR, 'rank 2345J as two pair')

            assert.equal(scoreHand([1,1,4,8,8]), FOUR, 'rank JJ488 as four of a kind')
        })
    })
    describe('Part One', () => {
        it('Should calculate total winnings', () => {
            assert.strictEqual(part1(data), 6440)
        })
    })

    describe('Part Two', () => {
        it('Should calculate total winnings (Js wild)', () => {
            assert.strictEqual(part2(data), 5905)
        })
    })
})

