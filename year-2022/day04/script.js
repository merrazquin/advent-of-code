'use strict'

// Setup
const preprocessing = (input) => input.trim().split('\n')
    .map(pair => {
        const [elf1, elf2] = pair.split(',')
        const [elf1Start, elf1End] = elf1.split('-').map(num => parseInt(num))
        const [elf2Start, elf2End] = elf2.split('-').map(num => parseInt(num))
        return { 
            elf1Start, elf1End,
            elf2Start, elf2End
        }
    })

const p1Filter = ({elf1Start, elf1End, elf2Start, elf2End}) => ((elf1Start <= elf2Start && elf1End >= elf2End) || (elf2Start <= elf1Start && elf2End >= elf1End)) 
const p2Filter = ({elf1Start, elf1End, elf2Start, elf2End}) => 
    (elf1End >= elf2Start && elf1End <= elf2End) ||
    (elf2End >= elf1Start && elf2End <= elf1End) || 
    (elf1Start >= elf2Start && elf1Start <= elf2End) || 
    (elf2Start >= elf1Start && elf2Start <= elf1End)

// Part 1
// ======

const part1 = input => {
    const data = preprocessing(input)
    return data.filter(p1Filter).length
}

// Part 2
// ======

const part2 = input => {
    const data = preprocessing(input)
    return data.filter(p2Filter).length
}

module.exports = { part1, part2 }
