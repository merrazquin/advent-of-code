'use strict'
const cache = {}
const chunkComputers = input => {
    const instructions = input.trim().split('\n')
    const computers = []
    let currentComputer = [instructions.shift()]
    while (instructions.length) {
        let nextInstruction = instructions.shift()
        while (instructions.length && nextInstruction.indexOf('inp') === -1) {
            currentComputer.push(nextInstruction)
            nextInstruction = instructions.shift()
        }
        computers.push(currentComputer)

        if (instructions.length) {
            currentComputer = [nextInstruction]
        } else {
            currentComputer.push(nextInstruction)
        }

    }
    return computers
}
// Setup
const processInstructions = (modelNumber, input, initRegisters = {w: 0, x: 0, y: 0, z: 0}) => {
    let registers = Object.assign({}, initRegisters)
    const instructions = input.trim().split('\n')
    // console.log(modelNumber)
    const digits = modelNumber.toString().split('').map(digit => parseInt(digit))
    // instructions.forEach((instruction, index) => {
    for(let index = 0; index < instructions.length; index++) {
        let instruction = instructions[index]
        let key = `${index}_${instruction}_${registers.w}_${registers.z}`
        if (cache[key]) {
            registers = Object.assign({}, cache[key])
            continue
        }
        let [command, a, b] = instruction.split(' ')
        switch (command) {
            case 'initA':
                registers.x = registers.z % 26 + parseInt(a)
                registers.y = 0

                registers.x = (registers.x != registers.w) ? 1 : 0
                registers.z *= (registers.x * 25) + 1
                registers.y = (registers.w + parseInt(b)) * registers.x
                registers.z += registers.y
                break
            case 'initB':
                registers.x = registers.z % 26 + parseInt(a)
                registers.y = 0
                registers.z = Math.floor(registers.z / 26)
                
                registers.x = (registers.x != registers.w) ? 1 : 0
                registers.z *= (registers.x * 25) + 1
                registers.y = (registers.w + parseInt(b)) * registers.x
                registers.z += registers.y
                break
            case 'isXnotW':
                break
            case 'inp':
                if (!digits.length) {
                    console.log(index, 'ran out of digits, unable to assign', a)
                    process.exit()
                }
                registers[a] = digits.shift()
                break;
            case 'add':
                b = isNaN(parseInt(b)) ? registers[b] : parseInt(b)
                registers[a] = registers[a] + b
                break
            case 'mul':
                b = isNaN(parseInt(b)) ? registers[b] : parseInt(b)
                registers[a] = registers[a] * b
                break
            case 'div':
                b = isNaN(parseInt(b)) ? registers[b] : parseInt(b)
                if (b == 0) {
                    console.log(index, 'div by zero', instruction, registers[a], b)
                    process.exit()
                }
                registers[a] = Math.floor(registers[a] / b)
                break
            case 'mod':
                b = isNaN(parseInt(b)) ? registers[b] : parseInt(b)
                if (registers[a] < 0 || b <= 0) {
                    console.log(index, 'invalid mod', instruction, registers[a], b)
                    process.exit()
                }
                registers[a] = registers[a] % b
                break
            case 'eql':
                b = isNaN(parseInt(b)) ? registers[b] : parseInt(b)
                registers[a] = (registers[a] === b) ? 1 : 0
            default:
                break;
        }
        cache[key] = Object.assign({}, registers)
        // console.log('   ',instruction, registers)
    }
    // })

    return registers
}
const nextModelNumber = modelNumber => {
    modelNumber--
    let zeroIndex = modelNumber.toString().indexOf('0')
    if (zeroIndex !== -1 && zeroIndex > 0) {
        const modelNumArr = modelNumber.toString().split('')
        modelNumArr[zeroIndex] = 9
        let toTheLeftInd = zeroIndex - 1
        let toTheLeft = parseInt(modelNumArr[toTheLeftInd])
        while (toTheLeft === 1) {
            modelNumArr[toTheLeftInd] = 9
            toTheLeftInd--
            toTheLeft = parseInt(modelNumArr[toTheLeftInd])
        }
        modelNumArr[toTheLeftInd] = toTheLeft - 1
        modelNumber = parseInt(modelNumArr.join(''))
        // console.log(modelNumber)
    }
   
    return modelNumber
}
// Part 1
// ======

const part1 = input => {

    let modelNumber = parseInt('9'.repeat(14))
    let registers = processInstructions(modelNumber, input)
    while (registers.z !== 0) {
        modelNumber = nextModelNumber(modelNumber)
        registers = processInstructions(modelNumber, input)
        // if (modelNumber.toString().includes('1')) {
            // console.log(modelNumber)
        // }
    }
    console.log('answer', modelNumber)
    return modelNumber
        
    let computers = chunkComputers(input)
    let compIndex = 0
    let initRegisters = [{w: 0, x: 0, y: 0, z: 0}]
    while (compIndex < computers.length) {
        let currentComputer = computers[compIndex].join('\n')
        let modelNumber = 9
        let nextRegisters = []
        while (modelNumber > 0) {
            console.log('computer', compIndex, 'model', modelNumber)
            for (let i = 0; i < initRegisters.length; i++) {
                let registers = processInstructions(modelNumber, currentComputer, initRegisters[i])
                // console.log(initRegisters[i], registers)
                nextRegisters.push(registers)
            }
            modelNumber--
        }
        initRegisters = nextRegisters.slice()
        console.log(initRegisters.length)
        console.log('\n')
        compIndex++
        // if (compIndex > 3) {
        //     process.exit()
        // }
    }

    // console.log(possibleZs)
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }
    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }
    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    // console.log('\n')
    // compIndex--
    // console.log(compIndex)
    // currentComputer = computers[compIndex]
    // modelNumber = 9
    // while (modelNumber > 0) {
    //     console.log(modelNumber, processInstructions(modelNumber, currentComputer.join('\n'), {w: 0, x: 0, y: 0, z: 0}))
    //     modelNumber--
    // }

    process.exit()
    // let modelNumber = parseInt('8'.repeat(14))
    // let registers = processInstructions(modelNumber, input)
    while (registers.z !== 0) {
        modelNumber = nextModelNumber(modelNumber)
        registers = processInstructions(modelNumber, input)    
    }
    return modelNumber
}

// Part 2
// ======

const part2 = input => {
}

module.exports = { part1, part2, processInstructions }
