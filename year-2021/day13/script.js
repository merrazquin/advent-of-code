'use strict'

const { convertRowsToCols } = require('../../utils')

// Setup

const stackSides = (sideA, sideB) => {
    const foldedPaper = new Array(sideA.length).fill('').map(() => [])
    sideA.forEach((row, y) => {
        row.forEach((col, x) => {
            foldedPaper[y][x] = col == '#' || sideB[y][x] == '#' ? '#' : '.'
        })
    })

    return foldedPaper
}

const foldHorizontal = (paper, line) => {
    const top = paper.slice(0, line)
    const bottom = convertRowsToCols(convertRowsToCols(paper.slice(line + 1)).map(col => col.reverse()))

    return stackSides(top, bottom)
}

const foldVertical = (paper, line) => {
    const left = [], right = []
    paper.forEach(row => {
        left.push(row.slice(0, line))
        right.push(row.slice(line + 1).reverse())
    })
    return stackSides(left, right)
}

const debugPaper = paper => {
    return paper.map(row => row.join('')).join('\n')
}

const parseInput = input => {
    let [dots, folds] = input.trim().split('\n\n')
    let maxX = 0
    let maxY = 0
    dots = dots.trim().split('\n').map(point => {
        const [x, y] = point.trim().split(',').map(num => parseInt(num))
        maxX = Math.max(x, maxX)
        maxY = Math.max(y, maxY)
        return {x, y}
    })
    folds = folds.trim().split('\n').map(fold => {
        let [direction, line] = fold.trim().split(' ')[2].split('=')
        return {
            direction: direction == 'y' ? 'horizontal' : 'vertical',
            line: parseInt(line)
        }
    })

    let paper = new Array(maxY + 1).fill('').map(
        () => new Array(maxX + 1).fill('.')
    )
    dots.forEach(dot => {
        paper[dot.y][dot.x] = '#'
    })
    return {paper, folds}
}

// Part 1
// ======

const part1 = input => {
    let {paper, folds} = parseInput(input)
    const firstFold = folds[0]

    if (firstFold.direction === 'horizontal') {
        paper = foldHorizontal(paper, firstFold.line)
    } else {
        paper = foldVertical(paper, firstFold.line)
    }

    return paper.reduce((dotCount, row) => {
        return dotCount + row.filter(point => point === '#').length
    }, 0)
}

// Part 2
// ======

const part2 = input => {
    let {paper, folds} = parseInput(input)

    folds.forEach(fold => {
        if (fold.direction === 'horizontal') {
            paper = foldHorizontal(paper, fold.line)
        } else {
            paper = foldVertical(paper, fold.line)
        }
    })
    return debugPaper(paper)
}

module.exports = { part1, part2 }
