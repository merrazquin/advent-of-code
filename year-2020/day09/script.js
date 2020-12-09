'use strict'

// Setup
// Part 1
// ======
const findPair = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        const diff = target - data[i]
        const diffIndex = data.indexOf(diff, i + 1)
        if (diffIndex !== -1) {
            return true
        }
    }
    return false
}
const part1 = (input, preambleSize = 25) => {
    const xmas = input.split('\n').map(num => parseInt(num))
    for (var i = preambleSize; i < xmas.length; i++) {
        if (!findPair(
            xmas.slice(i - preambleSize, i),
            xmas[i]
        )) {
            return xmas[i]
        }
    }
}

// Part 2
// ======
const part2 = (input, preambleSize = 25) => {
    const target = part1(input, preambleSize)
    let nums = []
    let tally = 0
    const xmas = input.split('\n').map(num => parseInt(num))
    for (let index = 0; index < xmas.length; index++) {
        const num = xmas[index]
        while (tally > target) {
            tally -= nums.shift()
        }
        if (tally == target) {
            nums = nums.sort((a, b) => a-b)
            return nums[0] + nums[nums.length - 1]
        }
        nums.push(num)
        tally += num
    }
}

module.exports = { part1, part2 }
// 12:32 AM
// 12:42 AM