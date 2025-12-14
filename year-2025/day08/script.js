'use strict'
const { multiplyAll } = require('../../utils')

// Setup
const preProcessing = input => input.trim().split('\n').map((box, id) => {
    const [x, y, z] = box.split(',').map(coord => parseInt(coord))
    return {x, y, z, id, circuit: null}
})

const getDistance = (boxA, boxB) => Math.sqrt(
        Math.pow(boxA.x - boxB.x, 2) +
        Math.pow(boxA.y - boxB.y, 2) +
        Math.pow(boxA.z - boxB.z, 2)
)

// Part 1
// ======

const part1 = (input, minConnections = 1000) => {
    const boxes = preProcessing(input)
    const distances = []
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            const boxA = boxes[i]
            const boxB = boxes[j]
            const distance = getDistance(boxA, boxB)
            distances.push({
                pair: `${boxA.id}-${boxB.id}`,
                a: boxA.id,
                b: boxB.id,
                distance
            })
        }
    }
    distances.sort((a, b) => a.distance-b.distance)
    const circuits = boxes.map(box => {
        const circuit = new Set()
        circuit.add(box.id)
        return circuit
    })
    let connections = 0
    do {
        let distance = distances.shift()
        let containingCircuits = circuits.filter(circuit => circuit.has(distance.a) || circuit.has(distance.b))
        if (containingCircuits.length > 1) {
            let [firstCircuit, ...otherCircuits] = containingCircuits
            otherCircuits.forEach(otherCircuit => {
                otherCircuit.forEach(boxId => firstCircuit.add(boxId))
                circuits.splice(circuits.indexOf(otherCircuit), 1)
            })
        }
        connections++

    } while (connections < minConnections)

    return multiplyAll(circuits.sort((a, b) => b.size - a.size).slice(0, 3).map(circuit => circuit.size))
}
// 5491 is too low
// Part 2
// ======

const part2 = input => {
    const boxes = preProcessing(input)
    const distances = []
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            const boxA = boxes[i]
            const boxB = boxes[j]
            const distance = getDistance(boxA, boxB)
            distances.push({
                pair: `${boxA.id}-${boxB.id}`,
                a: boxA.id,
                b: boxB.id,
                distance
            })
        }
    }
    distances.sort((a, b) => a.distance-b.distance)
    const circuits = boxes.map(box => {
        const circuit = new Set()
        circuit.add(box.id)
        return circuit
    })
    let connections = 0
    let distance
    do {
        distance = distances.shift()
        let containingCircuits = circuits.filter(circuit => circuit.has(distance.a) || circuit.has(distance.b))
        if (containingCircuits.length > 1) {
            let [firstCircuit, ...otherCircuits] = containingCircuits
            otherCircuits.forEach(otherCircuit => {
                otherCircuit.forEach(boxId => firstCircuit.add(boxId))
                circuits.splice(circuits.indexOf(otherCircuit), 1)
            })
        }
        connections++

    } while (circuits.length > 1)

    return boxes[distance.a].x * boxes[distance.b].x
}

module.exports = { part1, part2 }
