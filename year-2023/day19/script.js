'use strict'

const { sumAll, memoize } = require('../../utils')
const TreeModel = require('tree-model')

// Setup
const preProcessing = input => {
    const instructionMap = new Map()
    let [instructions, partRatings] = input.split('\n\n')
    instructions.split('\n').map(instruction => {
        let [label, rules] = instruction.replace('}', '').split('{')
        rules = rules.split(',').map(rule => {
            if (rule.indexOf(':') !== -1) {
                const [expression, goto] = rule.split(':')
                return {expression, goto}
            } else {
                return {expression: 'x>0', goto: rule}
            }
        })
        instructionMap.set(label, rules)
    })
    return {
        instructionMap,
        partRatings: partRatings.split('\n').map(part => {
            let p
            eval(`p = ${part.replace(/=/g, ':')}`)
            return p
        }) 
    }
}

// Part 1
// ======
const processRule = (instructionMap, ruleName, part) => {
    if (ruleName === 'R') {
        return 0
    }

    if (ruleName === 'A') {
        return sumAll(Object.values(part))
    }

    const rules = instructionMap.get(ruleName)
    for (const rule of rules) {
        if (eval(`part.${rule.expression}`)) {
            return processRule(instructionMap, rule.goto, part)
        }
    }
}
const part1 = input => {
    const {instructionMap, partRatings} = preProcessing(input)
    return sumAll(partRatings.map(part => processRule(instructionMap, 'in', part)))
}

// Part 2
// ======
const generateTree = (tree, instructionMap, parentNode, children) => {
    for (const child of children) {
        const childNode = tree.parse({id: child.goto, expression: child.expression})
        parentNode.addChild(childNode)

        const newChildren = instructionMap.get(child.goto) 
        if (newChildren) {
            generateTree(tree, instructionMap, childNode, newChildren)
        }
    }
}
const getBothSides = expression => {
    const left = memGetRange(expression)
    const right = memGetRange(expression, true)
    return {left, right}
}
const generateBinaryTree = (tree, instructionMap, parentNode, children) => {
    for (const child of children) {
        const {left, right} = getBothSides(child.expression)
        const childNodeLeft = tree.parse({id: child.goto + 'L', ...left})
        const childNodeRight = tree.parse({id: child.goto + 'R', ...right})
        parentNode.addChild(childNodeLeft)
        parentNode.addChild(childNodeRight)

    }
    console.log(parentNode.children.map(node => node.model))
    process.exit()
}

const getRange = (expression, negated = false) => {
    const [, property, comparison, valString] = expression.match(/(\w)([><])(\d+)/)
    const val = parseInt(valString)
    return {
        property,
        comparison: negated ? (comparison === '>' ? '<' : '>') : comparison,
        val: negated ? (comparison === '>' ? (val + 1) : (val - 1)) : val
    }
}
const memGetRange = memoize(getRange)

const part2 = input => {
    const {instructionMap} = preProcessing(input)

    const tree = new TreeModel()
    const root = tree.parse({id: 'in'})
    const children = instructionMap.get('in')
    // generateBinaryTree(tree, instructionMap, root, children)
    generateTree(tree, instructionMap, root, children)
    const acceptable = root.all({strategy: 'post'}, (node) => node.model.id === 'A')
    // console.log(acceptable.map(aceepted => aceepted.getPath().map(node => node.model.id)))
    const ranges = []
    for (const node of acceptable) {
        const path = node.getPath()
        console.log(path.map(pathNode => pathNode.model.id))
        const pathRanges = {x: {}, m: {}, a: {}, s:{}}
        for (const pathNode of path) {
            if (pathNode.model.id === 'in' || pathNode.model.expression === 'x>0') {
                continue
            }

            // console.log(pathNode.model.expression)
            const {property, comparison, val} = getRange(pathNode.model.expression)
            const newVal = val + (comparison === '>' ? 1 : -1)
            const compKey = comparison === '>' ? 'min' : 'max'
            const oldVal = pathRanges[property][compKey] 
            pathRanges[property][compKey] = comparison === '>' ? (Math.max(oldVal, newVal) || newVal) : (Math.min(oldVal, newVal) || newVal) 
        }
        ranges.push(pathRanges)
        console.log(pathRanges)
    }
    // console.log(ranges)
    process.exit()

    const currentCase = {x: {min: 0, max: 4000}, m: {min: 0, max: 4000}, a: {min: 0, max: 4000}, s: {min: 0, max: 4000}}

    // for (const node of acceptable) {
    //     getCases(currentCase, node)
    // }

    let total = 0
    const possibleRanges = []
    for (const node of acceptable) {
        // const perms = {x: 4000, m: 4000, a: 4000, s: 4000}
        const perms = {maxx: 4000, minx: 0, maxm: 4000, minm: 0, maxa: 4000, mina: 0, maxs: 4000, mins: 0}
        const path = node.getPath()
        console.log(path.map(pathNode => pathNode.model.id === 'in' ? 'in' : (pathNode.model.id + ': ' + pathNode.model.expression)).join(' | '))
        for (const pathNode of path) {
            if (pathNode.model.id !== 'in') {
                if (pathNode.getIndex() === 0) {
                    const {property, comparison, val} = getRange(pathNode.model.expression)
                    const isMin = comparison === '>'
                    const minmaxprop = (isMin ? 'min' : 'max') + property
                    const currminmax = perms[minmaxprop]
                    perms[minmaxprop] = isMin ? Math.max(val + 1, currminmax) : Math.min(val - 1, currminmax)
                }
                else {
                    const parent = pathNode.parent
                    for (let i = 0; i < pathNode.getIndex(); i++) {
                        const sibling = parent.children[i]
                        const {property, comparison, val} = getRange(sibling.model.expression)
                        const isMin = comparison === '<'
                        const minmaxprop = (isMin ? 'min' : 'max') + property
                        const currminmax = perms[minmaxprop]
                        perms[minmaxprop] = isMin ? Math.max(val - 1, currminmax) : Math.min(val + 1, currminmax)
                    }
                }
            }
        }
        
        // console.log(perms)
        possibleRanges.push(perms)
    }
    
    // find overlapping ranges?
    const perms = {maxx: 4000, minx: 0, maxm: 4000, minm: 0, maxa: 4000, mina: 0, maxs: 4000, mins: 0}
    for (const property of ['x', 'm', 'a', 's']) {
        perms['min' + property] = Math.min(...possibleRanges.map(range => range['min' + property]))
        perms['max' + property] = Math.min(...possibleRanges.map(range => range['max' + property]))
    }
    console.log('x\n' + possibleRanges.map(range => range.minx + ' - ' + range.maxx).join('\n'), '\n')
    console.log('m\n' + possibleRanges.map(range => range.minm + ' - ' + range.maxm).join('\n'), '\n')
    console.log('a\n' + possibleRanges.map(range => range.mina + ' - ' + range.maxa).join('\n'), '\n')
    console.log('s\n' + possibleRanges.map(range => range.mins + ' - ' + range.maxs).join('\n'), '\n')
    const x = perms.maxx - perms.minx
    const m = perms.maxm - perms.minm
    const a = perms.maxa - perms.mina
    const s = perms.maxs - perms.mins
    console.log(x, m, a, s)
    return (x * m * a * s)
}

module.exports = { part1, part2 }
