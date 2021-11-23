'use strict'

// Part 1
// ======

const part1 = input => {
    const ranges = input.trim('').split('\n').map(range => range.split('-')).map(range => ({
        min: parseInt(range[0]),
        max: parseInt(range[1])
    })
    ).sort((a, b) => a.min - b.min)
    
    let i = ranges[0].min - 1
    // console.log(i)
    if (i >= 0) {
        // console.log('i >= 0', (i >= 0))
        return i
    }
    i = 0
    while (i >= 0 && i <= 4294967295) {
        // console.log(i)
        if (!ranges.some(range => (i >= range.min && i <= range.max))) {
            return i
        }
        i++
    }
    return i
}

// Part 2
// ======

const part2 = (input, upperRange = 4294967295) => {
    const ranges = input.trim('').split('\n').map(range => range.split('-')).map(range => ({
        min: parseInt(range[0]),
        max: parseInt(range[1])
    })
    ).sort((a, b) => a.min - b.min)

    // const condensedRanges = []
    // let currentRange = ranges[0]
    // for (let i = 1; i < ranges.length; i++) {
    //     const nextRange = ranges[i]
    //     if (currentRange.max >= nextRange.min) {
    //         currentRange.max = nextRange.max
    //     } else {
    //         condensedRanges.push(currentRange)
    //         currentRange = nextRange
    //     }
    // }
    // condensedRanges.push(currentRange)
    // condensedRanges.sort((a, b) => a.min - b.min)

    // let count = condensedRanges[0].min
    // console.log(count)
    // for (let i = 1; i < condensedRanges.length; i++) {
    //     const currentRange = condensedRanges[i]
    //     const previousRange = condensedRanges[i-1]
    //     console.log(previousRange, currentRange, (currentRange.min - previousRange.max - 1))
    //     count += (currentRange.min - previousRange.max - 1)
    //     // console.log(count)
    // }
    
    // count += upperRange - ranges[ranges.length -1].max
    // console.log(count)
    
    let i = 0
    let count = 0
    while (i >= 0 && i <= upperRange) {
        // console.log(i)
        if (!ranges.some(range => (i >= range.min && i <= range.max))) {
            count++
        }
        i++
    }
    return count
}


module.exports = { part1, part2 }