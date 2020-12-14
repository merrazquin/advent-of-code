'use strict'

// Setup

const preprocessing = (input, ignoreX = true, sortAndStrip = true) => {
    let earliestDeparture = 0
    let viableBusses = []
    input.split('\n').map((line, index) => {
        if (index === 0) {
            earliestDeparture = parseInt(line)
        }
        viableBusses = line.split(',')
            .map(num => {
                if (!ignoreX && num == 'x') return num
                else return parseInt(num)
            })
            .filter(num => (!ignoreX || !isNaN(num)))
    })

    if (sortAndStrip) {
        viableBusses = viableBusses.filter(num => num < earliestDeparture)
            .sort((a, b) => b - a)
    }

    return {
        earliestDeparture, 
        viableBusses
    }
}

// Part 1
// ======

const part1 = input => {
    const {earliestDeparture, viableBusses} = preprocessing(input)
    let earliest = Math.floor(earliestDeparture / viableBusses[0])
    return (
        (
            (
                (earliest + 1) * viableBusses[0]
            ) - earliestDeparture
        ) * viableBusses[0]
    )
}

// Part 2
// ======
// credit to Cecil, Matt, and Camden... I still have no idea what this black box does, but it works and it's _FAST_
const part2 = input => {
    const busses = preprocessing(input, false, false).viableBusses
    let cycle = busses[0]
    let solvedIndex = 0

    let t = cycle

    while (solvedIndex < busses.length - 1) {
        let nextIndex = solvedIndex + 1
        if (busses[nextIndex] === 'x') 
            solvedIndex = nextIndex
        else if ((t + nextIndex) % busses[nextIndex] === 0){
            solvedIndex = nextIndex
            cycle *= busses[nextIndex]
        } else {
            t += cycle
        }
    }

    return t
}

module.exports = { part1, part2 }
