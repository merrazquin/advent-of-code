'use strict'

// Setup
const {sumAll} = require('../../utils')
const preprocessing = input => {
    return input.split('\n')
}

const evaluateAdditionsFirst = expression => {
    const additionRegExp = /(\d+ \+{1} \d+)/
    let match = additionRegExp.exec(expression)
    while (match) {
        expression = expression.split('')
        expression.splice(match.index, match[0].length, eval(match[0]))
        expression = expression.join('')
        if(/\(\d+\)/.exec(expression)) {
            expression = eval(expression)
        }

        match = additionRegExp.exec(expression)
    }

    return eval(expression)
}

const evaluateExpressionLeftToRight = expression => {
    const exprRegExp = /(\d+ .{1} \d+)/
    let match = exprRegExp.exec(expression)
    while (match) {
        expression = expression.split('')
        expression.splice(match.index, match[0].length, eval(match[0]))
        expression = expression.join('')
        if(/\(\d+\)/.exec(expression)) {
            expression = eval(expression)
        }

        match = exprRegExp.exec(expression)
    }
    return eval(expression)
}

const evaluateExpression = (expression, addFirst = false) => {
    const parenRegExp = /\([^()]+\)/
    let match = parenRegExp.exec(expression)
    while(match) {
        expression = expression.split('')
        let replacement = addFirst ? evaluateAdditionsFirst(match[0]) : evaluateExpressionLeftToRight(match[0])
        expression.splice(match.index, match[0].length, replacement)
        expression = expression.join('')
        match = parenRegExp.exec(expression)
    }

    return addFirst ? evaluateAdditionsFirst(expression) : evaluateExpressionLeftToRight(expression)
}

// Part 1
// ======

const part1 = input => {
    return sumAll(preprocessing(input).map(expression => evaluateExpression(expression)))
}

// Part 2
// ======

const part2 = input => {
    return sumAll(preprocessing(input).map(expression => evaluateExpression(expression, true)))
}

module.exports = { part1, part2, evaluateExpression, evaluateAdditionsFirst }
