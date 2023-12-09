'use strict'

const { lcm } = require('../../utils')

// Setup
const preProcessing = input => {
    const [instructions, nodes] = input.replace(/[(),=]/g, '').split('\n\n')
    const nodeGraph = nodes.split('\n').reduce((nodeGraph, nodeInfo) => {
        const [nodeName, L, R] = nodeInfo.split(/\s+/)
        nodeGraph[nodeName] = {nodeName, L, R}
        return nodeGraph
    }, {})
    return {instructions: instructions.split(''), nodes: nodeGraph}
}

// Part 1
// ======

const part1 = input => {
    const {instructions, nodes} = preProcessing(input)

    let currentNode = nodes.AAA
    const targetNode = nodes.ZZZ

    let turns = 0
    while (currentNode != targetNode) {
        turns++
        const instruction = instructions.shift()
        currentNode = nodes[currentNode[instruction]]
        instructions.push(instruction)
    }

    return turns
}

// Part 2
// ======

const part2 = input => {
    const {instructions, nodes} = preProcessing(input)
    const originalInstructions = instructions.slice()
    const aNodes = Object.keys(nodes).filter(nodeName => nodeName.endsWith('A'))
    const cycles = []

    for (let startNode of aNodes){
        let currentInstructions = originalInstructions.slice()
        let turns = 0
        let currentNode = nodes[startNode]
        while (!currentNode.nodeName.endsWith('Z')) {
            turns++
            const instruction = currentInstructions.shift()
            currentNode = nodes[currentNode[instruction]]
            currentInstructions.push(instruction)
        }
        cycles.push(turns)
    }

    return cycles.reduce((acc, val) => {
        return lcm(acc, val)
    }, 1)
}

module.exports = { part1, part2 }
