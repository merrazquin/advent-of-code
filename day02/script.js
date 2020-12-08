'use strict'

const passwordRegEx = new RegExp(/([0-9]+)-([0-9]+) ([a-z]): (.*)/)


// Part 1
// ======

const part1 = input => {
    let valid = 0
    input.split('\n')
        .forEach(str => {
            let [min, max, letter, password] = passwordRegEx.exec(str)?.slice(1)
            min = parseInt(min)
            max = parseInt(max)

            const passwordArray = password.split('')
            const instancesOfLetter = passwordArray.filter(char => char === letter).length

            if (instancesOfLetter >= min && instancesOfLetter <= max) {
                valid++
            }
        })
    return valid
}

// Part 2
// ======

const part2 = input => {
    let valid = 0
    input.split('\n')
        .forEach(str => {
            let [min, max, letter, password] = passwordRegEx.exec(str)?.slice(1)
            min = parseInt(min)
            max = parseInt(max)

            const pos1valid = password.charAt(min - 1) === letter
            const pos2valid = password.charAt(max - 1) === letter

            if (pos1valid != pos2valid) {
                valid++
            }
        })
    return valid
}

module.exports = { part1, part2 }
