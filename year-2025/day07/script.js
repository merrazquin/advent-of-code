'use strict'

const { getNeighboringCell, findNeighbors, debugGrid, sumAll } = require('../../utils')

// Setup
const preProcessing = input => {
    let diagram = input.trim().split('\n').map(row => row.split(''))
    
    let height = diagram.length
    let width = diagram[0].length
    diagram = diagram.join(',').split(',')
    return {
        width,
        height,
        diagram: diagram,
        splitters: diagram.map((el, index) => el === '^' ? index : -1).filter(el => el != -1)
    }

}

// Part 1
// ======

const part1 = input => {
    const { diagram, width, splitters } = preProcessing(input)
    let startIndex = diagram.indexOf('S')
    let beams = [
        {
            id: startIndex,
            path: [startIndex],
            index: startIndex,
            done: false,
            split: false
        }
    ]

    let splitPoints = new Set()
    do {
        const activeBeams = beams.filter(beam => !beam.done && !beam.split)
        activeBeams.forEach(beam => {
            const nextIndex = getNeighboringCell(beam.index, 'S', diagram, width)
            if (nextIndex == -1) {
                beam.done = true
            } else if (diagram[nextIndex] === '^') {
                splitPoints.add(nextIndex)
                beam.split = true
                const leftIndex = getNeighboringCell(nextIndex, 'W', diagram, width)
                const rightIndex = getNeighboringCell(nextIndex, 'E', diagram, width)

                if (!beams.find(beam => beam.index === leftIndex)) {
                    beams.push({
                        id: leftIndex,
                        path: [leftIndex],
                        index: leftIndex,
                        done: false,
                        split: false
                    })
                }
                if (!beams.find(beam => beam.index === rightIndex)) {
                    beams.push({
                        id: rightIndex,
                        path: [rightIndex],
                        index: rightIndex,
                        done: false,
                        split: false
                    })
                }
            } else {
                beam.path.push(nextIndex)
                beam.index = nextIndex
            }
        })
        
    } while (beams.filter(beam => !beam.split && !beam.done).length)
    return splitPoints.size
}

// Part 2
// ======

const part2 = input => {
    /**
     * Heavy lifting: https://www.reddit.com/r/adventofcode/comments/1pgb377/2025_day_7_part_2_hint/
     */
    const { diagram, width, height } = preProcessing(input)
    let startIndex = diagram.indexOf('S')
    let beams = [
        {
            id: startIndex,
            path: [startIndex],
            index: startIndex,
            done: false,
            split: false,
            count: 1
        }
    ]

    do {
        const activeBeams = beams.filter(beam => !beam.done && !beam.split)
        activeBeams.forEach(beam => {
            const nextIndex = getNeighboringCell(beam.index, 'S', diagram, width)
            if (nextIndex == -1) {
                beam.done = true
            } else if (diagram[nextIndex] === '^') {
                beam.split = true
                const leftIndex = getNeighboringCell(nextIndex, 'W', diagram, width)
                const rightIndex = getNeighboringCell(nextIndex, 'E', diagram, width)

                const leftBeam = beams.find(beam => beam.index === leftIndex)
                if (!leftBeam) {
                    beams.push({
                        id: leftIndex,
                        path: [leftIndex],
                        index: leftIndex,
                        done: false,
                        split: false,
                        count: beam.count
                    })
                } else {
                    leftBeam.count += beam.count
                }
                const rightBeam = beams.find(beam => beam.index === rightIndex);
                if (!rightBeam) {
                    beams.push({
                        id: rightIndex,
                        path: [rightIndex],
                        index: rightIndex,
                        done: false,
                        split: false,
                        count: beam.count
                    })
                } else {
                    rightBeam.count += beam.count
                }
            } else {
                beam.path.push(nextIndex)
                beam.index = nextIndex
            }
        })
        
    } while (beams.filter(beam => !beam.split && !beam.done).length)

    return sumAll(beams.filter(beam => beam.done).map(beam => beam.count))
}
// 3094 is too low

module.exports = { part1, part2 }
