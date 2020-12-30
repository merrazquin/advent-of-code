'use strict'

// Setup

const preprocessing = input => {
    const [hitPoints, damage, armor] = input.split('\n').map(row => row.split(': ')[1]).map(Number)

    return {
        hitPoints,
        damage,
        armor
    }
}
const attack = (attacker, victim) => {
    victim.hitPoints -= (attacker.damage - victim.armor)
}
const weaponOptions = {
    dagger: {
        cost: 8,
        damage: 4
    },
    shortsword: {
        cost: 10,
        damage: 5
    },
    warhammer: {
        cost: 25,
        damage: 6
    },
    longsword: {
        cost: 40,
        damage: 7
    },
    greataxe: {
        cost: 74,
        damage: 8
    }
}
const armorOptions = {
    leather: {
        cost: 13,
        armor: 1
    },
    chainmail: {
        cost: 31,
        armor: 2
    },
    splintmail: {
        cost: 53,
        armor: 3
    },
    bandedmail: {
        cost: 75,
        armor: 4
    },
    platemail: {
        cost: 102,
        armor: 5
    },
}
const rings = {
    damage1: {
        cost: 25,
        damage: 1
    },
    damage2: {
        cost: 50,
        damage: 2
    },
    damage3: {
        cost: 100,
        damage: 3
    },
    defense1: {
        cost: 20,
        armor: 1
    },
    defense2: {
        cost: 40,
        armor: 2
    },
    defense3: {
        cost: 80,
        armor: 3
    }
}
const ringCombinations = [
    ['damage1', 'damage2'],
    ['damage1', 'damage3'],
    ['damage1', 'defense1'],
    ['damage1', 'defense2'],
    ['damage1', 'defense3'],
    ['damage2', 'damage3'],
    ['damage2', 'defense1'],
    ['damage2', 'defense2'],
    ['damage2', 'defense3'],
    ['damage3', 'defense1'],
    ['damage3', 'defense2'],
    ['damage3', 'defense3'],
    ['defense1', 'defense2'],
    ['defense1', 'defense3'],
    ['defense2', 'defense3'],
]
const playGame = (player, enemy) => {
    let turn = 0
    while (player.hitPoints > 0 && enemy.hitPoints > 0) {
        if (turn % 2 == 0) {
            attack(player, enemy)
        } else {
            attack(enemy, player)
        }
        turn++
    }
    return {
        playerWon: player.hitPoints > enemy.hitPoints,
        turns: turn
    }
}
// Part 1
// ======

const part1 = input => {
    let enemy = preprocessing(input)
    const enemyHitPoints = enemy.hitPoints

    let player = {
        hitPoints: 100,
        damage: 0,
        armor: 0
    }
    let minGoldSpent = NaN
    Object.keys(weaponOptions).forEach(weaponName => {
        const weapon = weaponOptions[weaponName]
        let goldSpent = weapon.cost
        
        player.damage = weapon.damage
        player.armor = 0
        player.hitPoints = 100
        
        // play with only a single weapon (W)
        enemy.hitPoints = enemyHitPoints
        if(playGame(player, enemy).playerWon) {
            minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
        }

        Object.keys(armorOptions).forEach(armorName => {
            const armor = armorOptions[armorName]
            goldSpent = weapon.cost + armor.cost

            player.damage = weapon.damage
            player.armor = armor.armor
            player.hitPoints = 100

            // play with 1 weapon, and 1 armor (W + A)
            enemy.hitPoints = enemyHitPoints
            if(playGame(player, enemy).playerWon) {
                minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
            }

            Object.keys(rings).forEach(ringName => {
                const ring = rings[ringName]
                goldSpent = weapon.cost + armor.cost + ring.cost

                player.damage = weapon.damage
                player.armor = armor.armor
                player.hitPoints = 100

                if (ring.armor) {
                    player.armor += ring.armor
                } else {
                    player.damage += ring.damage
                }

                // play with 1 weapon, 1 armor, and 1 ring (W + A + R)
                enemy.hitPoints = enemyHitPoints
                if(playGame(player, enemy).playerWon) {
                    minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
                }
            })
            
            ringCombinations.forEach(ringCombo => {
                let [leftRing, rightRing] = ringCombo
                leftRing = rings[leftRing]
                rightRing = rings[rightRing]
                goldSpent = weapon.cost + armor.cost + leftRing.cost + rightRing.cost

                player.damage = weapon.damage
                player.armor = armor.armor
                player.hitPoints = 100

                if (leftRing.armor) {
                    player.armor += leftRing.armor
                } else {
                    player.damage += leftRing.damage
                }
                if (rightRing.armor) {
                    player.armor += rightRing.armor
                } else {
                    player.damage += rightRing.damage
                }

                // play with 1 weapon, 1 armor, and 2 rings (W + A + 2R)
                enemy.hitPoints = enemyHitPoints
                if(playGame(player, enemy).playerWon) {
                    minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
                }
            })            
        })

        Object.keys(rings).forEach(ringName => {
            const ring = rings[ringName]
            goldSpent = weapon.cost + ring.cost

            player.damage = weapon.damage
            player.armor = 0
            player.hitPoints = 100

            if (ring.armor) {
                player.armor += ring.armor
            } else {
                player.damage += ring.damage
            }

            // play with 1 weapon and 1 ring (W + R)
            enemy.hitPoints = enemyHitPoints
            if(playGame(player, enemy).playerWon) {
                minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
            }
        })

        ringCombinations.forEach(ringCombo => {
            let [leftRing, rightRing] = ringCombo
            leftRing = rings[leftRing]
            rightRing = rings[rightRing]
            goldSpent = weapon.cost + leftRing.cost + rightRing.cost

            player.damage = weapon.damage
            player.armor = 0
            player.hitPoints = 100

            if (leftRing.armor) {
                player.armor += leftRing.armor
            } else {
                player.damage += leftRing.damage
            }
            if (rightRing.armor) {
                player.armor += rightRing.armor
            } else {
                player.damage += rightRing.damage
            }

            // play with 1 weapon and 2 rings (W + 2R)
            enemy.hitPoints = enemyHitPoints
            if(playGame(player, enemy).playerWon) {
                minGoldSpent = Math.min(minGoldSpent || goldSpent, goldSpent)
            }
        })
    })

    return minGoldSpent
}

