'use strict'
const { sumAll, multiplyAll } = require('../../utils')

// Setup
const preProcessing = input => {
    const rows = input.trim().split('\n')
    const [operator, ...operands] = rows.reverse()
    return {
        operands: operands.map(operandRow => operandRow.trim().split(/\s+/).map(el => parseInt(el))),
        op: operator.trim().split(/\s+/)
    }
}

// Part 1
// ======

const part1 = input => {
    const {operands, op} = preProcessing(input)
    let tally = 0
    op.forEach((op, index) => {
        const operation = op === '+' ? sumAll : multiplyAll
        tally += operation(operands.map(row => row[index]))
    })
    return tally
}

// Part 2
// ======

const part2 = input => {
    const rows = input.split('\n')
    let [operator, ...operands] = rows.reverse()
    operands = operands.reverse().map(
        row => row.split('').map(el => el == '' ? '' : el.split('').map(el => el)).flat()
    )
    operator = operator.split('')
    let ind = -1
    let currOp = ''
    let operandArr = []
    let tally = 0
    while (ind < operands[0].length) {
        ind++
        if (operator[ind] == '*' || operator[ind] === '+') {
            if (operandArr.length) {
                const operation = currOp === '+' ? sumAll : multiplyAll
                operandArr = operandArr.map(el => (parseInt(el.trim()) || 0)).filter(el => el !== 0)
                const total = operation(operandArr)
                tally += total
            }
            operandArr = []
            currOp = operator[ind]
        }
        operandArr.push(operands.map(row => row[ind]).join(''))
    }
    const operation = currOp === '+' ? sumAll : multiplyAll
    operandArr = operandArr.map(el => (parseInt(el.trim()) || 0)).filter(el => el !== 0)
    const total = operation(operandArr)
    tally += total
    return tally
}

module.exports = { part1, part2 }
