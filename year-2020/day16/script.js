'use strict'
const {sumAll} = require('../../utils')

// Setup

const preprocessing = input => {
    return input.split('\n\n')
}

// Part 1
// ======
const inRange = (value, min, max) => {
    return value >= min && value <= max
}

const isValueValid = (value, fields) => {

    let isValid = false
    fields.forEach(field => {
        const { fieldName, range1, range2 } = field
        if (inRange(value, range1.min, range1.max) || inRange(value, range2.min, range2.max)) {
            isValid = true
        }
    });
    return isValid
}
// (.*): (\d+)-(\d+) or (\d+)-(\d+)
const prodRanges = () => {
    const ranges = []
    ranges.push('<redacted>')
    return ranges
}
const testRanges = () => {
    const ranges = []
    ranges.push({field: 'class', range1: {min:1, max:3}, range2:{min:5, max:7}})
    ranges.push({field: 'row', range1: {min:6, max:11}, range2:{min:33, max:44}})
    ranges.push({field: 'seat', range1: {min:13, max:40}, range2:{min:45, max:50}})
    return ranges
}
const testRanges2 = () => {
    const ranges = []
    ranges.push({field: 'class', range1: {min:0, max:1}, range2:{min:4, max:19}})
    ranges.push({field: 'row', range1: {min:0, max:5}, range2:{min:8, max:19}})
    ranges.push({field: 'seat', range1: {min:0, max:13}, range2:{min:16, max:19}})
    return ranges    
}
const testTickets = () => {
    const tix = 
`7,3,47
40,4,50
55,2,20
38,6,12`
return tix.split('\n').map(row => {
    return row.split(',')
}).join(',').split(',').map(num => parseInt(num))
}
const prodTickets = () => {
}
const prodTickets2 = () => {
    return ['<redacted>']
}

const part1 = (input, debug = false) => {
    const ranges = debug ? testRanges() : prodRanges()
    const tickets = debug ? testTickets() : prodTickets()
    const invalids = tickets.filter(val => {
        return !isValueValid(val, ranges)
    })
    // return preprocessing(input)
    return sumAll(invalids)
}

// Part 2
// ======
const isViablePosition = (positionValues, field) => {
    return positionValues.every(value => isValueValid(value, [field]))
    
}
const removePositionFromAllExcept = (position, mapping, except) => {
    const newMapping = {}
    for (let fieldName in mapping) {
        let positions = mapping[fieldName];
        if (fieldName != except) {
            const index = positions.indexOf(position)
            if (index != -1) {
                positions.splice(index, 1)
            }
        }
        newMapping[fieldName] = positions
    }
    return newMapping
}
const part2 = (input, debug = false) => {
    const ranges = debug ? testRanges2() : prodRanges()
    const tickets = (debug ? testTickets2() : prodTickets2()).filter(ticket => isTicketValid(ticket, ranges))
    const numFields = ranges.length
    let mapping = {}
    ranges.forEach(range => {
        mapping[range.field] = []
        for (let fieldNum = 0; fieldNum < numFields; fieldNum++) {
            const column = tickets.map(ticket => ticket[fieldNum])
            if (isViablePosition(column, range)) {
                mapping[range.field].push(fieldNum)
            }
        }
    })

    while (true) {
        let breakout = true
        for (let fieldName in mapping) {
            const positions = mapping[fieldName];
            if (positions.length == 1) {
                // strip position from all but fieldName
                mapping = removePositionFromAllExcept(positions[0], mapping, fieldName)
            } else {
                breakout = false
            }
        }
        if (breakout) {
            break
        }
    }
    
    const myTicket = '<redacted>'
    let product = 1
    for (let fieldName in mapping) {
        if (mapping.hasOwnProperty(fieldName)) {
            const position = mapping[fieldName];
            if (fieldName.includes('departure')) {
                console.log('adding', fieldName, '(',position,')', 'with value of', myTicket[position])
                product *= myTicket[position]
            }
        }
    }
    return product
}

module.exports = { part1, part2 }
