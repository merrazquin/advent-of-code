'use strict'

// Setup
const preProcessing = input => {
    const computer = {
        pointer: 0,
        program: input.split(',').map(val => parseInt(val))
    }
    return computer
}

const add = (computer, pos1, pos2, pos3) => {
    computer.program[pos3] = computer.program[pos1] + computer.program[pos2]
    computer.pointer += 4
}
const mult = (computer, pos1, pos2, pos3) => {
    computer.program[pos3] = computer.program[pos1] * computer.program[pos2]
    computer.pointer += 4
}

const opcodes = {
    1: add,
    2: mult
}

// Part 1
// ======
const runProgram = computer => {
    computer.pointer = 0

    let opcode = computer.program[computer.pointer]
    while (opcode !== 99) {
        const [input1, input2, output] = computer.program.slice(computer.pointer + 1, computer.pointer + 4)
        opcodes[opcode](computer, input1, input2, output)
        opcode = computer.program[computer.pointer]
    }
    return computer.program
}
const part1 = input => {
    const computer = preProcessing(input)
    computer.program[1] = 12
    computer.program[2] = 2
    return runProgram(computer)[0]
}

// Part 2
// ======

const part2 = input => {
    const computer = preProcessing(input)
    const originalProgram = computer.program.slice()

    
    let noun, verb
    for (noun = 0; noun <= 99; noun++) {
        for (verb = 0; verb <= 99; verb++) {
            computer.pointer = 0
            computer.program = originalProgram.slice()
            computer.program[1] = noun
            computer.program[2] = verb

            let opcode = computer.program[computer.pointer]
            while (opcode !== 99 && computer.pointer < computer.program.length) {
                const [input1, input2, output] = computer.program.slice(computer.pointer + 1, computer.pointer + 4)
                opcodes[opcode](computer, input1, input2, output)
                opcode = computer.program[computer.pointer]
            }
            if (computer.program[0] === 19690720) {
                return 100 * noun + verb
            }
        }
    }
}

module.exports = { part1, part2, preProcessing, runProgram }
