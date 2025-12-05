'use strict'

const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => {
    const [ranges, ingredientIDs] = input.split('\n\n')

    return {
        ranges: ranges.split('\n').map(range => {
            const [lower, upper] = range.split('-').map(val => parseInt(val))
            return {lower, upper}
        }),
        ingredientIDs: ingredientIDs.split('\n').map(id => parseInt(id))
    }
}

const findRanges = (ranges, ingredientID) => {
    return ranges.filter(({lower, upper}) => lower <= ingredientID && ingredientID <= upper)
}

const normalizeRange = (ranges, range) => {
    const {lower, upper} = range
    const currIndex = ranges.indexOf(range)
    // find instances where range is fully enclosed in another range; remove those ranges
    if (ranges.some((range, index) => currIndex !== index && range.lower <= lower && upper <= range.upper)) {
        const index = ranges.indexOf(range)
        if (index != -1) {
            ranges.splice(index, 1)
        }
    }

    // find instances where a range partially encloses another range; expand one range and remove the other
    for (const otherRange of ranges) {
        if (otherRange === range) continue
        
        if (lower <= otherRange.lower && otherRange.lower <= upper && upper <= otherRange.upper) {
            otherRange.lower = lower
            const index = ranges.indexOf(range)
            if (index != -1) {
                ranges.splice(index, 1)
            }
        } else if (lower >= otherRange.lower && lower <= otherRange.upper && upper >= otherRange.upper) {
            otherRange.upper = upper
            const index = ranges.indexOf(range)
            if (index != -1) {
                ranges.splice(index, 1)
            }
        }
    }
    return ranges
}

// Part 1
// ======

const part1 = input => {
    const {ranges, ingredientIDs} =  preProcessing(input)
    return ingredientIDs.map(id => findRanges(ranges, id)).filter(ranges => ranges.length > 0).length
}

// Part 2
// ======

const part2 = input => {
    let {ranges, ingredientIDs} =  preProcessing(input)
    // normalize ranges
    for (const range of ranges.slice()) {
        ranges = normalizeRange(ranges, range)
    }
    console.log(`total ranges, ${ranges.length}`)
    return sumAll(ranges.map(({lower, upper}) => (upper-lower) + 1))
}

module.exports = { part1, part2 }
