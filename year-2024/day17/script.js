'use strict'

// Setup
const preProcessing = input => {
    let [registers, program] = input.split('\n\n')
    program = program.replace('Program: ', '').split(',').map(num => parseInt(num))
    registers = registers.split('\n').map(register => register.replace('Register ', '').split(': '))
    const registerObj = {A: 0, B: 0, C: 0}
    registers.forEach(register => {
        const [id, value] = register
        registerObj[id] = parseInt(value)
    });
    return {
        pointer: 0,
        output: [],
        ...registerObj,
        program
    }
}

// Part 1
// ======
const getCombo = (combo, computer) => {
    let val = combo
    switch (combo) {
        case 4:
            val = computer.A
            break
        case 5:
            val = computer.B
            break;
        case 6:
            val = computer.C
            break;
        case 7:
            console.log('combo of 7 found')
            process.exit()
            break;
    }
    return val
}

const adv = (computer, operand) => {
    computer.A = Math.floor(computer.A / Math.pow(2, getCombo(operand, computer)))
    computer.pointer += 2
}
const bxl = (computer, operand) => {
    computer.B = computer.B ^ operand
    computer.pointer += 2
}
const bst = (computer, operand) => {
    computer.B = getCombo(operand, computer) % 8
    computer.pointer += 2
}

const jnz = (computer, operand) => {
    if (computer.A !== 0) {
        computer.pointer = operand
    } else {
        computer.pointer += 2
    }
}

const bxc = (computer, operand) => {
    computer.B = computer.B ^ computer.C
    computer.pointer += 2
}

const out = (computer, operand) => {
    computer.output.push(getCombo(operand, computer) % 8)
    computer.pointer += 2
}

const bdv = (computer, operand) => {
    computer.B = Math.floor(computer.A / Math.pow(2, getCombo(operand, computer)))
    computer.pointer += 2
}

const cdv = (computer, operand) => {
    computer.C = Math.floor(computer.A / Math.pow(2, getCombo(operand, computer)))
    computer.pointer += 2
}

const opcodes = {
    0: adv,
    1: bxl,
    2: bst,
    3: jnz,
    4: bxc,
    5: out,
    6: bdv,
    7: cdv
}


const part1 = input => {
    const computer = preProcessing(input)

    while (computer.pointer < computer.program.length - 1) {
        const [opcode, operand] = computer.program.slice(computer.pointer, computer.pointer + 2)
        opcodes[opcode](computer, operand)
    }

    return {computer, output: computer.output.join(',')}
}

// Part 2
// ======

const part2 = input => {
    const computer = preProcessing(input)
}

module.exports = { part1, part2 }