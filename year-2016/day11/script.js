'use strict'
/* eslint-disable */  
// Part 1
// ======
class Generator {
    constructor (element) {
        this.element = element
    }
    toString() {
        return this.element + ' Generator'
    }
}
class Microchip {
    constructor (element) {
        this.element = element
    }
    toString() {
        return this.element + '-compatible Microchip'
    }
}
class Floor {
    constructor (num, contents) {
        this.num = num
        this.contents = contents
        this.contents.forEach(object => object.floor = this)
    }
    addItem(item) {
        this.contents.push(item)
        item.floor = this
    }
    removeItem(removedItem) {
        this.contents = this.contents.filter(item => item !== removedItem)
        removedItem.floor = null
    }
    getContents() {
        return this.contents
    }

    isSafeFor(object) {
        if (this === object.floor) {
            console.log('   same floor')
            return true
        }

        return this.contents.every(otherObject => {
            return ((object instanceof Microchip) && (otherObject instanceof Microchip))
                || ((object instanceof Generator) && (otherObject instanceof Generator))
                || object.element == otherObject.element 
        })
    }
}

const findSafeFloors = (object, floors) => {
    return floors.filter(floor => floor.isSafeFor(object))
}

const generateFloors = instructions => {
    const objectsRegex = /(((\w+)(?:-compatible)? (microchip|generator)))/g
    let objectTally = 0
    const floors = instructions.map((instruction, index) => {
        const objectsFound = instruction.match(objectsRegex)
        const contents = objectsFound ? objectsFound.map(object => {
            const [element, type] = object.replace('-compatible', '').split(' ')
            objectTally++
            if (type == 'generator') {
                return new Generator(element)
            } else {
                return new Microchip(element)
            }
        }) : []
        return new Floor(index, contents)
    })
    return [floors, objectTally]
}

const part1 = input => {
    const [floors, objectTally] = generateFloors(input.trim().split('\n'))
    const topFloor = floors[floors.length-1]

    floors.forEach(floor => {
        floor.contents.forEach(object => {
            console.log(object.toString())
            const safeFloors = findSafeFloors(object, floors)
            safeFloors.forEach(safeFloor => console.log(safeFloor.num))
        })
    })
}

// Part 2
// ======

const part2 = input => {
    return input.trim().split('\n')
}

module.exports = { part1, part2 }