'use strict'

const { sumAll } = require('../../utils')

// Setup
const preprocessing = (input) => {
    const valves = {}
    input.trim().split('\n').forEach(valveData => {
        const [, valveName, , , , rate, , , , , ...connectedValves] = valveData.split(/(?:,? )|(?:;? )|=/)
        if (!valves[valveName]) {
            valves[valveName] = {
                name: valveName,
                isOpen: false,
                connectedValves: []
            }
        }
        valves[valveName].rate = parseInt(rate)

        connectedValves.forEach(connectedValve => {
            if (!valves[connectedValve]) {
                valves[connectedValve] = {
                    name: connectedValve,
                    isOpen: false,
                    rate: 0,
                    connectedValves: []
                } 
            }
            valves[valveName].connectedValves.push(valves[connectedValve])
        })
    })
    return valves
}


// Part 1
// ======

const part1 = input => {
    const valves = preprocessing(input)
    const valveArray = Object.values(valves)
    valveArray.forEach(valve => {
        valve.connectedValves.sort((valveA, valveB) => valveB.rate - valveA.rate)
    })
    valveArray.sort((valveA, valveB) => valveB.rate - valveA.rate)
    const valvesWithPressure = valveArray.filter(valve => valve.rate > 0)
    let minute = 1
    let totalPressure = 0
    // start at AA
    let currentValve = valves['AA']
    while (minute < 31) {
        console.log(`== Minute ${minute} ==`)
        minute++
        const openValves = valveArray.filter(valve => valve.isOpen)
        const minutePressure = sumAll(openValves.map(valve => valve.rate))
        totalPressure += minutePressure

        if (!openValves.length) {
            console.log('No valves are open.')
        } else {
            console.log(`Valve(s) ${openValves.map(valve => valve.name).join(', ')} are open, releasing ${minutePressure} pressure`)
        }

        if (currentValve.rate && !currentValve.isOpen) {
            // if the sum of closed neighbors is less than the rate, it makes sense to open it now
            if (currentValve.rate > sumAll(currentValve.connectedValves.map(valve => (valve.isOpen ? 0 : valve.rate)))) {
                currentValve.isOpen = true
                console.log(`You open valve ${currentValve.name}.`)
                console.log('')
                continue
            }
        }

        if (openValves.length === valvesWithPressure.length) {
            console.log('All valves have been opened')
            console.log('')
            continue
        }

        const nextValve = currentValve.connectedValves.find(valve => !valve.isOpen)
        if (nextValve) {
            console.log(`You move to valve ${nextValve.name}.`)
            currentValve = nextValve
        } else {
            console.log('need to find another way to move')
        }
        console.log('')
    }
    
    return totalPressure
}
// dd, bb, jj, hh, ee, cc

// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    return data
}

module.exports = { part1, part2 }
