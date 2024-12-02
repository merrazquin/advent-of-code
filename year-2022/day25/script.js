'use strict'

const { sumAll } = require('../../utils')
const pows = [
    1,      //0
    5,      //1
    25,     //2
    125,    //3
    625,    //4
    3125    //5
]
const maxes = [
    2,
    12,
    62,
    312,
    1562,
    7812
]
// Setup
const preprocessing = (input) => input.trim().split('\n')

const convertSNAFU = snafu =>  sumAll(snafu.split('')
    .reverse()
    .map(num => (num == '-' ? -1 : (num == '=' ? -2 : parseInt(num))))
    .map((num, index) => Math.pow(5, index) * num)
)

const convertToSNAFU = decimal => {
    if (decimal < 5) {
        switch(decimal) {
        case 4: return '1-'; break
        case 3: return '1='; break
        case 2:
        case 1: 
        case 0: return decimal.toString(); break
        }
    }
    const remainders = [0, 1, 2, -2, -1]
    const places = []
    while (decimal != 0) {
        let remainder = decimal % 5

        if (remainder < 3) {
            places.push(remainder)
            decimal -= remainder
        } else {
            places.push(remainder == 3 ? '=' : '-')
        }

        if (decimal == 0) {
            return places.join('')
        }

        decimal /= 5
    }
}

const findSNAFU = (decimal) => {
    // 20 places 
    const baseString = '0'.repeat(20)
    const permutation = baseString.split('')
    const permutations = []
    const options = ['0', '1', '2', '-', '=']
    options.forEach(option => {
        const snafu = option.repeat(20)
        if (convertSNAFU(snafu == decimal)) {
            return snafu
        }
    })
    for (let index = 0; index < baseString.length; index++) {
        
    }
    /*
    2, 1, 0 for index of 0
    */
    return null    
}
// Part 1
// ======
const part1 = input => {
    const sum = sumAll(preprocessing(input).map(snafu => convertSNAFU(snafu)))
    console.log(sum)
    
}
// decimal answer 34978907874317
// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    return data
}

module.exports = { part1, part2, convertSNAFU, convertToSNAFU }
