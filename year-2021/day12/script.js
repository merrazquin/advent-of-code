'use strict'

const cytoscape = require('cytoscape')
const cytoscapeAllPaths = require('cytoscape-all-paths')
cytoscape.use(cytoscapeAllPaths)

const flattenDeep = require('lodash.flattendeep')
// Setup

const processPaths = input => {
    const instructions = input.trim().split('\n')
    const elements = [... new Set(flattenDeep(instructions.map(instruction => instruction.split('-'))))].map(label => ({data: {id: label}}))
    elements.push(...instructions.map(instruction => instruction.split('-')).map(edge => {
        let [source, target] = edge
        if (source === 'end' || target === 'start') {
            ([target, source] = [source, target])
        }
        if (source !== 'start' && source !== 'end' && target !== 'start' && target !== 'end') {
            elements.push({
                data: {
                    id: target+source,
                    source: target,
                    target: source
                }
            })
        }
        return {
            data: {
                id: source+target,
                source, 
                target
            }
        }
    }))
    // console.log(elements)
    return cytoscape({elements})
}

// Part 1
// ======
const func = (currentPath, node, end, paths) => {
    currentPath.push(node)
    let neighbors = start.neighborhood().nodes().slice()
    while (neighbors.length) {
        const childNode = neighbors.shift()

    }
    if (node == end) {
        paths.push(currentPath)
        return
    }

}
const debugPath = path => path.nodes().map(node => node.id())
const part1 = input => {
    const graph = processPaths(input)
    const start = graph.$('#start')
    const end = graph.$('#end')

    let dfs = graph.elements().dfs({
        roots: '#start',
        visit: (v, e, u, i, depth) => {
            console.log(' '.repeat(depth), v.id())
            if (v.id() === 'end') return true
        },
        directed: true
    })
    console.log(debugPath(dfs.path))

    dfs = graph.elements().dfs({
        roots: '#A',
        visit: (v, e, u, i, depth) => {
            console.log(' '.repeat(depth), v.id())
            if (v.id() === 'end') return true
        },
        directed: true
    })
    console.log(debugPath(dfs.path))

    // let paths = []

    // let currentPath = [start.id()]
    // let neighbors = start.neighborhood().nodes()
    // neighbors.forEach(node => {
    //     if (node == end) {
    //         // path is complete, push it onto paths
    //         paths.push(currentPath)
    //     }
    // });

    // const allPaths = graph.elements().cytoscapeAllPaths({rootIds: ['start']})
    // console.log(allPaths.length)
    
    // allPaths.forEach(path => {
    //     console.log(path.nodes().map(el => el.id()))
    // });
    // return allPaths.map(path => path.nodes().map(el => el.id())).filter(path => path.includes('end')).length
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = { part1, part2 }
