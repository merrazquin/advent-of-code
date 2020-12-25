'use strict'

// Setup

const preprocessing = input => {
    const [cardPublicKey, doorPublicKey] = input.split('\n').map(publicKey => parseInt(publicKey))
    return {
        cardPublicKey,
        doorPublicKey
    }
}

// Part 1
// ======
const transform = (subjectNumber, loopSize) => {
    let value = subjectNumber
    while (--loopSize) {
        // set the value to itself multiplied by the subject number
        // set the value to the remainder after dividing the value by 20201227
        value *= subjectNumber
        value = value % 20201227
    }
    return value
}
const getLoopSize = (publicKey, subjectNumber = 7) => {
    let value = subjectNumber
    let loop = 1
    while (value != publicKey) {
        value *= subjectNumber
        value = value % 20201227
        loop++
    }
    return loop
}

const part1 = input => {
    const { cardPublicKey, doorPublicKey } = preprocessing(input)
    const cardLoopSize = getLoopSize(cardPublicKey, 7)
    return transform(doorPublicKey, cardLoopSize)
}

module.exports = { part1 }
