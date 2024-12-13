'use strict'
const {sumAll} = require('../../utils')

// Setup
const preProcessing = input => input.split('\n\n').map(machine => {
    const [buttonA, buttonB, prize] = machine.split('\n').map(element => {
        const [_, x, y] = element.split(/[:,] /g).map(num => parseInt(num.replace(/[^0-9]/g, '')))
        return {x, y}
    })
    buttonA.cost = 3
    buttonB.cost = 1
    return {buttonA, buttonB, prize}
})

// Part 1
// ======

const findA = machine => {
    const {buttonA, buttonB, prize} = machine
    return ((prize.x * buttonB.y) - (prize.y * buttonB.x)) / ((buttonA.x * buttonB.y) - (buttonB.x * buttonA.y))
}

const findB = (machine, A) => {
    const {buttonA, buttonB, prize} = machine
    return (prize.x - (buttonA.x * A)) / buttonB.x
}

const canMachineWinLinear = machine => {
    const A = findA(machine)
    if (parseInt(A) === A) {
        const B = findB(machine, A)

        if (parseInt(B) === B) {
            return (A * 3) + B
        }
    }

    return 0
}

// original solution for posterity
const findButtonPresses = (otherPresses, otherButton, thisButton, target) => (target - otherButton * otherPresses) / thisButton
const canMachineWin = (machine, maxPresses = 100, aPresses = 0) => {
    const {x: targetX, y: targetY} = machine.prize
    const {x: aX, y: aY} = machine.buttonA
    const {x: bX, y: bY} = machine.buttonB

    const costs = []
    while (aPresses < maxPresses) {
        let bPressesX = findButtonPresses(aPresses, aX, bX, targetX)
        let bPressesY = findButtonPresses(aPresses, aY, bY, targetY)
        if (!(bPressesX !== bPressesY || bPressesX < 0 || bPressesY < 0 || bPressesX > 100 || bPressesY > 100 || parseInt(bPressesX) !== bPressesX || parseInt(bPressesY) !== bPressesY)) {
            costs.push((aPresses * 3) + bPressesX)
        }
        aPresses++
    }
    return costs.length ? costs.sort((a, b) => a - b).shift() : 0
}

const part1 = input => {
    const clawMachines = preProcessing(input)
    return sumAll(clawMachines.map(machine => canMachineWinLinear(machine)))
}

// Part 2
// ======

const part2 = input => {
    const clawMachines = preProcessing(input).map(machine => {
        machine.prize.x += 10000000000000
        machine.prize.y += 10000000000000
        return machine
    })
    return sumAll(clawMachines.map(machine => canMachineWinLinear(machine)))
}

module.exports = { part1, part2 }