const assert = require('assert')
const { preProcessing, runProgram } = require('./script')

const in1 = '1,9,10,3,2,3,11,0,99,30,40,50'
const out1 = '3500,9,10,70,2,3,11,0,99,30,40,50'
const in2 = '1,0,0,0,99'
const out2 = '2,0,0,0,99'
const in3 = '2,3,0,3,99'
const out3 = '2,3,0,6,99'
const in4 = '2,4,4,5,99,0'
const out4 = '2,4,4,5,99,9801'
const in5 = '1,1,1,4,99,5,6,0,99'
const out5 = '30,1,1,4,2,5,6,0,99'

describe('Day 2: 1202 Program Alarm', () => {
    describe('runProgram', () => {
        it('should run the program', () => {
            assert.strictEqual(runProgram(preProcessing(in1)).join(','), out1)
            assert.strictEqual(runProgram(preProcessing(in2)).join(','), out2)
            assert.strictEqual(runProgram(preProcessing(in3)).join(','), out3)
            assert.strictEqual(runProgram(preProcessing(in4)).join(','), out4)
            assert.strictEqual(runProgram(preProcessing(in5)).join(','), out5)
        })
    })
})

