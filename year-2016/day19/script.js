'use strict'

const inherits = require('inherits')
const List = require('linked-list')

Elves.prototype.join = join
Elf.prototype.toString = toString

inherits(Elves, List)
inherits(Elf, List.Item)

function Elves() {
    List.apply(this, arguments)
}

function Elf(value, numGifts) {
    this.value = value
    this.numGifts = numGifts
    List.Item.apply(this, arguments)
}

function join(delimiter) {
    return this.toArray().join(delimiter)
}

function toString() {
    return this.value
}

const preprocessing = numElves => {
    let elfNodes = new Array(numElves)
    let elfList = new Elves()

    for (let i = 0; i < numElves; i++) {
        const elfLabel = i + 1
        const elf = new Elf(elfLabel, 1)
        elfNodes[i] = elf
        elfList.append(elf)
    }

    // make it circular
    let currentElf = elfList.head
    currentElf.prev = elfList.tail
    elfList.tail.next = currentElf
    return {
        currentElf,
        elfList,
        elfNodes
    }
}

const playGame = (currentElf, elfList) => {
    while (elfList.size > 1) {
        let nextElf = currentElf.next
        // currentElf.numGifts += nextElf.numGifts
        currentElf.append(nextElf.next)
        nextElf.detach()

        currentElf = currentElf.next
    }
    return elfList.tail.toString()
}
/*
1001764
*/
const playGameSpecialRules = (currentElf, elfList, elfNodes) => {
    while (elfList.size > 1) {
        const indexOfCurrent = elfNodes.indexOf(currentElf)
        let positionsToMove = Math.ceil((elfList.size - 1) / 2)
        const indexOfNext = (indexOfCurrent + positionsToMove) % elfNodes.length
        // console.log(indexOfCurrent, positionsToMove, indexOfNext, elfNodes.length)
        let nextElf = elfNodes[indexOfNext]
        currentElf.numGifts += nextElf.numGifts
        nextElf.prev.append(nextElf.next)
        elfNodes.splice(indexOfNext, 1)
        nextElf.detach()

        currentElf = currentElf.next
    }
    return elfList.tail.toString()
}

// Part 1
// ======

const part1 = input => {
    const numElves = parseInt(input)
    const {
        currentElf,
        elfList
    } = preprocessing(numElves)
    return playGame(currentElf, elfList)
}

// Part 2
// ======

const part2 = input => {
    const numElves = parseInt(input)
    const {
        currentElf,
        elfList,
        elfNodes
    } = preprocessing(numElves)
    return playGameSpecialRules(currentElf, elfList, elfNodes)
}

module.exports = { part1, part2 }