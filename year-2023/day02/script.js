'use strict'
const { sumAll } = require('../../utils')

// Setup
const preProcessing = (input) => input.trim().split('\n').map(ln => {
    let [id, sets] = ln.split(': ')
    id = parseInt(id.split(' ').pop())
    sets = sets.split('; ').map(set => {
        set = set.split(', ')
        return set.map(cubes => {
            const [count, color] = cubes.split(' ')
            return {count, color}
        })
    }).map(cubes => {
        const obj = {}
        return cubes.reduce((obj, cube) => {
            obj[cube.color] = parseInt(cube.count)
            return obj
        }, obj)
    })
    return {id, sets}
})

const gamePasses = (sets, redMax = 12, greenMax = 13, blueMax = 14) => {
    return sets.every(set => { return (!set.red || set.red <= redMax)
        && (!set.blue || set.blue <= blueMax)
        && (!set.green || set.green <= greenMax)})
}

const gameRequirements = (sets) => {
    const reqs = {red: 0, blue: 0, green: 0}
    return sets.reduce((reqs, set) => {
        reqs.red = Math.max(set.red || 0, reqs.red)
        reqs.blue = Math.max(set.blue || 0, reqs.blue)
        reqs.green = Math.max(set.green || 0, reqs.green)
        return reqs
    }, reqs)
}

const getPower = (reqs) => reqs.red * reqs.blue * reqs.green

// Part 1
// ======

const part1 = input => {
    return sumAll(preProcessing(input).filter(game => gamePasses(game.sets)).map(game => game.id))
}

// Part 2
// ======

const part2 = input => {
    return sumAll(preProcessing(input).map(game => getPower(gameRequirements(game.sets))))
}

module.exports = { part1, part2 }
