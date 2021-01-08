'use strict'

// Setup

const preprocessing = input => {
    return input.split('\n')
}

// Part 1
// ======
const computer = (instructions, currentOffset = 0, a = 0, b = 0) => {
    let register
    while (currentOffset < instructions.length) {
        const instruction = instructions[currentOffset]
        let [operation, ...operands] = instruction.replace(',', '').split(' ')
        switch(operation) {
            case 'inc':
                register = operands.shift()
                if (register === 'a') {
                    a++
                } else {
                    b++
                }
                currentOffset++
                break
            case 'hlf':
                register = operands.shift()
                if (register === 'a') {
                    a = Math.floor(a / 2)
                } else {
                    b = Math.floor(b / 2)
                }
                currentOffset++
                break
            case 'tpl':
                register = operands.shift()
                if (register === 'a') {
                    a *= 3
                } else {
                    b *= 3
                }
                currentOffset++
                break
            case 'jmp':
                currentOffset += parseInt(operands.shift());
                break
            case 'jie':
                let [regE, offsetE] = operands
                register = regE === 'a' ? a : b
                if (register % 2 == 0) currentOffset += parseInt(offsetE)
                else currentOffset++
                break
            case 'jio':
                let [regO, offsetO] = operands
                register = regO === 'a' ? a : b
                if (register == 1) currentOffset += parseInt(offsetO)
                else currentOffset++
                break
        }
    }
    return {a, b}    
}
const part1 = input => {
    return computer(preprocessing(input))
}

// Part 2
// ======

const part2 = input => {
    return computer(preprocessing(input), 0, 1)

}
module.exports = { part1, part2 }