// Part 2
// ======

const part2 = input => {
    let enemy = preprocessing(input)
    const enemyHitPoints = enemy.hitPoints

    let player = {
        hitPoints: 100,
        damage: 0,
        armor: 0
    }
    let maxGoldSpent = NaN
    Object.keys(weaponOptions).forEach(weaponName => {
        const weapon = weaponOptions[weaponName]
        let goldSpent = weapon.cost
        
        player.damage = weapon.damage
        player.armor = 0
        player.hitPoints = 100
        
        // play with only a single weapon (W)
        enemy.hitPoints = enemyHitPoints
        if(!(playGame(player, enemy).playerWon)) {
            maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
        }

        Object.keys(armorOptions).forEach(armorName => {
            const armor = armorOptions[armorName]
            goldSpent = weapon.cost + armor.cost

            player.damage = weapon.damage
            player.armor = armor.armor
            player.hitPoints = 100

            // play with 1 weapon, and 1 armor (W + A)
            enemy.hitPoints = enemyHitPoints
            if(!(playGame(player, enemy).playerWon)) {
                maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
            }

            Object.keys(rings).forEach(ringName => {
                const ring = rings[ringName]
                goldSpent = weapon.cost + armor.cost + ring.cost

                player.damage = weapon.damage
                player.armor = armor.armor
                player.hitPoints = 100

                if (ring.armor) {
                    player.armor += ring.armor
                } else {
                    player.damage += ring.damage
                }

                // play with 1 weapon, 1 armor, and 1 ring (W + A + R)
                enemy.hitPoints = enemyHitPoints
                if(!(playGame(player, enemy).playerWon)) {
                    maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
                }
            })
            
            ringCombinations.forEach(ringCombo => {
                let [leftRing, rightRing] = ringCombo
                leftRing = rings[leftRing]
                rightRing = rings[rightRing]
                goldSpent = weapon.cost + armor.cost + leftRing.cost + rightRing.cost

                if (isNaN(goldSpent)) {
                    process.exit()
                }

                player.damage = weapon.damage
                player.armor = armor.armor
                player.hitPoints = 100

                if (leftRing.armor) {
                    player.armor += leftRing.armor
                } else {
                    player.damage += leftRing.damage
                }
                if (rightRing.armor) {
                    player.armor += rightRing.armor
                } else {
                    player.damage += rightRing.damage
                }

                // play with 1 weapon, 1 armor, and 2 rings (W + A + 2R)
                enemy.hitPoints = enemyHitPoints
                if(!(playGame(player, enemy).playerWon)) {
                    maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
                }
            })            
        })

        Object.keys(rings).forEach(ringName => {
            const ring = rings[ringName]
            goldSpent = weapon.cost + ring.cost

            player.damage = weapon.damage
            player.armor = 0
            player.hitPoints = 100

            if (ring.armor) {
                player.armor += ring.armor
            } else {
                player.damage += ring.damage
            }

            // play with 1 weapon and 1 ring (W + R)
            enemy.hitPoints = enemyHitPoints
            if(!(playGame(player, enemy).playerWon)) {
                maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
            }
        })

        ringCombinations.forEach(ringCombo => {
            let [leftRing, rightRing] = ringCombo
            leftRing = rings[leftRing]
            rightRing = rings[rightRing]
            goldSpent = weapon.cost + leftRing.cost + rightRing.cost

            player.damage = weapon.damage
            player.armor = 0
            player.hitPoints = 100

            if (leftRing.armor) {
                player.armor += leftRing.armor
            } else {
                player.damage += leftRing.damage
            }
            if (rightRing.armor) {
                player.armor += rightRing.armor
            } else {
                player.damage += rightRing.damage
            }

            // play with 1 weapon and 2 rings (W + 2R)
            enemy.hitPoints = enemyHitPoints
            if(!(playGame(player, enemy).playerWon)) {
                maxGoldSpent = Math.max(maxGoldSpent || goldSpent, goldSpent)
            }
        })
    })

    return maxGoldSpent
}

module.exports = { part1, part2, playGame }
