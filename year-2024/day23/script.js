'use strict'

// Setup
const preProcessing = input => {
    const connectionDefinitions = input.split('\n')
    const connections = {}
    connectionDefinitions.forEach(definition => {
        const [left, right] = definition.split('-')
        if (!connections[left]) {
            connections[left] = new Set()
        }
        if (!connections[right]) {
            connections[right] = new Set()
        }

        connections[left].add(right)
        connections[right].add(left)
    })

    return connections
}

const intersection = (set1, set2) => new Set([...set1].filter(x => set2.has(x)))
// Part 1
// ======

const findSets = (node, connections, sets = new Set()) => {
    const connectedNodes = connections[node]
    connectedNodes.forEach(otherNode => {
        const commonNodes = intersection(connectedNodes, connections[otherNode])
        commonNodes.forEach(commonNode => {
            sets.add([node, otherNode, commonNode].sort().join(','))
        })
    })
    return sets
}

const part1 = input => {
    const connections = preProcessing(input)
    const tNames = Object.keys(connections).filter(name => name.charAt(0) === 't')

    const sets = new Set()
    tNames.forEach(tName => {
        findSets(tName, connections, sets)
    })

    return sets.size
}

// Part 2
// ======

const part2 = input => {
    const connections = preProcessing(input)

    const networks = {}
    let maxSets = 0
    Object.keys(connections).forEach(node => {
        const sets = findSets(node, connections)
        networks[node] = sets
        maxSets = Math.max(maxSets, sets.size)
    })

    const correctlySizedSets = Object.entries(networks).filter(([key, value]) => value.size === maxSets).map(([key, value]) => {
        const sets = Array.from(value).sort()
        return {key, sets}
    })
    let maxOccur = 0
    let biggestLANParty
    let occurences = {}
    correctlySizedSets.forEach(connections => {
        const {key, sets} = connections
        occurences[key] = Array.from(new Set(sets.join(',').split(','))).sort().join(',')
    })

    Object.values(occurences).forEach(lanParty => {
        const occurs = Object.values(occurences).filter(otherParty => otherParty === lanParty).length
        if (occurs > maxOccur) {
            maxOccur = occurs
            biggestLANParty = lanParty
        }
    })

    return biggestLANParty
}

module.exports = { part1, part2 }
