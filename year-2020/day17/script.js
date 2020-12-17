'use strict'

const {sumAll} = require('../../utils')
// Setup
const ACTIVE = '#'
const INACTIVE = '.'

const preprocessing = input => {
    return input.split('\n').map(row => row.split(''))
}

const countActive = cells => {
    return cells.filter(cell => cell == ACTIVE).length
}

// Part 1
// ======
const getNeighboringCell = (i, direction, cells, width) => {
    // horizontal offset is 1, BUT
    // left edge modulo width = 0
    // right edge modulo width = width - 1
    // declining diagonal offset is width + 1
    // inclinng diagonal offset is width - 1
    // right diagonal offset is 
    // vertical offset is width
    let cell = -1
    switch (direction) {
    case 'NW':
        if (i % width > 0 && i > width - 1) {
            cell = i - (width + 1)
        }
        break
    case 'N':
        if (i > width - 1) {
            cell = i - width
        }
        break
    case 'NE':
        if (i > width - 1 && i % width < width - 1) {
            cell = i - (width - 1)
        }
        break
    case 'E':
        if (i % width < width - 1) {
            cell = i + 1
        }
        break
    case 'SE':
        if (i % width < width - 1 && i < cells.length - width) {
            cell = i + (width + 1)
        }
        break
    case 'S':
        if (i < cells.length - width) {
            cell = i + width
        }
        break
    case 'SW':
        if (i % width > 0 && i <= cells.length - width) {
            cell = i + (width - 1)
        }
        break
    case 'W':
        if (i % width > 0) {
            cell = i - 1
        }
        break
    }
    return cell
}
const findNeighbors = (i, cells, width) => {
    const neighbors = []
    let neighbor
    ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W'].forEach(direction => {
        neighbor = ''
        let cell = getNeighboringCell(i, direction, cells, width)
        if (cell != -1) {
            neighbor = cells[cell]
        }
        neighbors.push(neighbor)
    })

    return neighbors
}
const findNeighborsFromZDimension = (i, cells, width) => {
    const neighbors = [cells[i]]
    neighbors.push(...findNeighbors(i, cells, width))

    return neighbors
}

const nextGeneration = (layers, z, width) => {
    const currentGeneration = layers[z]
    const neighboringLayers = {}
    if (neighboringLayers.length > z - 1) {
        neighboringLayers[z-1] = neighboringLayers[z - 1]
    }
    if (neighboringLayers.length > z + 1) {
        neighboringLayers[z+1] = neighboringLayers[z + 1]
    }
    return currentGeneration.map((cell, index) => {
        const activeNeighbors = [countActive(findNeighbors(index, currentGeneration, width))]
        for (const layerIndex in neighboringLayers) {
            const layer = neighboringLayers[layerIndex];
            activeNeighbors.push(countActive(findNeighborsFromZDimension(index, layer, width)))
        }
        const allActiveNeighbors = sumAll(activeNeighbors)
        // console.log(z, index, 'allActiveNeighbors', allActiveNeighbors)
        if (cell == ACTIVE && (allActiveNeighbors < 2 || allActiveNeighbors > 3)) {
            return INACTIVE
        }
        if (cell == INACTIVE && allActiveNeighbors === 3) {
            return ACTIVE
        }
        return cell
    })
}
const visualize = (cells, width) => {
    const r = new RegExp('.{' + width + '}', 'g')
    const visualization = cells.match(r).join('\n')
    return visualization
}
const padLayer = (layer, initWidth) => {
    let insertPoint = layer.length - initWidth
    // pad right side of last row
    layer.push(INACTIVE)

    // pad left & right sides of middle rows
    while (insertPoint > 0) {
        layer.splice(insertPoint, 0, INACTIVE, INACTIVE)
        insertPoint -= initWidth
    }
    // pad left side of first row
    layer.unshift(INACTIVE)

    // add rows to north and south
    let newWidth = initWidth + 2
    while(newWidth) {
        layer.push(INACTIVE)
        layer.unshift(INACTIVE)
        newWidth--
    }
}
const part1 = input => {
    const init = preprocessing(input)
    const initWidth = init[0].length   
    let initLayer = init.join(',').split(',')
    let layers = [initLayer]
    // width grows by 2 each generation
    padLayer(initLayer, initWidth)
    let emptyLayer = new Array(initLayer.length)
    let i = initLayer.length
    while (i--) {
        emptyLayer[i] = INACTIVE
    }
    layers.push(emptyLayer.slice())
    layers.unshift(emptyLayer.slice())
    // let nextGen = 
    layers = layers.map((layer, z) => nextGeneration(layers, z, initWidth + 2))
    layers.forEach(layer => console.log('\n' + visualize(layer.join(''), initWidth + 2)))
    return false
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
