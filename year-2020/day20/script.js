'use strict'
const mattMap = 
`.......##..#...#.###........#.......#....#...###.....###..##..#........#...#.#...#.#..#.#.....#.
.#.....##.....##...#...##...#.#....#.##......#.#.#..#.#..#.......#.....#.#..........#..#.#...#..
.......#....#.#.##.##.#####.....#.#....#..#..##.....##....##....##..#.###...#....#...#...#......
#.##...#..#.####..###..####......##...#......#........####..#..##.#..#........#......###...#....
#.......#.##..##.#..#..#.#......##....###....##...#..#....#....#...#.........##.#..#...#........
........##..#.#.....#..##...##.#....#........#.#........#.......#...#...###.....##.....#..##....
##..#..........#...#........#..##.#.#.#.....#......##.......###......#..##.#...#...#.....##.#...
.###....................###.#.#.......#.....#.#..##...####.#.###.#.....##...###.#.###...####..##
.........#......#.#....#..#........#.#..##..##.##..#..##.#..##.##...#....#.##.##..#.##..#..#....
#.#......#...#..........#...#...#...#....#...#.......#....#.#...........#.##..#.##.#...#..#.#...
....###...#...#.#.###.#..##..#.#######..#..#.#.#.#...#....................#..###....#..#.#.....#
...#.#.........#..#..#..##.#..#....#.#....#.#..#..#..#.....#.....#.#.................#.....#....
.#.#.....#..........#..#...#......#.......##........#.#...#.#.#.##.#.....#...##.#......#....##.#
...##.#........#..##.....#.#........##.#...##.........#.#....#.......#..#.##..####.#..####......
..#..#.#..#.#...#.#.#.#...#..#.##....##....####.....#......##...#...#.#..#..#..#..#..###.#....#.
...##...#.....#.#....#.....#..#..##.#.##..#..#....##....#..............##.....#..####.....##...#
##....#........#.................#.#.......###.#....#..........#.#.#.#...........#.##........#.#
..##.#.##...#.....#.....#...#..#.....#.#.##.......#...##..#.......#....#.........#....#.........
#.#....#....#.....#........#.#...........#........#.......#.#.#..........#..##...............#..
.....#......#....#.##..........#..###...#................#.#.#......###.........#.#..##.#.......
..#..#....#......#..............#......#.#..#...#..#.###..##..#....###......##................#.
..#.#.#....####...........##...##...###....####.#.....##......#.....#.##...#.#..#............##.
#.....##..#..#....#..#.....##.#.###.#.##..#.#....#...##...##..#.##....###.....#.#.......#..#....
..#.......##..#.....###..#.#....#.##...##........#..###..#..#..##.#.####...#.#...#..#.#.##......
.#.###.....#......##...##....#.#...##........#....##.#.#.#..#..#....#.#.#.#.....##.#.#....#....#
...#.#..........#..#.#.#....#.#...#.#.#....#...#...#.#..#..#.#......#.#................#.....#..
#.....#.....#..##.##.##.#..##..#.###..##..#.#..#.#.#..#....#....##.##...#.##.......#..#.........
............##.#.#..#..#..##.#.##.......#....#..........#..#..#.#..##.......##...##......#.#....
##...####.......#...#..#.#....##.........#.....#.....##...#.....###......#.###..##.#..#..#.#..#.
...#...................#.........##...#.#......#..####..####....###..#.....#...#......#.#.......
..#.##..##.#..#....##..#.##...........#..#..#.#.#.##..#..#..#..#......###..##....##...####......
..##.##...#.#.##....#.........###.#...#......#.......#..#.......#.###..#..#..####..#.###..#...#.
#.#.#..##....##....###........#..##...##.#.......###..#.....#......#...##.##.#.....#.#..........
...#######..#..#.##....#..#.........#.......#..#...#......#.....#.##........#.##......#...#...#.
##..#.......##..#......#..#..##.....##........#..##...##....###...####..#.#.....#.##...#.....#.#
..#..#....#.#..#.#....#.##...#..#..#.....#..#..#.##..#.##.##..#..#...##.#....#..#.....#..#.##...
...##..##.#.##.#####....###........#.....#....#...#....#..#......#.#..##......#..........#..#..#
#....##.#..#..#..#..#..#.....#.........#.##..#.##.......#....##...#.#..##.#..#..#....##..#......
....#...#......#.##..#...#..#...#....#.......#.....#..#...##....#...#....#.....#....#.....#.#...
.......#...#.#.#.............#....#...#.###...##.##.##..#####....#.##..#..#....##..#.##.##.###..
..................##....#...##...#....##..#.##..#..#..#..#....#...##.......#..#..#..#.###.##....
..##.##.......#...#.#.##..##.....#...#..##.....#......###..........#.#........#..............#..
#.#.#......###........##.#..##.#.##.....#.#........#.......#.#...#..#....#.###..#.#.....#..#....
...........#.#.#.####...###.#.###...##..#..#...##...####..##.#..###..#.#.......###.#...#.#.##...
..#.#.#.......#..####..#.##..#...##......#.....######.#.##..##.#...#...#......#.##.....##.......
........#............#...........#.#..#.#..#.#.#...##..##..#...###....#.##.......#.........#....
#.........#.......#.##.....#..##.......#..................#.#.#.....#...#.#.##..##....#.....#...
.#.#............##.......##...#..#.......#.......##......###...#..#...#.......#..#...#...#......
#...#.........##....##.#.###..#.###........##..##.#....##.......#.........##..#..#.###.##.......
....#..#........#..##.#..#..#..#.....##..#.##....####..###.......#.#..#..#......#.....#....##...
...#......#....#..#............#.......#.###.##.#.##..#.#...#............##.......#...#.........
...#......#....#.#....#....#...#..#....#.#....##.......#...#...###..#....##.#..###..#####....#..
....#...##.#.......#.#.#.#.#.#...##.##.#.......##.....#..........#..##..#..#######..#...##.....#
........#..#....#............####.......#........##.........#..##..#.#.#..#.......#.#......##...
...#.#..#.#.###..#...#....#.#...#.......#......#...#...#......#.....#..#...........#.#...###.#..
.#......#....##.#.###....###.....##...##............##.#..#.#.#.#...#.....#..#...........#...#..
.........#..##.##.#..#..##.#..#.........#..........#.#........#####.....#...#..#..#..#..........
.............#.#...#.#.......#......#.#..##..##...###...##...####.....#....#.##.........##.##...
..#..#....#.......#.#.......#..#....#.#......##..#..#..#..#..#.##.....#...#.#.###....##...####..
..#.........#....#..#............#.#.##.......#.....##..#..................####..#..#..##.#.#...
.##.#####.#..##..#####...#........#.....#.#.#..###..................#.#.###......#.....##....#..
...#..#..#..##.#..#.......#.....#..#...#.#............#...#...#.##.........#..#..#...#......#...
.......#.............#....#....#...##...#.....##.......##.......#..#.#..#...............#.#.#...
.#......##..##..#...#.......#.#..##..####....###..##....##..#.##..#.####........#....#.##..##...
.#.......#.#...#.#####.##.#..#.##..#..#.##..##.#....#..#..#.##..#..##.#..#.#.###.#..##..#.####..
.....#....##..#.###...###...#..##........#.##.....#..##..#.....#....#.....#.##.##..#..#..#......
......##.#.##..##.####..#.#..#......#...#.....###..#.#..##....#...#.#..#.......##..##...#...#.#.
.......##..#..#....##........#....#...........#...#.#....#.#......#...#.#.......................
###.#.#.........##....#.##..##...##.......#.#.....#.#.....#..######......#..#.#.#.........#.....
.......#.#....#.....#...#....##....###...###..#.#....##...###....###.....#.....#.......##.....#.
..##................#....#.##.##..#..##.#.#......#.##.##..#..##.#.....#....##....##....###.....#
##....#.........#..#..#.##.......#.##.#..#.#...#...#......##.#.#...#.###..#..##.##.#..##.#....#.
..#.##........#.#..#.......#....#....#.....##...#..........##...#.............#.#..##......#....
##.#..##....##....####.#...........#..##.###...#....##....#..##.#....#......#.#..#...##.#..#.#..
..#..##.#..#..#..#...#.....#..#..#...#..#.#.......#.....##...#...#..#.#..#.#...#...........##..#
........#.#.##...................#......#.##...........#.......#.............##.........#.##....
..##..###......##...#...#....#....#.#..#..#....#.##............#...##....#.....#.#..#......##...
.......#.#...#...#..........#.#..........#.....#....#.#.##.#......#.....###...##.#####....####..
.....#...##.##...##..#.##....####.#.#.#.......#.#..#.##..#.##....###.....##.###.#..##.##.#.....#
....#.#.#....#####.#..#####.#..#...#......#.##...#..#..#..#.##..##....#....#....#....#...##.####
#........#...#..##.......#.#....#.##...##.#....#..#.##.#....##...##..#..#.#....#.#....#.##....#.
#...#...##..#...................#.............#...............#....#.....#....#..#..##.####.....
..#...#.................#...#..#.#........#........###..###........#.##....##....##.#.#####.##..
..#........#.#....##.#.##...#.##.#..#.#......##..#.#..........#....#...##.##.#..#..#..#.#..#.#..
.....####.##.######...###.###....#.........#..#.#.#.#..#.#.........###...#...#.....##........#..
.#...##..#..#..#.##..##.##.....#.#......#....#...##...#.#...#...#..#.#....#...#...#...........#.
##............#...#.#...##..####.#.###....##....###.#.......#.....................#.#.....#.....
..#...##..#.......#.#....#......##.#..#..#..#..#....#.....#.##.#........##...#..##.........#....
......#...#......#..#.....#..#...##...#...#...#..##.#...........#.#...#..........##.#.#........#
.#..#.#..........#....#............#...........#...............#..#.#....##..#.##....####.......
..#..#...........##.....#...#....#.#.#.#.........#.##.##..##..#...#..#..##.#..#..#..#......#.#..
..#.#....#.....##.#.#..#.##.........##....###...##.##.####.#.......#.#........#......##...#.....
..##...##....##....###..##.#..........##.##.#.##..#..#........##.....#.#.#.#.#.......#....##....
##.#..##.#..#.##..#..#.#.#....##...##....#..##.#......##............#...#.##....#.#...##........
..#.##........#.###....#.#....##.....#....#......#.#.#......##.......##..#....#.....##.........#
...##...#.......#.............#.#..#..#.#......#...##.....#...#..#.......#.#....#...#.#.....#..#`
const { multiplyAll } = require("../../utils")
const size = 10
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
        columns.push(image.split('\n').map((row, index) => row.split('')[i]).join(''))
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

