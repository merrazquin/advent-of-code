'use strict'

// TODO: repurpose for intcode computer?
const processInstructions = (input, registers = {}) => {
    const instructions = input.trim().split('\n')
    let index = 0
    do {
        const instructionParts = instructions[index].split(' ')
        const [operation, operand1, operand2] = instructionParts

        if (isNaN(parseInt(operand1)) && !registers[operand1]) {
            registers[operand1] = 0
        }
        if (operand2 != undefined && isNaN(parseInt(operand2)) && !registers[operand2]) {
            registers[operand2] = 0
        }

        switch (operation) {
        case 'cpy': {
            let val = parseInt(operand1)
            if (isNaN(val)) {
                val = registers[operand1]
            }
            registers[operand2] = val
            index++
            break
        }
        case 'inc':
            registers[operand1]++
            index++
            break
        case 'dec':
            registers[operand1]--
            index++
            break
        case 'jnz': {
            let jumpCondition = parseInt(operand1)
            if (isNaN(jumpCondition)) {
                jumpCondition = parseInt(registers[operand1])
            }
            if (jumpCondition != 0) {
                index += parseInt(operand2)
            } else {
                index++
            }
            break
        }
        }

    } while (index > 0 && index < instructions.length)    
    return registers
}
// Part 1
// ======

const part1 = input => {
    return processInstructions(input)['a']
}

// Part 2
// ======

const part2 = input => {
    return processInstructions(input, {c: 1})['a']
}

module.exports = { part1, part2 }