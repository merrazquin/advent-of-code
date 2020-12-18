'use strict'

// Setup
const {sumAll} = require('../../utils')
const preprocessing = input => {
    return input.split('\n')
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

const evaluateParentheticals = expression => {
    const parenRegExp = /\([^\(\)]+\)/
    let match = parenRegExp.exec(expression)
    while(match) {
        expression = expression.split('')
        expression.splice(match.index, match[0].length, evaluateExpressionLeftToRight(match[0]))
        expression = expression.join('')
        match = parenRegExp.exec(expression)
    }
    return evaluateExpressionLeftToRight(expression)
}

const evaluateSimpleParentheticals = expression => {
    const parenRegExp = /\(\d+ .{1} \d+\)/
    let match = parenRegExp.exec(expression)
    while (match) {
        expression = expression.split('')
        expression.splice(match.index, match[0].length, eval(match[0]))
        expression = expression.join('')
        match = parenRegExp.exec(expression)
    }
    return evaluateExpressionLeftToRight(expression)
}

// Part 1
// ======

const part1 = input => {
    return sumAll(preprocessing(input).map(expression => evaluateParentheticals(expression)));
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2, evaluateExpression: evaluateSimpleParentheticals, evaluateExpressionLeftToRight, evaluateParentheticals }
