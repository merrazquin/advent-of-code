'use strict'

const {memoize, sumAll} = require('../../utils')
// Setup
const preProcessing = input => input.split('\n').map(secret => BigInt(secret))

// Part 1
// ======
const _mix = (secret, nextSecret) => {
    return secret ^ nextSecret
}

const _prune = secret => {
    return secret % 16777216n
}

const _getNextSecret = secret => {
    // multiply by 64 and mix & prune
    let nextSecret = mix(secret, secret * 64n)
    nextSecret = prune(nextSecret)

    // divide by 32 and mix & prune
    nextSecret = mix(nextSecret, nextSecret / 32n)
    nextSecret = prune(nextSecret)

    // multiply by 2048 and mix & prune
    nextSecret = mix(nextSecret, nextSecret * 2048n)
    return prune(nextSecret)
}

const mix = memoize(_mix)
const prune = memoize(_prune)
const getNextSecret = memoize(_getNextSecret)

const part1 = input => {
    const secrets = preProcessing(input)

    return sumAll(secrets.map(secret => {
        let i = 0
        while (i < 2000) {
            i++
            secret = getNextSecret(secret)
        }
        return parseInt(secret)
    }))
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input)
}

module.exports = { part1, part2, getNextSecret }
