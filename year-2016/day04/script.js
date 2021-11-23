'use strict'

const validRoom = roomString => {
    const [names, sectorId, checksum] = roomString.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/).slice(1)
    const letters = names.split('-').join('').split('').sort()
    const letterMap = letters.reduce((acc, curr) => {
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

    return checksum === sortedLetters.slice(0, 5).join('') ?  parseInt(sectorId) : 0
}

const decryptName = roomString => {
    if (!validRoom(roomString)) {
        return ['', 0]
    }
    const [names, sectorId] = roomString.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/).slice(1)
    const letters = names.split('')
    const decryptedName = letters.reduce((acc, curr) => {
        if (curr == '-') return acc + ' '
        const charCode = curr.charCodeAt(0)
        let newChar = String.fromCharCode(charCode + parseInt(sectorId % 26))
        if (charCode + parseInt(sectorId % 26) > 122) {
            newChar = String.fromCharCode(charCode + parseInt(sectorId % 26) - 26)
        }
        return acc + newChar
    }, '')
    return [decryptedName, sectorId]
}
// Part 1
// ======

const part1 = input => {
    return input.trim().split('\n').reduce((acc, curr) => acc + validRoom(curr), 0)
}

// Part 2
// ======

const part2 = input => {
    input.trim().split('\n').forEach(roomString => console.log(decryptName(roomString)))
    return decryptName(input)
}

module.exports = { part1, part2, validRoom }