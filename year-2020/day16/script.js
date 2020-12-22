'use strict'
const {sumAll, solveLogicPuzzle} = require('../../utils')

// Setup

const preprocessing = input => {
    const ruleReg = /^(.*): (\d+)-(\d+) or (\d+)-(\d+)$/

    let [fieldRules, myTicket, nearbyTickets] = input.split('\n\n')
    fieldRules = fieldRules.split('\n').map(rule => {
        let [field, min1, max1, min2, max2] = ruleReg.exec(rule).slice(1)
        return {
            field,
            range1: {
                min: parseInt(min1),
                max: parseInt(max1)
            },
            range2: {
                min: parseInt(min2),
                max: parseInt(max2)
            }
        }
    })

    myTicket = myTicket.split('\n').pop().split(',').map(field => parseInt(field))

    nearbyTickets = nearbyTickets.split('\n').slice(1).map(ticket => ticket.split(',').map(Number))

    return {
        fieldRules,
        myTicket,
        nearbyTickets
    }
}

// Part 1
// ======
const inRange = (value, min, max) => {
    return value >= min && value <= max
}

const isValueValid = (value, fields) => {
    let isValid = false
    fields.forEach(field => {
        const { range1, range2 } = field
        if (inRange(value, range1.min, range1.max) || inRange(value, range2.min, range2.max)) {
            isValid = true
        }
    })
    return isValid
}
const isTicketValid = (ticket, fields) => {
    return ticket.every(field => isValueValid(field, fields))
}

const part1 = (input) => {
    const {fieldRules, nearbyTickets} = preprocessing(input)
    const invalids = nearbyTickets.join(',').split(',').map(num => parseInt(num)).filter(val => {
        return !isValueValid(val, fieldRules)
    })
    return sumAll(invalids)
}

// Part 2
// ======
const isViablePosition = (positionValues, field) => {
    return positionValues.every(value => isValueValid(value, [field]))
}
// TODO move logic puzzle solver into utils (look at Day 21)
const part2 = (input) => {
    const {fieldRules, myTicket, nearbyTickets} = preprocessing(input)
    const tickets = nearbyTickets.filter(ticket => isTicketValid(ticket, fieldRules))
    const numFields = fieldRules.length
    let mapping = {}
    fieldRules.forEach(range => {
        mapping[range.field] = []
        for (let fieldNum = 0; fieldNum < numFields; fieldNum++) {
            const column = tickets.map(ticket => ticket[fieldNum])
            if (isViablePosition(column, range)) {
                mapping[range.field].push(fieldNum)
            }
        }
    })
    mapping = solveLogicPuzzle(mapping)

    let product = 1
    for (let fieldName in mapping) {
        const position = mapping[fieldName]
        if (fieldName.includes('departure')) {
            product *= myTicket[position]
        }
    }

    return product
}

module.exports = { part1, part2 }
