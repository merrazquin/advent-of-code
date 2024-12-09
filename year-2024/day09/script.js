'use strict'
const { sumAll } = require('../../utils')

// Setup
const preProcessing = input => {
    return input.split('').map((num, index) => {
        const isFree = index % 2
        num = parseInt(num)
        return {
            index: Math.ceil(index / 2),
            length: num,
            isFree,
            cleaned: false,
            moved: false,
            fileBlocks: isFree ? [] : new Array(num).fill(index / 2)
        }
    })
}

// Part 1
// ======

const part1 = input => {
    const blocks = preProcessing(input)

    let freeSpace = blocks.find(block => block.isFree && block.fileBlocks.length < block.length)
    while (freeSpace) {
        if (blocks.findIndex(block => block.cleaned) > -1 && blocks.indexOf(freeSpace) > blocks.findIndex(block => block.cleaned)) {
            break
        }
        while (freeSpace.fileBlocks.length < freeSpace.length) {
            const lastBlockIndex = blocks.findLastIndex(block => !block.isFree && !block.cleaned)
            if (lastBlockIndex === -1) {
                process.exit()
            }
            const lastBlock = blocks[lastBlockIndex]
            let len = lastBlock.length
            while (len && freeSpace.fileBlocks.length < freeSpace.length) {
                freeSpace.fileBlocks.push(lastBlock.index)
                len--
            }
            if (!len) {
                lastBlock.cleaned = true
                lastBlock.length = 0
            } else {
                lastBlock.length = len
            }
        }
        freeSpace = blocks.find(block => block.isFree && block.fileBlocks.length < block.length)
    }
    return sumAll(blocks.filter(block => !block.cleaned).map(block => block.fileBlocks).flat().map((val, index) => val * index))

}

// Part 2
// ======

const part2 = input => {
    let blocks = preProcessing(input)

    let lastBlockIndex = blocks.findLastIndex(block => !block.isFree && !block.moved)
    while (lastBlockIndex > -1) {
        const lastBlock = blocks[lastBlockIndex]
        const freeSpace = blocks.find((block, freeIndex) => block.isFree && freeIndex <= lastBlockIndex && block.length - block.fileBlocks.length >= lastBlock.length)
        if (freeSpace) {
            freeSpace.fileBlocks.push(...lastBlock.fileBlocks)
            lastBlock.cleaned = true
            lastBlock.fileBlocks = new Array(lastBlock.length).fill(0)
        }

        lastBlock.moved = true
        lastBlockIndex = blocks.findLastIndex(block => !block.isFree && !block.moved)
    }

    // fill in remaining free-space as 0
    blocks = blocks.map(block => {
        if (block.isFree && block.fileBlocks.length < block.length) {
            const currLen = block.fileBlocks.length
            block.fileBlocks.length = block.length
            block.fileBlocks.fill(0, currLen)
        }
        return block
    })
    return sumAll(blocks.map(block => block.fileBlocks).flat().map((val, index) => val * index))
}

module.exports = { part1, part2 }
