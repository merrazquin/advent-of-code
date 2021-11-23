'use strict'

class Node {
    constructor(x, y, size, used, avail, usePercentage) {
        this.x = x
        this.y = y
        this.size = size
        // this.coords = 
        this.used = used
        this.avail = avail
        this.usePercentage = usePercentage
    }
    moveDataTo(node) {
        node.receiveData(this.used)
        this.used = 0
        this.avail = this.size
        this.usePercentage = 0
    }
    receiveData(size) {
        this.used += size
        this.avail -= size
        this.usePercentage = Math.round(this.used/this.size) * 100
    }
}

const isViablePair = (nodeA, nodeB) => {
    return nodeA.used !== 0 && nodeA !== nodeB && nodeB.avail >= nodeA.used
}
// Part 1
// ======
// 161 too low
const part1 = input => {
    const nodes = input.trim().split('\n').splice(2).map(line => {
        const regex = /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/g
        const [x, y, size, used, avail, usedPercentage] = regex.exec(line).splice(1).map(num => parseInt(num))
        console.log(x, y, size, used, avail, usedPercentage)
        return new Node(x, y, size, used, avail, usedPercentage)
    })

    let pairs = 0
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (isViablePair(nodes[i], nodes[j])) pairs++
        }
    }

    return pairs
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }