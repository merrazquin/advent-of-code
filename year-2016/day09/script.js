'use strict'

const decompress = input => {
    let output = ''
    const markerRegex = /\((\d+)x(\d+)\)/
    let i = 0
    while (i < input.length) {
        if (input[i] === '(') {
            const marker = input.slice(i).match(markerRegex)
            const referencedData = marker.input.substr(marker[0].length, marker[1])
            output += referencedData.repeat(marker[2])
            i += marker[0].length + parseInt(marker[1])
        } else {
            output += input[i]
            i++
        }
    }
    return output
}    
// Part 1
// ======

const part1 = input => {
    return decompress(input.trim()).length
}

// Part 2
// ======

const part2 = input => {
    let output = decompress(input)
    while (output.indexOf('(') != -1) {
        output = decompress(output)
    }
    
    return output.length
}

module.exports = { part1, part2 }