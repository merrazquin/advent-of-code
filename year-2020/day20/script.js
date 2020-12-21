const { multiplyAll } = require('../../utils')
// Setup
const getBorders = image => {
    const imageArr = image.split('\n')
    return {
        top: imageArr[0],
        bottom: imageArr[imageArr.length - 1],
        left: imageArr.map(row => row.split('')[0]).join(''),
        right: imageArr.map(row => row.split('')[row.split('').length - 1]).join('')
    }
}
const flipTileVertical = (tile, size = 10) => {
    let { image } = tile
    tile.image = image.split('\n').reverse().join('').match(new RegExp(`.{${size}}`, 'g')).join('\n')
    tile.borders = getBorders(tile.image)
}
const rotateTile90CCW = (tile, size = 10) => {
    let { image } = tile
    let columns = []
    for (let i = 0; i < size; i++) {
        columns.push(image.split('\n').map(row => row.split('')[i]).join(''))
    }
    tile.image = columns.reverse().join('\n')
    tile.borders = getBorders(tile.image)
}

const preprocessing = input => {
    return input.split('\n\n').map(tileInfo => {
        let [id, image] = tileInfo.split(':')
        id = parseInt(id.trim().split(' ')[1])
        image = image.trim()
        let borders = getBorders(image)
        return { id, image, borders, placed: false, x: NaN, y: NaN, neighborCount: 0, placeCount: 0 }
    })
}

// Part 1
// ======

const part1 = (input, returnCorners = false) => {
    const imageData = preprocessing(input)
    // find matching border pairs
    // since tiles can be rotated and flipped, gotta check against all

    const matches = {}
    imageData.forEach(tile => {
        let { id, borders } = tile
        borders = Object.values(borders)
        matches[id] = []
        imageData.forEach(comparisonTile => {
            if (comparisonTile.id != id) {
                let comparisonBorders = Object.values(comparisonTile.borders)
                borders.forEach(border => {
                    if (comparisonBorders.includes(border) || comparisonBorders.includes(border.split('').reverse().join(''))) {
                        matches[id].push(comparisonTile.id)
                    }
                })
            }
        })
    })

    const corners = []
    for (const tileId in matches) {
        if (matches[tileId].length == 2) {
            corners.push(tileId)
        }
    }
    if (returnCorners) {
        return corners
    }
    return multiplyAll(corners)
}

// Part 2
// ======

const checkForPlacement = (placedTile, unplacedTile) => {
    let { borders, x, y } = placedTile
    let comparisonBorders = unplacedTile.borders

    if (comparisonBorders.bottom == borders.top) {
        unplacedTile.x = x
        unplacedTile.y = y - 1
        unplacedTile.placed = true
        placedTile.neighborCount++
        unplacedTile.neighborCount++
        unplacedTile.placeCount++
    }

    if (comparisonBorders.top == borders.bottom) {
        unplacedTile.x = x
        unplacedTile.y = y + 1
        unplacedTile.placed = true
        placedTile.neighborCount++
        unplacedTile.neighborCount++
        unplacedTile.placeCount++
    }

    if (comparisonBorders.left == borders.right) {
        unplacedTile.x = x + 1
        unplacedTile.y = y
        unplacedTile.placed = true
        placedTile.neighborCount++
        unplacedTile.neighborCount++
        unplacedTile.placeCount++
    }

    if (comparisonBorders.right == borders.left) {
        unplacedTile.x = x - 1
        unplacedTile.y = y
        unplacedTile.placed = true
        placedTile.neighborCount++
        unplacedTile.neighborCount++
        unplacedTile.placeCount++
    }

}
const findPlaceForTile = (placedTile, unplacedTile) => {
    if (placedTile.id == unplacedTile.id || unplacedTile.placed) {
        return
    }
    let rotations = 0
    while (!unplacedTile.placed && rotations++ <= 4) {
        rotateTile90CCW(unplacedTile)
        checkForPlacement(placedTile, unplacedTile)
    }
    if (!unplacedTile.placed) {
        rotations = 0
        flipTileVertical(unplacedTile)
        while (!unplacedTile.placed && rotations++ <= 4) {
            rotateTile90CCW(unplacedTile)
            checkForPlacement(placedTile, unplacedTile)
        }
    }
}
const stripBorders = tile => {
    const { image } = tile
    let imageArr = image.split('\n')

    // remove top
    imageArr.shift()

    // remove bottom
    imageArr.pop()

    // remove sides
    imageArr = imageArr.map(row => {
        row = row.split('')
        return row.slice(1, row.length - 1).join('')
    })

    tile.image = imageArr.join('\n')
}
const combineAsRow = tiles => {
    const rows = []
    const size = tiles[0].image.split('\n').length
    // console.log(tiles.reduce((str, tile) => str + tile.id + ' ', ''))
    while (rows.length < size) {
        rows.push('')
    }
    tiles.forEach(tile => {
        tile.image.split('\n').forEach((imageRow, index) => {
            rows[index] += imageRow
        })
    })
    return rows.join('\n')
}

