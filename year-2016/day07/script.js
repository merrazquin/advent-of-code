'use strict'

// Part 1
// ======

const findABBA = str => {
    const abba = /([a-z])(?!\1)([a-z])\2\1/
    return abba.test(str)
}

const findABA = str => {
    let aba = []
    let i = str.search(/([a-z])(?!\1)([a-z])\1/)
    while (i > -1) {
        aba.push(str.substr(i, 3))
        str = str.substr(i + 1)
        i = str.search(/([a-z])(?!\1)([a-z])\1/)
    }
    return aba
}

const findHypernetSequences = str => {
    const hypernetSequence = /\[([a-z]+)\]/g
    return str.match(hypernetSequence)
}

const stripHypernetSequences = str => {
    const hypernetSequence = /\[[a-z]+\]/
    return str.split(hypernetSequence)
}

const part1 = input => {
    return input.trim().split('\n').filter(str => findABBA(str) && !findHypernetSequences(str).filter(findABBA).length).length
}

/*
ntfdficysbefpup|pwrbdoceiweqrfyrx|jolpetpuszxjkxuupke|cpdzzdzkwbucybc
[ 'fdf', 'pup', 'zdz' ]
[
  '[fvdhtaqmjosqoxosu]',
  '[ftlwubetphczbxhx]',
  '[mbcbzrxeoqpibuyjsgg]'
]*/

// Part 2
// ======
// 260 too high
const part2 = input => {
    return input.trim().split('\n').reduce((acc, str) => {
        const hypernetSequences = findHypernetSequences(str)
        const strippedStr = stripHypernetSequences(str).join('|')
        const aba = findABA(strippedStr)
        if (aba.length) {
            aba.some(aba => {
                const bab = aba[1] + aba[0] + aba[1]
                if (hypernetSequences.filter(hypernetSequence => hypernetSequence.includes(bab)).length) {
                    acc++
                    return true
                }
                return false
            })
        }
        return acc
    }, 0)
}

module.exports = { part1, part2, findABBA, findABA, stripHypernetSequences, findHypernetSequences }