const assert = require('assert')
const {playGame } = require('./script')

describe('Day 21: RPG Simulator 20XX', () => {
    describe('playGame', () => {
        it('should award a win to the player after 7 turns', () => {
            const player = {
                name: 'player',
                hitPoints: 8,
                damage: 5,
                armor: 5
            }
            const enemy = {
                name: 'boss',
                hitPoints: 12,
                damage: 7,
                armor: 2
            }
            const {playerWon, turns} = playGame(player, enemy)
            assert.strictEqual(playerWon, true)
            assert.strictEqual(turns, 7)
        })
    })
})
