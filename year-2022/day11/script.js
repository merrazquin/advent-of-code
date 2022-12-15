'use strict'

const { multiplyAll } = require('../../utils')

// Setup
const preprocessing = (input) => {
    const monkeys = input.trim().split('\n\n').map(monkeyData => {
        let [, startingItems, operation, testDivisor,  trueMonkey, falseMonkey] = monkeyData.split('\n')
        startingItems = startingItems.trim().split(':')[1].trim().split(', ').map(item => parseInt(item))
        operation = operation.split(' = ')[1]
        testDivisor = parseInt(testDivisor.split('by ')[1])
        trueMonkey = parseInt(trueMonkey.split('monkey ')[1])
        falseMonkey = parseInt(falseMonkey.split('monkey ')[1])

        return {
            startingItems, 
            operation,
            testDivisor,
            trueMonkey, falseMonkey,
            inspections: 0
        }
    })
    return monkeys
}

// Part 1
// ======
const doRound = monkeys => {
    monkeys.forEach(monkey => {
        let {startingItems, operation, testDivisor, trueMonkey, falseMonkey} = monkey
        startingItems = startingItems.map(worryLevel => Math.floor(eval(operation.replace(/old/g, worryLevel)) / 3))

        // test your worry level & throw to new monkey
        while (startingItems.length) {
            monkey.inspections++
            let item = startingItems.shift()
            const monkeyIndex = (item % testDivisor) ? falseMonkey : trueMonkey
            monkeys[monkeyIndex].startingItems.push(item)
        }
        monkey.startingItems = startingItems
    })
}
const doRoundP2Round = (monkeys, lcm) => {
    monkeys.forEach(monkey => {
        let {startingItems, operation, testDivisor, trueMonkey, falseMonkey} = monkey
        operation = operation + ' '
        startingItems = startingItems.map(worryLevel => eval(operation.replace(/old/g, worryLevel)) % lcm)

        // test your worry level & throw to new monkey
        while (startingItems.length) {
            monkey.inspections++
            let item = startingItems.shift()
            const monkeyIndex = (item % testDivisor) ? falseMonkey : trueMonkey
            monkeys[monkeyIndex].startingItems.push(item)
        }
        monkey.startingItems = startingItems
    })
}
const part1 = input => {
    const monkeys = preprocessing(input)
    let numRounds = 20
    while (numRounds--) {
        doRound(monkeys)
    }
    monkeys.sort((a, b) => b.inspections - a.inspections)
    return monkeys[0].inspections * monkeys[1].inspections
}
/*
After each monkey inspects an item but before it tests your worry level, your relief that the monkey's
inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.
*/
// Part 2
// ======

const part2 = input => {
    const monkeys = preprocessing(input)
    const lcm = multiplyAll(monkeys.map(monkey => monkey.testDivisor))
    let numRounds = 10000
    while (numRounds--) {
        doRoundP2Round(monkeys, lcm)
    }
    monkeys.sort((a, b) => b.inspections - a.inspections)
    return monkeys[0].inspections * monkeys[1].inspections
}

module.exports = { part1, part2 }
