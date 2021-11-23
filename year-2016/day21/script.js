'use strict'

 
// Part 1
// ======
const processInstruction = (input, instruction, opposite = false) => {
    let params
    if ((params = /swap position (\d+) with position (\d+)/g.exec(instruction)) != null) {
        const [posX, posY] = params.slice(1).map(pos => parseInt(pos))
        const inputArr = input.split('')
        inputArr[posY] = input[posX]
        inputArr[posX] = input[posY]
        return inputArr.join('')
    }

    if ((params = /swap letter (\w) with letter (\w)/g.exec(instruction)) != null) {
        const [letterX, letterY] = params.slice(1)
        input = input.replace(letterX, '|')
        input = input.replace(letterY, letterX)
        input = input.replace('|', letterY)
        return input
    }

    if ((params = /rotate (left|right) (\d+) step/g.exec(instruction)) != null) {
        let [direction, steps] = params.slice(1)
        steps = parseInt(steps)
        const inputArr = input.split('')
        if (opposite) {
            direction = direction == 'left' ? 'right' : 'left'
        }
        if (direction == 'left') {
            while (steps--) {
                inputArr.push(inputArr.shift())
            }
        } else {
            while (steps--) {
                inputArr.unshift(inputArr.pop())
            }
        }
        return inputArr.join('')
    }

    if ((params = /rotate based on position of letter (\w)/g.exec(instruction)) != null) {
        const [letter] = params.slice(1)
        const index = input.indexOf(letter)
        let steps = 0
        // thanks to /u/bhrgunatha https://www.reddit.com/r/adventofcode/comments/5ji29h/comment/dbgkbpv/?utm_source=share&utm_medium=web2x&context=3
        if (opposite) {
            switch (index) {
            case 0:
            case 1:
                steps = input.length - 1
                break
            case 2:
                steps = 2
                break
            case 3: 
                steps = input.length - 2
                break
            case 4:
                steps = 1
                break
            case 5:
                steps = input.length - 3
                break
            case 7:
                steps = input.length - 4
                break
            }
        } else {
            steps = 1 + index + (index >= 4 ? 1 : 0)
        }

        const inputArr = input.split('')
        while (steps--) {
            inputArr.unshift(inputArr.pop())
        }
        return inputArr.join('')
    }

    if ((params = /reverse positions (\d+) through (\d+)/g.exec(instruction)) != null) {
        const [posX, posY] = params.slice(1).map(pos => parseInt(pos))
        const left = posX > 0 ? input.substring(0, posX) : ''
        const mid = input.substring(posX, posY + 1).split('').reverse().join('')
        const right = posY < input.length - 1 ? input.substr(posY + 1) : ''

        return left + mid + right
    }

    if ((params = /move position (\d+) to position (\d+)/g.exec(instruction)) != null) {
        let [posX, posY] = params.slice(1).map(pos => parseInt(pos))
        if (opposite) {
            [posY, posX] = [posX, posY]
        }
        let inputArr = input.split('')
        const letterX = inputArr.splice(posX, 1)[0]
        inputArr.splice(posY, 0, letterX)
        return inputArr.join('')
    }
}
const part1 = (instructions, input = 'abcdefgh') => {
    return instructions.trim().split('\n').reduce((password, instruction) => {
        return processInstruction(password, instruction)
    }, input)
}

// Part 2
// ======

const part2 = (instructions, input = 'fbgdceah') => {
    return instructions.trim().split('\n').reverse().reduce((password, instruction) => {
        return processInstruction(password, instruction, true)
    }, input)
}

module.exports = { part1, part2 }

// not cdehbfga