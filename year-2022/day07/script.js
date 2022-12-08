'use strict'

const { sumAll } = require('../../utils')
// Setup
const preprocessing = (input) => {
    const lines = input.trim().split('\n')
    lines.shift()
    let command = 'cd'
    let dir = '/'
    let currDirString = '/'
    let collectedDirs = {
        '/': {
            name: '/',
            parent: null,
            total: 0
        }
    }
    while (lines.length) {
        const line = lines.shift()
        switch (line.charAt(0)) {
        case '$':
            ([, command, dir] = line.split(' '))
    
            if (command == 'cd') {
                currDirString = dir === '..' ? collectedDirs[currDirString].parent : `${currDirString}_${dir}`
            }
            break
        case 'd':
            ([, dir] = line.split(' '))
            collectedDirs[`${currDirString}_${dir}`] = {
                name: `${currDirString}_${dir}`,
                parent: currDirString,
                total: 0
            }
            break
        default:
            /* eslint-disable no-case-declarations */
            const fileSize = parseInt(line.split(' ').shift())
            collectedDirs[currDirString].total += fileSize
            let parentDir = collectedDirs[currDirString].parent
            while (parentDir) {
                collectedDirs[parentDir].total += fileSize
                parentDir = collectedDirs[parentDir].parent
            }
            /* eslint-enable no-case-declarations */
        }
    }
    return collectedDirs
}


// Part 1
// ======

const part1 = input => {
    const dirs = preprocessing(input)
    const maxSize = 100000
    return sumAll(Object.values(dirs).map(dir => dir.total).filter(size => size <= maxSize))
}

// Part 2
// ======

const part2 = input => {
    const dirs = preprocessing(input)
    const totalSpace = 70000000
    const targetUnused = 30000000
    const unused = totalSpace - dirs['/'].total
    const dirTarget = targetUnused - unused
    return Object.values(dirs).map(dir => dir.total).filter(total => total >= dirTarget).sort((a, b) => a - b).shift()
}

module.exports = { part1, part2 }
