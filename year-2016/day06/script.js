'use strict'


// Part 1
// ======
const getMessageColumns = input => {
    const cols = []
    for (var i = 0; i < input.trim().split('\n')[0].length; i++) {
        cols.push([])
    }    
    input.trim().split('\n').forEach(row => row.trim().split('').forEach((col, index) => cols[index].push(col)))
    return cols
}
const part1 = input => {
    const columns = getMessageColumns(input)
    let message = ''
    columns.forEach(col => {
        const letterMap = col.reduce((acc, curr) => {
            if (!acc[curr]) {
                acc[curr] = 0
            }
            acc[curr]++
            return acc
        }, {})
        const sortedLetters = Object.keys(letterMap).sort((a, b) => {
            if (letterMap[a] === letterMap[b]) {
                return a < b ? -1 : 1
            }
            return letterMap[a] > letterMap[b] ? -1 : 1
        })
        message += sortedLetters[0]
        
    })
    return message
}

// Part 2
// ======

const part2 = input => {
    const columns = getMessageColumns(input)
    let message = ''
    columns.forEach(col => {
        const letterMap = col.reduce((acc, curr) => {
            if (!acc[curr]) {
                acc[curr] = 0
            }
            acc[curr]++
            return acc
        }, {})
        const sortedLetters = Object.keys(letterMap).sort((a, b) => {
            if (letterMap[a] === letterMap[b]) {
                return a > b ? -1 : 1
            }
            return letterMap[a] < letterMap[b] ? -1 : 1
        })
        message += sortedLetters[0]
        
    })
    return message    
}

module.exports = { part1, part2, getMessageColumns }