'use strict'

// Setup
const preprocessing = (input) => {
    const monkeys = input.trim().split('\n').map(monkey => {
        const [name, job] = monkey.split(': ')
        return {name, job}
    })

    return monkeys
}


// Part 1
// ======

const part1 = input => {
    const monkeys = preprocessing(input)
    let monkeysWithNumbers =  monkeys.filter(monkey => !isNaN(monkey.job))
    while (monkeysWithNumbers.length < monkeys.length) {
        monkeysWithNumbers.forEach(numberedMonkey => {
            monkeys.forEach(monkey => {
                if (isNaN(monkey.job) && monkey.job.includes(numberedMonkey.name)) {
                    monkey.job = monkey.job.replace(numberedMonkey.name, numberedMonkey.job)
                    try {
                        monkey.job = eval(monkey.job)
                    } catch (error) {
                        // die gracefully
                    }
                }
            })
        })
        monkeysWithNumbers =  monkeys.filter(monkey => !isNaN(monkey.job))
    }
    return monkeys.find(monkey => monkey.name == 'root').job
}

// Part 2
// ======

const part2 = input => {
    const monkeys = preprocessing(input)
    const rootMonkey = monkeys.find(monkey => monkey.name === 'root')
    // solve root first
    // if humn is encountered, stop
    
    let monkeysWithNumbers =  monkeys.filter(monkey => !isNaN(monkey.job))
    while (monkeysWithNumbers.length < monkeys.length) {
        monkeysWithNumbers.forEach(numberedMonkey => {
            monkeys.forEach(monkey => {
                if (isNaN(monkey.job) && monkey.job.includes(numberedMonkey.name)) {
                    monkey.job = monkey.job.replace(numberedMonkey.name, numberedMonkey.job)
                    try {
                        monkey.job = eval(monkey.job)
                    } catch (error) {
                        // die gracefully
                    }
                }
            })
        })
        monkeysWithNumbers =  monkeys.filter(monkey => !isNaN(monkey.job))
    }
    return rootMonkey.job
}

module.exports = { part1, part2 }
