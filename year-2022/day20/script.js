'use strict'

// Setup
const preprocessing = (input) => input.trim().split('\n').map((num, index) => {
    return {
        value: parseInt(num),
        originalIndex: index
    }
})

// Part 1
// ======
const move = (target, workingList) => {
    if (target.value == 0) {
        return workingList
    }
    const currentIndex = workingList.findIndex(item => item.originalIndex === target.originalIndex)
    let targetIndex = (currentIndex + target.value) % (workingList.length - 1)
    
    // remove from current position
    workingList.splice(currentIndex, 1)

    // add back to target position
    workingList.splice(targetIndex, 0, target)
    return workingList
}

const mixFile = (originalList) => {
    let workingList = originalList.slice()

    for (let i = 0; i < originalList.length; i++) {
        const target = originalList.find(item => item.originalIndex == i)
        workingList = move(target, workingList)
    }
    return workingList
}

const findNAfterZero = (list, n) => {
    const zeroIndex = list.findIndex(item => item.value === 0)
    const nthIndex = (zeroIndex + n) % list.length
    return list[nthIndex].value
}

const part1 = input => {
    const originalList = preprocessing(input)
    let mixedList = mixFile(originalList)
    return findNAfterZero(mixedList, 1000) + findNAfterZero(mixedList, 2000) + findNAfterZero(mixedList, 3000)
}

// Part 2
// ======
const part2 = input => {
    const originalList = preprocessing(input).map(item => {
        return {
            originalIndex: item.originalIndex,
            value: item.value * 811589153
        }
    })
    
    let mixedList = originalList
    let numRounds = 10
    while(numRounds--) {
        mixedList = mixFile(mixedList)
    }
    return findNAfterZero(mixedList, 1000) + findNAfterZero(mixedList, 2000) + findNAfterZero(mixedList, 3000)
}

module.exports = { part1, part2 }