const findMonsters = map => {
    const monster =
`                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `
    let maxX = 0
    let maxY = 0
    const monsterCoords = []
    monster.split('\n').forEach((row, rowIndex) => {
        row.split('').forEach((col, colIndex) => {
            if (col == '#') {
                monsterCoords.push({ x: colIndex, y: rowIndex })
                maxX = Math.max(maxX, colIndex)
                maxY = Math.max(maxY, rowIndex)
    
            }
        })
    })
    const mapMatrix = map.split('\n').map(row => row.split(''))
    let monsterCount = 0
    for (let y = 0; y < mapMatrix.length - maxY; y++) {
        for (let x = 0; x < mapMatrix.length - maxX; x++) {
            if (monsterCoords.every(coord => {
                let modX = coord.x + x
                let modY = coord.y + y
                
                const correctCoord = mapMatrix[modY][modX] == '#'
                return correctCoord
            })) {
                monsterCount++
            }
        }
    }
    return monsterCount
}

const part2 = input => {
    const cornerId = part1(input, true).shift()
    const imageData = preprocessing(input)
    const firstTile = imageData.find(tile => tile.id == cornerId)
    firstTile.placed = true
    firstTile.x = 0
    firstTile.y = 0
    let unplaced = imageData.filter(tile => !tile.placed)
    let placed = imageData.filter(tile => tile.placed)

    while (unplaced.length) {
        unplaced.forEach(unplacedTile => {
            placed.forEach(placedTile => {
                findPlaceForTile(placedTile, unplacedTile)
            })
        })
        unplaced = imageData.filter(tile => !tile.placed)
        placed = imageData.filter(tile => tile.placed)
    }

    placed.sort((tileA, tileB) => {
        return (tileA.y < tileB.y) ? -1 : (tileA.y > tileB.y) ? 1 : ((tileA.x < tileB.x) ? -1 : (tileA.x > tileB.x) ? 1 : 0)
    })
    placed.forEach(tile => stripBorders(tile))
    const dimension = Math.sqrt(placed.length)
    let i = 0
    let fullImage = ''
    while (i < placed.length) {
        const temp = placed.slice(i, i + dimension)
        fullImage += combineAsRow(temp) + '\n'
        i += dimension
    }
    const newSize = fullImage.trim().split('\n').length
    const newTile = { image: fullImage }
    let rotations = 0
    const monsterSize = 15
    while (rotations < 8) {
        const monstersFound = findMonsters(newTile.image)
        if (monstersFound) {
            return newTile.image.split('').filter(char => char == '#').length - (monstersFound * monsterSize)
        }
        if (rotations == 3) {
            flipTileVertical(newTile, newSize)
        }
        rotateTile90CCW(newTile, newSize)
        rotations++
    }
    
    return 'found no dragons'
}

module.exports = { part1, part2 }