const findMonster = image => {
    // console.log(image)
    const monsterLine1 = /.{18}#/g
    const monsterLine2 = /\#.{4}\#{2}.{4}\#{2}.{4}\#{3}/g
    const monsterLine3 = /^.*.{1}\#.{2}\#.{2}\#.{2}\#.{2}\#.{2}\#{2}\#.*$/
    const imageArr = image.split('\n')


    let line1Matches = imageArr.reduce((indices, row, index) => {
        let matches
        let matchArr = []
        monsterLine1.lastIndex = 0
        // console.log(index, row)
        while (matches = monsterLine1.exec(row)) {
            // console.log('   ', matches.index)
            matchArr.push(matches.index)
        }
        if (matchArr.length) {
            indices.push(matchArr)
        }
        return indices
    }, [])


    let line2Matches = imageArr.reduce((indices, row, index) => {
        let matches
        let matchArr = []
        monsterLine2.lastIndex = 0
        console.log(index, row)
        while (matches = monsterLine2.exec(row)) {
            console.log('   ', matches.index)
            matchArr.push(matches.index)
        }
        if (matchArr.length) {
            indices.push(matchArr)
        }
        return indices
    }, [])
    console.log(line2Matches)
    process.exit()

    let line3Matches = imageArr.reduce((indices, row, index) => {
        if (monsterLine3.test(row)) {
            indices.push(index)
        }
        return indices
    }, [])

    // console.log(line1Matches)
    // console.log(line2Matches)
    // console.log(line3Matches)
    // console.log('-'.repeat(25))

    if (!line1Matches.length || !line2Matches.length || !line3Matches.length) {
        return 0
    }

    line3Matches = line3Matches.filter(line3Index => {
        return line2Matches.includes(line3Index - 1)
    })

    line2Matches = line2Matches.filter(line2Index => {
        return line1Matches.includes(line2Index - 1) && line3Matches.includes(line2Index + 1)
    })

    line1Matches = line1Matches.filter(line1Index => {
        return line2Matches.includes(line1Index + 1)
    })
    // console.log(line1Matches)
    // console.log(line2Matches)
    // console.log(line3Matches)

    return Math.min(line1Matches.length, line2Matches.length, line3Matches.length)

}
const part2 = input => {
    const cornerId = part1(input, true).shift()
    const imageData = preprocessing(input)
    const firstTile = imageData.find(tile => tile.id == cornerId)
    firstTile.placed = true
    firstTile.x = 0
    firstTile.y = 0
    // console.log('placed', firstTile.id, 'at 0, 0')
    let unplaced = imageData.filter(tile => !tile.placed)
    let placed = imageData.filter(tile => tile.placed)

    while (unplaced.length) {
        unplaced.forEach(unplacedTile => {
            placed.forEach(placedTile => {
                findPlaceForTile(placedTile, unplacedTile)
            })
            // if (unplacedTile.placed) {
            //     console.log('placed', unplacedTile.id, 'at', `${unplacedTile.x}, ${unplacedTile.y}`)
            // }
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
        // console.log(combineAsRow(temp))
        fullImage += combineAsRow(temp) + '\n'
        i += dimension
    }
    const newSize = fullImage.trim().split('\n').length
    // console.log('NEW SIZE', newSize)
    const newTile = { image: fullImage }
    console.log('start comparisons')
    let rotations = 0
    while (rotations < 8) {
        if (newTile.image == mattMap) {
            console.log('FOUND CORRECT MAP')
            break
        }
        if (rotations == 3) {
            flipTileVertical(newTile, newSize)
        }
        rotateTile90CCW(newTile, newSize)
        rotations++
    }
    console.log('correct map')
    console.log(newTile.image)
const monsterMask = 
`00000000000000000010
10000110000110000111
01001001001001001000`

    process.exit()
    
    const dragon = /[^\n]{18}\#.{5}\#.{4}\#{2}.{4}\#{2}.{4}\#{3}.{6}\#.{2}\#.{2}\#.{2}\#.{2}\#.{2}\#{2}\#/gs
    // ([^\n]{18}#)(.{5})(#.{4}#{2}.{4}#{2}.{4}#{3}).{6}(#.{2}#.{2}#.{2}#.{2}#.{2}#{2}#)
    const dragonSize = 15
    // let rotations = 0
    let flips = 0
    // console.log('total #', newTile.image.split('').filter(char => char == '#').length)
    let monstersFound = findMonster(newTile.image)
    while (rotations <= 5) {
        if (monstersFound) {
            findMonster(newTile.image, newSize)
            return newTile.image.split('').filter(char => char == '#').length - (monstersFound * dragonSize)
        }
        rotateTile90CCW(newTile, newSize)
        monstersFound = findMonster(newTile.image)
        rotations++
    }
    if (!dragon.test(newTile.image)) {
        rotations = 0
        flipTileVertical(newTile, newSize)
        let monstersFound = findMonster(newTile.image)
        while (rotations <= 5) {
            if (monstersFound) {
                findMonster(newTile.image, newSize)
                return newTile.image.split('').filter(char => char == '#').length - (monstersFound * dragonSize)
            }
            rotateTile90CCW(newTile, newSize)
            monstersFound = findMonster(newTile.image)
            rotations++
        }
    }

    return 'found no dragons'
}

module.exports = { part1, part2 }
