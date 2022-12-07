'use strict'

const TreeModel = require('tree-model')
const { sumAll } = require('../../utils')
// Setup
// 677333 too low for p1
const preprocessing = (input) => {
    const lines = input.trim().split('\n')
    lines.shift()
    let currCommand = ''
    let command = 'cd'
    let dir = '/'
    const tree = new TreeModel()
    const root = tree.parse({name: '/', children: []})
    let currDir = root
    let currDirString = '/'
    let totals = {
        '/': 0
    }
    let dirs = {
        '/': root
    }
    let collectedDirs = {
        '/': {
            parent: null,
            total: 0
        }
    }
    while (lines.length) {
        const line = lines.shift()
        switch (line.charAt(0)) {
            case '$':
                ([, command, dir] = line.split(' '))
                currCommand = command
    
                if (currCommand == 'cd') {
                    switch (dir) {
                        case '/':
                            // console.log('** CD to root')
                            break;
                        case '..':
                            // console.log('** CD up one dir')
                            // console.log(`   parent of ${currDir.model.name}`)
                            currDirString = collectedDirs[currDirString].parent
                            currDir = currDir.model.parent
                            // console.log(`   is ${currDir.model.name}`)
                            break;
                        default:
                            // console.log(`** CD to ${dir}`)
                            currDirString = dir
                            let node = dirs[dir]
                            if (!node) {
                                node = tree.parse({name: dir, children: []})
                                dirs[dir] = node
                            }
                            currDir = node
                    }
                } else if (currCommand == 'ls') {
                    currCommand = 'ls'
                    // console.log(`Start listing contents of ${currDir.model.name}`)
                }
                break;
            case 'd':
                ([, dir] = line.split(' '))
                if (!collectedDirs[dir]) {
                    collectedDirs[dir] = {
                        parent: currDirString,
                        total: 0
                    }
                }
                // console.log(`add ${dir} as child of ${currDir.model.name}`)
                let dirNode
                if (dirs[dir] === undefined) {
                    totals[dir] = 0
                    dirNode = tree.parse({name: dir, parent: currDir, children: []})
                    dirs[dir] = dirNode
                } else {
                    dirNode = dirs[dir]
                }
                currDir.addChild(dirNode)
                break;
            default:
                let fileSize, fileName
                ([fileSize, fileName] = line.split(' '))
                fileSize = parseInt(fileSize)
                // console.log(`add ${fileSize} to ${currDir.model.name}`)
                collectedDirs[currDirString].total += fileSize
                let parentDir = collectedDirs[currDirString].parent
                while (parentDir) {
                    // console.log(`   add to parent`)
                    collectedDirs[parentDir].total += fileSize
                    parentDir = collectedDirs[parentDir].parent
                }
                if (!totals[currDir.model.name]) {
                    totals[currDir.model.name] = 0
                }
                totals[currDir.model.name] += fileSize
                let parentNode = currDir.model.parent
                while (parentNode) {
                    if (!totals[parentNode.model.name]) {
                        totals[parentNode.model.name] = 0
                    }
                    totals[parentNode.model.name] += fileSize
                    parentNode = parentNode.model.parent
                }
                let fileNode = tree.parse({name: fileName, parent: currDir, size: fileSize})
                currDir.addChild(fileNode)
        }
    }
    console.log(`**** matching? ${Object.keys(totals).length}, ${Object.keys(dirs).length}`)
    console.log(collectedDirs)
    return collectedDirs
}


// Part 1
// ======

const part1 = input => {
    const dirs = preprocessing(input)
    console.log(dirs)
    const maxSize = 100000
    return sumAll(Object.values(dirs).map(dir => dir.total).filter(size => size <= maxSize))
}

// Part 2
// ======

const part2 = input => {
    // const data = preprocessing(input)
    return 0
}

module.exports = { part1, part2 }
