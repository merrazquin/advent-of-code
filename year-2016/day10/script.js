'use strict'
let search
class Output {
    constructor(graph, id) {
        this.graph = graph
        this.id = id
        this.contents = []
    }
    receive(num) {
        this.contents.push(num)
    }
    getContents() {
        return this.contents
    }
}
class Bot {
    constructor (graph, id, rule) {
        this.graph = graph
        this.id = id
        this.rule = rule
    }

    receive(num) {
        if (this.num == undefined) {
            this.num = num
        } else {
            const [lo, hi] = [num, this.num].sort((a, b) => a-b)
            if ([lo, hi].join('|') == search) {
                this.graph.part1 = this.id
            }
            this.graph[this.rule['hi']].receive(hi)
            this.graph[this.rule['lo']].receive(lo)
            this.num = undefined
        }
    }
}

const parseInstructions = instructions => {
    const initValue = /value (\d+) goes to bot (\d+)/
    const initInstructions = instructions.map(instruction => instruction.match(initValue))
        .filter(instruction => instruction != null)
        .map(initInstruction => {
            const botNum = parseInt(initInstruction[2])
            const microchipValue = parseInt(initInstruction[1])
            return {botNum, microchipValue}
        })
    const botInstruction = /bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/
    const botInstructions = instructions.filter(instruction => !instruction.match(initValue)).map(
        instruction => {
            const [botNum, lowType, lowIndex, highType, highIndex] = instruction.match(botInstruction).slice(1).map(section => !isNaN(section) ? parseInt(section) : section)
            return {botNum, lowType, lowIndex, highType, highIndex}
        }
    )
    return [initInstructions, botInstructions]
}

// Part 1
// ======
// 102 is too high
const part1 = (input, searchStr = '17|61') => {
    search = searchStr
    const [initInstructions, botInstructions] = parseInstructions(input.trim().split('\n'))
    const graph = {}
    botInstructions.forEach(instruction => {
        graph['bot_' + instruction.botNum] = new Bot(graph, instruction.botNum, {
            'lo': instruction.lowType + '_' + instruction.lowIndex,
            'hi': instruction.highType + '_' + instruction.highIndex
        })

        if (instruction.lowType == 'output' && !graph['output_' + instruction.lowIndex]) {
            graph['output_' + instruction.lowIndex] = new Output(graph, instruction.lowIndex)
        }
        if (instruction.highType == 'output' && !graph['output_' + instruction.highIndex]) {
            graph['output_' + instruction.highIndex] = new Output(graph, instruction.highIndex)
        }
    })

    initInstructions.forEach(instruction => {
        graph['bot_' + instruction.botNum].receive(instruction.microchipValue)
    })

    return graph.part1
}

// Part 2
// ======

const part2 = input => {
    const [initInstructions, botInstructions] = parseInstructions(input.trim().split('\n'))
    const graph = {}
    botInstructions.forEach(instruction => {
        graph['bot_' + instruction.botNum] = new Bot(graph, instruction.botNum, {
            'lo': instruction.lowType + '_' + instruction.lowIndex,
            'hi': instruction.highType + '_' + instruction.highIndex
        })

        if (instruction.lowType == 'output' && !graph['output_' + instruction.lowIndex]) {
            graph['output_' + instruction.lowIndex] = new Output(graph, instruction.lowIndex)
        }
        if (instruction.highType == 'output' && !graph['output_' + instruction.highIndex]) {
            graph['output_' + instruction.highIndex] = new Output(graph, instruction.highIndex)
        }
    })

    initInstructions.forEach(instruction => {
        graph['bot_' + instruction.botNum].receive(instruction.microchipValue)
    })
    var acc = 1
    for (let i = 0; i < 3; i++) {
        acc *= graph['output_' + i].getContents()[0]
    }
    return acc
}

module.exports = { part1, part2 }