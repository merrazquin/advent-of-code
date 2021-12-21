'use strict'

// Setup
const getMagnitude = pair => {
    const [left, right] = pair
    if (!isNaN(left) && !isNaN(right)) {
        return (left * 3) + (right * 2)
    }
    if (isNaN(left) && isNaN(right)) {
        return (getMagnitude(left) * 3) + (getMagnitude(right) * 2)
    }
    if (isNaN(left)) {
        return (getMagnitude(left) * 3) + (right * 2)
    }
    return (getMagnitude(right) * 2) + (left * 3)
}
const parseSnailfishNumber = str => JSON.parse(str).map(el => !isNaN(el) ? parseInt(el) : el)
const performExplosion = string => {
    let depth = 0
    let leftNumberIndex = -1

    let newString = string.slice()
    let arr = string.split('')
    for (let index = 0; index < arr.length; index++ ) {
        const char = arr[index]
        if (!isNaN(char) && depth == 5) {
            const pairResult = string.slice(index - 1).match(/\[\d+,\d+\]/)
            if (!pairResult) {
                process.exit('unexpected error occurred processing at', (index - 1), arr.slice(index - 1))
            }
            const pairStr = pairResult[0]
            const [left, right] = JSON.parse(pairStr)
            let centerIndex = index - 1
            let leftMod = 0
            // left
            if (leftNumberIndex != -1) {
                const leftNumberStr = string.slice(leftNumberIndex).match(/\d+/)[0]
                const leftReplacement = (parseInt(leftNumberStr) + left).toString()
                leftMod = leftReplacement.length - leftNumberStr.length
                newString = newString.substr(0, leftNumberIndex) + leftReplacement + newString.substr(leftNumberIndex + leftNumberStr.length)

                centerIndex += leftMod
            }

            // center
            newString = newString.substr(0, centerIndex) + '0' + newString.substr(centerIndex + pairStr.length)

            // right
            const rightNumberSearch = newString.slice(centerIndex + 1).match(/\d+/)
            if (rightNumberSearch) {
                const rightNumberStr = rightNumberSearch[0]
                const rightReplacement = (parseInt(rightNumberStr) + right).toString()
                newString = newString.substr(0, centerIndex + 1 + rightNumberSearch.index) + rightReplacement + newString.substr(centerIndex + 1 + rightNumberSearch.index + rightNumberStr.length)
            }

            // return after explosion has been processed
            return newString
        }
        switch (char) {
        case '[':
            depth++
            break
        case ']':
            // finalize right
            depth--
            break
        case ',':
            break
        default:
            if (leftNumberIndex != index - 1) {
                leftNumberIndex = index
            }
        }
    }
    return string
}
const performSplit = string => {
    const result = string.match(/\d{2}/)
    if (result) {
        const splitter = parseInt(result[0])
        const left = Math.floor(splitter / 2)
        const right = splitter - left
        return string.substr(0, result.index) + `[${left},${right}]` + string.substr(result.index + result[0].length)
    }
    return string
}
const reduceSnailfishNumber = (string, failsafe = 0) => {
    let newString = performExplosion(string)
    if (newString == string) {
        newString = performSplit(string)
    }
    if (failsafe > 1000) {
        process.exit()
    }
    if (string == newString) {
        return string
    }
    return reduceSnailfishNumber(newString, ++failsafe)
}
const snailfishAddition = string => {
    let numbers = string.trim().split('\n')
    let curr = reduceSnailfishNumber('[' + numbers.splice(0, 2).join(',') + ']')
    numbers.forEach(number => {
        curr = reduceSnailfishNumber('[' + curr + ',' + number + ']')  
    })
    return curr
}
const findMaxMagnitude = string => {
    let maxMag = 0
    let numbers = string.trim().split('\n')
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                let left = numbers[i]
                let right = numbers[j]

                let reduced = reduceSnailfishNumber('[' + left + ',' + right + ']')
                let magnitude = getMagnitude(JSON.parse(reduced))
                maxMag = Math.max(magnitude, maxMag)

                reduced = reduceSnailfishNumber('[' + right + ',' + left + ']')
                magnitude = getMagnitude(JSON.parse(reduced))
                maxMag = Math.max(magnitude, maxMag)
            }
        }
    }
    return maxMag
}
// Part 1
// ======

const part1 = input => {
    const finalSum = snailfishAddition(input)
    return getMagnitude(JSON.parse(finalSum))
}

// Part 2
// ======

const part2 = input => {
    return findMaxMagnitude(input)
}

module.exports = { part1, part2, getMagnitude, parseSnailfishNumber, performExplosion, performSplit, reduceSnailfishNumber, snailfishAddition }
