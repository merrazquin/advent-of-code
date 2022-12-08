const assert = require('assert')
const { part1, part2 } = require('./script')

const data1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
const data2 = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
const data3 = 'nppdvjthqldpwncqszvftbrmjlhg'
const data4 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
const data5 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

describe('Day 6: Tuning Trouble', () => {
    describe('Part One', () => {
        it('Find how many characters need to be processed before the first 4-char start-of-packet marker is detected', () => {
            const data = [
                {
                    data: data1,
                    result: 7
                },
                {
                    data: data2,
                    result: 5
                },
                {
                    data: data3,
                    result: 6
                },
                {
                    data: data4,
                    result: 10
                },
                {
                    data: data5,
                    result: 11
                }
            ]
            data.forEach(testItem => {
                assert.strictEqual(part1(testItem.data), testItem.result)
            })
        })
    })

    describe('Part Two', () => {
        it('Find how many characters need to be processed before the first 14-char start-of-packet marker is detected', () => {
            const data = [
                {
                    data: data1,
                    result: 19
                },
                {
                    data: data2,
                    result: 23
                },
                {
                    data: data3,
                    result: 23
                },
                {
                    data: data4,
                    result: 29
                },
                {
                    data: data5,
                    result: 26
                }
            ]
            data.forEach(testItem => {
                assert.strictEqual(part2(testItem.data), testItem.result)
            })
        })
    })
})

