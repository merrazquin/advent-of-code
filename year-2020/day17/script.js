'use strict'

const { sumAll } = require('../../utils')
// Setup
const ACTIVE = '#'
const INACTIVE = '.'

const preprocessing = input => {
    const init = input.split('\n').map(row => row.split(''))
    let initWidth = init[0].length
    let initLayer = init.join(',').split(',')
    return {
        initWidth,
        initLayer
    }

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

const nextGeneration = (layers, z, width, outerLayers = null, w = null) => {
    const currentGeneration = layers[z]
    const neighboringLayers = {}
    if (layers.length > z - 1) {
        neighboringLayers[z - 1] = layers[z - 1]
    }
    if (layers.length > z + 1) {
        neighboringLayers[z + 1] = layers[z + 1]
    }

    // cover 4th dimension
    if (outerLayers != null && w != null) {
        if (w && outerLayers.length > w - 1) {
            if (outerLayers[w - 1].length > z - 1) {
                neighboringLayers['w_' + (w - 1) + '_z_' + (z - 1)] = outerLayers[w - 1][z - 1]
            }
            neighboringLayers['w_' + (w - 1) + '_z_' + z] = outerLayers[w - 1][z]
            if (outerLayers[w - 1].length > z + 1) {
                neighboringLayers['w_' + (w - 1) + '_z_' + (z + 1)] = outerLayers[w - 1][z + 1]
            }
        }
        if (outerLayers.length > w + 1) {
            if (outerLayers[w + 1].length > z - 1) {
                neighboringLayers['w_' + (w + 1) + '_z_' + (z - 1)] = outerLayers[w + 1][z - 1]
            }
            neighboringLayers['w_' + (w + 1) + '_z_' + z] = outerLayers[w + 1][z]
            if (outerLayers[w + 1].length > z + 1) {
                neighboringLayers['w_' + (w + 1) + '_z_' + (z + 1)] = outerLayers[w + 1][z + 1]
            }
        }
    }

    return currentGeneration.map((cell, index) => {
        const activeNeighbors = [countActive(findNeighbors(index, currentGeneration, width))]
        for (const layerIndex in neighboringLayers) {
            const layer = neighboringLayers[layerIndex]
            if (layer != undefined) {
                let currNeighbors = [layer[index], ...findNeighbors(index, layer, width)]
                activeNeighbors.push(countActive(currNeighbors))
            }
        }
    
        const allActiveNeighbors = sumAll(activeNeighbors)
        if (cell == ACTIVE && (allActiveNeighbors < 2 || allActiveNeighbors > 3)) {
            return INACTIVE
        }
        if (cell == INACTIVE && allActiveNeighbors === 3) {
            return ACTIVE
        }
        return cell
    })
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
    while (newWidth) {
        layer.push(INACTIVE)
        layer.unshift(INACTIVE)
        newWidth--
    }
}

const prepLayers = (layers, initWidth) => {
    const initLayer = layers[0]
    let emptyLayer = new Array(initLayer.length)
    let i = initLayer.length
    while (i--) {
        emptyLayer[i] = INACTIVE
    }
    layers.push(emptyLayer.slice())
    layers.unshift(emptyLayer.slice())

    layers.forEach(layer => padLayer(layer, initWidth))
}

const part1 = input => {
    let { initWidth, initLayer } = preprocessing(input)
    let layers = [initLayer]

    let rounds = 0
    while (rounds < 6) {
        prepLayers(layers, initWidth)
        layers = layers.map((layer, z) => nextGeneration(layers, z, initWidth + 2))
        initWidth += 2
        rounds++
    }

    let allCells = layers.map(layer => layer.join(',')).join(',').split(',')
    return countActive(allCells)
}

// Part 2
// ======
const part2 = input => {
    let { initWidth, initLayer } = preprocessing(input)
    let layers = [initLayer]
    /* eslint-disable-next-line */
    let emptyLayer = initLayer.slice().map(num => INACTIVE)
    let outerLayers = [[emptyLayer.slice()], layers, [emptyLayer.slice()]]
    let rounds = 0
    while (rounds < 6) {
        outerLayers.forEach(
            layers => prepLayers(layers, initWidth)
        )
        /* eslint-disable-next-line */
        emptyLayer = outerLayers[0][0].slice().map(num => INACTIVE)
        let emptyOuterLayer = []
        while (emptyOuterLayer.length < outerLayers[0].length) {
            emptyOuterLayer.push(emptyLayer.slice())
        }
        outerLayers.push(emptyOuterLayer.slice())
        outerLayers.unshift(emptyOuterLayer.slice())

        outerLayers = outerLayers.map(
            (layers, w) => layers.map((layer, z) => nextGeneration(layers, z, initWidth + 2, outerLayers, w))
        )
        initWidth += 2
        rounds++
    }

    let allCells = []
    outerLayers.forEach (
        layers => {
            allCells.push(... layers.map(layer => layer.join(',')).join(',').split(','))
        }
    )
    
    return countActive(allCells)
}

module.exports = { part1, part2 }
