'use strict'

const inherits = require('inherits')
const List = require('linked-list')

Cups.prototype.join = join
Cup.prototype.toString = toString

inherits(Cups, List)
inherits(Cup, List.Item)

function Cups() {
    List.apply(this, arguments)
}

function Cup(value) {
    this.value = value
    List.Item.apply(this, arguments)
}

function join(delimiter) {
    return this.toArray().join(delimiter)
}

function toString() {
    return this.value
}

// Setup

const preprocessing = input => {
    let cups = input.split('').map(label => parseInt(label))
    let cupNodes = new Array(cups.length)
    let cupList = new Cups()

    while (cups.length) {
        const cupLabel = cups.shift()
        const cup = new Cup(cupLabel)
        cupNodes[cupLabel] = cup
        cupList.append(cup)
    }

    // make it circular
    let currentCup = cupList.head
    currentCup.prev = cupList.tail
    cupList.tail.next = currentCup
    return {
        currentCup,
        cupList,
        cupNodes
    }
}


// Part 1
// ======

const part1 = (input, moves = 100) => {
    let {currentCup, cupList, cupNodes} = preprocessing(input)

    // maintain an array of nodes to easily access them (cupNodes)
    // create a circular linked list of cups (cups)
    // record the "head/current" (first cup listed) (currentCup)
    while (moves) {
        // on a move, grab the 3 cups to the right of the "head"
        // detatch those 3 cups from the head, grab cup attached to "tail" of 3 cups, and attach it to the "head"
        let next3Cups = new Cups(currentCup.next, currentCup.next.next, currentCup.next.next.next)
        // find a destination cup (cup equal to "head" - 1, wrapping around to highest if necessary)
        const currCupLabel = parseInt(currentCup.toString())
        let destinationLabel = currCupLabel - 1
        if (destinationLabel < 1) {
            destinationLabel = cupNodes.length - 1
        }
        let destinationCup = cupNodes[destinationLabel]
        while (destinationCup.list != cupList) { // this could be a p2 gotcha
            destinationLabel--
            if (destinationLabel < 1) {
                destinationLabel = cupNodes.length - 1
            }
            destinationCup = cupNodes[destinationLabel]
        }
        // position 3 cups in between destination and it's "next"
        destinationCup.append(next3Cups.head)
        destinationCup.next.append(next3Cups.head)
        destinationCup.next.next.append(next3Cups.head)
        // select new "head" by grabbing the cup directly to right of the current "head"
        currentCup = currentCup.next
        
        moves--
    }
 
    // after n moves, return a string of all cups in order except `1`
    let startingNode = cupNodes[1]
    let nextNode = startingNode.next
    const finalString = [nextNode.toString()]
    do {
        nextNode = nextNode.next
        finalString.push(nextNode.toString())
    } while(nextNode.next != startingNode)

    return finalString.join('')
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
