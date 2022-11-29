const toggleInstruction = instruction => {
    const instructionParts = instruction.split(' ')
    const [operation, operand1, operand2] = instructionParts

    switch (operation) {
    case 'tgl':
    case 'dec':
        instruction = 'inc ' + operand1
        break
    case 'inc':
        instruction = 'dec ' + operand1
        break
    case 'cpy':
        instruction = 'jnz ' + operand1 + ' ' + operand2
        break
    case 'jnz':
        instruction = 'cpy ' + operand1 + ' ' + operand2
        break
    }
    return instruction
}

const processInstructions = (input, registers = {}) => {
    const instructions = input.trim().split('\n')
    let index = 0
    do {
        // console.log(registers)
        // console.log(instructions[index])
        const instructionParts = instructions[index].split(' ')
        const [operation, operand1, operand2] = instructionParts

        if (isNaN(parseInt(operand1)) && !registers[operand1]) {
            registers[operand1] = 0
        }
        if (operand2 != undefined && isNaN(parseInt(operand2)) && !registers[operand2]) {
            registers[operand2] = 0
        }

        switch (operation) {
        case 'tgl': {
            let steps = parseInt(operand1) 
            if (isNaN(steps)) {
                steps = registers[operand1]
            }
            const targetRuleIndex = index + steps
            if (targetRuleIndex >= 0 && targetRuleIndex < instructions.length) {
                // console.log('toggling instruction', index + steps)
                // console.log('before', instructions)
                instructions.splice(targetRuleIndex, 1, toggleInstruction(instructions[targetRuleIndex]))                
                // console.log('after', instructions)
            } else {
                // console.log('no instruction to toggle at', targetRuleIndex)
            }
            index++
            break
        }
        case 'cpy': {
            let val = parseInt(operand1)
            if (isNaN(val)) {
                val = registers[operand1]
            }
            if (isNaN(parseInt(operand2))) {
                registers[operand2] = val
            }
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
                index += (parseInt(operand2) || registers[operand2])
            } else {
                index++
            }
            break
        }
        default:
            index++
        }

    } while (index > 0 && index < instructions.length)    
    return registers
}
// Part 1
// ======

const part1 = (input, registers = {a: 7}) => {
    return processInstructions(input, registers)['a']
}

// Part 2
// ======

const part2 = input => {
    return processInstructions(input, {a: 12})['a']
}

module.exports = { part1, part2 }