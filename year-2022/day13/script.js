'use strict'

// Setup
const preprocessing = (input) => {
    const pairs = input.trim().split('\n\n').map(pair => {
        const [left, right] = pair.split('\n').map(side => JSON.parse(side))
        return {left, right}
    })
    return pairs
}

const normalize = (left, right) => {
    if (Number.isInteger(left) && !Number.isInteger(right)) {
        return {
            left: [left],
            right
        }
    } else if (Number.isInteger(right) && !Number.isInteger(left)) {
        return {
            left,
            right: [right]
        }
    }

    return {
        left, right
    }
}

const compare = (left, right) => {
    
    // If the left list runs out of items first, the inputs are in the right order
    if (left == undefined) return true

    // If the right list runs out of items first, the inputs are not in the right order
    if (right == undefined) return false
    
    let normalized = normalize(left, right)
    left = normalized.left
    right = normalized.right

    if (Number.isInteger(left) && Number.isInteger(right)) {
        if (left === right) {
            return -1
        }
        return left < right
    } 

    for (let index = 0; index < left.length; index++) {
        const comparison = compare(left[index], right[index])
        if (comparison !== -1){
            return comparison
        }
    }
    
    // If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
    if (JSON.stringify(left) === JSON.stringify(right)) {
        return -1
    }

    return (left.length <= right.length)
}
// Part 1
// ======

const part1 = input => {
    const data = preprocessing(input)
    let pairSum = 0
    data.forEach((pair, pairIndex) => {
        const {left, right} = pair
        const inOrder = compare(left, right)
        pairSum += inOrder ? (pairIndex + 1) : 0
    })
    
    return pairSum
}

// Part 2
// ======

const part2 = input => {
    let data = input.replace(/\n\n/g, '\n').split('\n')
    data.push('[[2]]', '[[6]]')

    data = data.map(input => JSON.parse(input))
    data.sort((a, b) => compare(a, b) ? -1 : 1)
    const flattenedData = data.map(input => JSON.stringify(input))
    return (flattenedData.indexOf('[[2]]') + 1) * (flattenedData.indexOf('[[6]]') + 1)
}

module.exports = { part1, part2, compare }