'use strict'

const { findNeighbors, sumAll, chunk, Graph, astar, multiplyAll } = require('../../utils')

// Setup

const getLowPoints = (heightmap, width, byIndex = false) => {
    const lowPoints = heightmap.map((point, index) => {
        let neighbors = findNeighbors(index, heightmap, width, false)
        neighbors = neighbors.filter(neighbor => neighbor !== '')

        const isLow = neighbors.every(neighbor => parseInt(neighbor) > point )
        return isLow ? (byIndex ? index : point) : -1
    }).filter(point => point != -1)
    return lowPoints
}
// Part 1
// ======

const part1 = input => {
    const width = input.trim().split('\n')[0].length
    const heightmap = input.trim().split('\n').map(line => line.split('')).join(',').split(',').map(num => parseInt(num))
    const lowPoints = getLowPoints(heightmap, width)
    return sumAll(lowPoints.map(point => point + 1))
}

// Part 2
// ======

const part2 = input => {
    const width = input.trim().split('\n')[0].length
    let heightmap = input.trim().split('\n').map(line => line.split('')).join(',').split(',').map(num => parseInt(num))
    const lowPointsIndices = getLowPoints(heightmap, width, true)
    let grid = heightmap.map(point => point !== 9 ? 1 : 0)
    grid = chunk(grid, width).map(row => row.split('').map(num => parseInt(num)))
    heightmap = heightmap.map((point, index) => {
        if (point === 9) {
            return '|'
        }
        if (lowPointsIndices.includes(index)) {
            return '*'
        }
        return '.'
    })

    let lowPoints = lowPointsIndices.map(index => {
        const y = index % width
        const x = Math.floor(index / width)
        return {x, y}
    })

    let graph = new Graph(grid)

    const basins = []
    lowPoints.map(lowPoint => {
        let end = graph.nodes.find(node => node.x == lowPoint.x && node.y == lowPoint.y)

        let basinSize = 0
        for (let index = 0; index < graph.nodes.length; index++) {
            let start = graph.nodes[index]
            if (start.isWall()) continue
            if (start == end) {
                basinSize++
                continue
            }
            let result = astar.search(graph, start, end)
            if (result.length) {
                basinSize++
            }
        }
        basins.push(basinSize)
    })

    return multiplyAll(basins.sort((a, b) => b-a).slice(0, 3))
}

module.exports = { part1, part2 }
