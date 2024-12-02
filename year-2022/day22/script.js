'use strict'


// Setup
const doDebug = false
const preprocessing = (input) => {
    let [rowMap, instructions] = input.split('\n\n')
    let steps = instructions.split(/[RL]/).filter(step => step != '').map(step => parseInt(step))
    let facings = instructions.split(/[0-9]+/).filter(facing => facing != '')
    rowMap = rowMap.split('\n').map(row => row.split(''))
    const colCount = Math.max(...rowMap.map(row => row.length))
    let colMap = new Array(colCount).fill('').map(() => [])
    rowMap.forEach(row => {
        row.forEach((col, index) => {
            try {
                colMap[index].push(col)
            } catch (err) {
                console.log(`error: ${err.toString()}`)
                console.log(`tried to push onto ${index} of`, col)
            }
        })
    })

    return {
        rowMap,
        colMap,
        steps,
        facings
    }
}

const getMovement = facing => {
    const movement = {row: 0, col: 0}
    switch (facing % 360) {
    case 0: 
        movement.col = 1 
        break
    case -270:
    case 90:
        movement.row = 1
        break
    case -180:
    case 180:
        movement.col = -1
        break
    case -90:
    case 270:
        movement.row = -1
        break
    }
    return movement
}

const debug = (map, row, col, facing) => {
    if (!doDebug) return
    const mapCopy = JSON.parse(JSON.stringify(map))
    let marker = '>'
    switch (facing % 360) {
    case 0: marker = '>'; break
    case -270:
    case 90: marker = 'v'; break
    case -180:
    case 180: marker = '<'; break
    case -90:
    case 270: marker = '^'; break
    }
    mapCopy[row][col] = marker

    mapCopy.forEach(row => {
        console.log(row.join(''))
    })
    console.log('\n')
}

// Part 1
// ======
// 48490 is too low
const part1 = input => {
    const {rowMap, colMap, steps, facings} = preprocessing(input)
    let row = 0
    let col = rowMap[0].findIndex(pixel => pixel == '.')
    let facing = 0

    // console.log(`starting at ${row}, ${col}, ${facing}`)
    debug(rowMap, row, col, facing)

    while (steps.length && facings.length) {
        let stepCount = steps.shift()
        if (stepCount == undefined) {
            break
        }
        let movement = getMovement(facing)
        // console.log(`walking ${stepCount} facing ${facing}`)

        while (stepCount--) {
            let nextTile = undefined 
            try {
                nextTile = rowMap[row + movement.row][col + movement.col]
            } catch (error) {
                // off the board
            }
            if (!nextTile || nextTile == ' ') {
                // console.log(`wrapping around from ${row}, ${col}, ${facing}`)
                debug(rowMap, row, col, facing)
                if (movement.col) {
                    const rowInQuestion = rowMap[row].slice()
                    let proposedCol
                    if (movement.col == -1) {
                        proposedCol = (rowInQuestion.length - 1) - rowInQuestion.reverse().findIndex(pixel => pixel !== ' ')
                    } else {
                        proposedCol = rowInQuestion.findIndex(pixel => pixel !== ' ')
                    }
                    nextTile = rowMap[row][proposedCol]
                    if (nextTile !== '#') {
                        // console.log(`walked to ${row}, ${proposedCol}`)
                        stepCount--
                        col = proposedCol
                    }
                } else {
                    const colInQuestion = colMap[col].slice()
                    let proposedRow
                    if (movement.row == -1) {
                        proposedRow = (colInQuestion.length - 1) - colInQuestion.reverse().findIndex(pixel => pixel !== ' ')
                    } else {
                        proposedRow = colInQuestion.findIndex(pixel => pixel !== ' ')
                    }
                    nextTile = rowMap[proposedRow][col]
                    if (nextTile !== '#') {
                        // console.log(`walked to ${proposedRow}, ${col}`)
                        stepCount--
                        row = proposedRow
                    }
                }
            }
            if (nextTile === '.') {
                row += movement.row
                col += movement.col
                // console.log(`walked to ${row}, ${col}`)
            } else if (nextTile === '#') {
                // console.log(`found wall at ${row + movement.row}, ${col + movement.col}, ${facing}`)
                debug(rowMap, row, col, facing)
                const turnFacing = facings.shift()
                if (turnFacing == undefined) {
                    break
                }
                facing += turnFacing == 'R' ? 90 : -90
                movement = getMovement(facing)
                // console.log(`turned ${turnFacing}, new facing is ${facing}`)
                stepCount = steps.shift()
                if (stepCount == undefined) {
                    break
                }
                // console.log(`walking ${stepCount} facing ${facing}`)
                // console.log('')
            }
        }
        // console.log('done walking, now turning')
        const turnFacing = facings.shift()
        if (turnFacing == undefined) {
            break
        }
        facing += turnFacing == 'R' ? 90 : -90
        movement = getMovement(facing)
        // console.log(`turned ${turnFacing}, new facing is ${facing}`)
        debug(rowMap, row, col, facing)
    }
    console.log(`ended up at ${row}, ${col}, ${facing}`)
    return (1000 * (row + 1)) + (4 * (col + 1)) + facing
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    // return data
}

module.exports = { part1, part2, options: { noTrim: true }  }
