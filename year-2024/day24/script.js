'use strict'

// Setup
const preProcessing = input => {
    let [startingWires, connections] = input.split('\n\n')

    const device = {}
    startingWires.split('\n').forEach(wire => {
        const [wireName, value] = wire.split(': ')
        device[wireName] = { value: parseInt(value)}
    })

    connections.split('\n').forEach(connection => {
        const [input, output] = connection.split(' -> ')
        let [_, input1, gate, input2] = input.match(/(\w+) (AND|OR|XOR) (\w+)/)
        switch (gate) {
            case 'AND':
                gate = '&'
                break
            case 'OR':
                gate = '|'
                break
            case 'XOR':
                gate = '^'
                break
        }
        device[output] = {
            input1, input2,
            gate,
            value: undefined
        }
    })
    return device
}

const getValue = (device, wireName) => {
    const wire = device[wireName]
    if (wire.value !== undefined) {
        return wire.value
    }
    wire.value = eval(`${getValue(device, wire.input1)} ${wire.gate} ${getValue(device, wire.input2)}`)

    return wire.value
}

// Part 1
// ======
const part1 = input => {
    const device = preProcessing(input)
    const zWires = Object.keys(device).filter(wireName => wireName.startsWith('z')).sort((a, b) => b < a ? -1 : 1)
    return parseInt(zWires.map(wire => getValue(device, wire)).join(''), 2)
}

// Part 2
// ======
const part2 = input => {
    const device = preProcessing(input)
}

module.exports = { part1, part2 }
