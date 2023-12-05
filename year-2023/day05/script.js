'use strict'

// Setup
const reqs = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']
const preProcessing = input => {
    const inputArr = input.trim().split('\n\n')

    const seeds = inputArr.shift().split(': ').pop().split(' ').map(seed => parseInt(seed))
    const maps = inputArr.map(map =>  {
        let mapArr = map.split('\n')
        let [source, _, destination] = mapArr.shift().split(' ').shift().split('-')

        let ranges = mapArr.map(range => {
            const [destination, source, rangeLength] = range.split(' ').map(num => parseInt(num))
            return {destination, source, rangeLength}
        })
        return {source, destination, ranges}
    })
    return {seeds, maps}
}

const findDestinationNumber = (maps, sourceType, destinationType, sourceNumber) => {
    const map = maps.find(map => map.source == sourceType && map.destination == destinationType)
    if (!map) {
        throw new Error(`findDestinationNumber: Unable to find ${sourceType}-to-${destinationType} mapping`)
    }

    const range = map.ranges.find(range => range.source <= sourceNumber && sourceNumber < (range.source + range.rangeLength))

    if (range) {
        return range.destination + (sourceNumber - range.source)
    }

    return sourceNumber
}

const findSourceNumber = (maps, sourceType, destinationType, destinationNumber) => {
    const map = maps.find(map => map.source == sourceType && map.destination == destinationType)
    if (!map) {
        throw new Error(`findSourceNumber: Unable to find ${sourceType}-to-${destinationType} mapping`)
    }
    const range = map.ranges.find(range => range.source <= sourceNumber && sourceNumber < (range.source + range.rangeLength))

    if (range) {
        return range.source + (destinationNumber - range.destination)
    }

    return destinationNumber
}

const findSeedRanges = (seeds) => {
    const ranges = []
    for (let i = 0; i < seeds.length - 1; i += 2) {
        ranges.push({
            start: seeds[i],
            end: seeds[i] + seeds[i + 1] - 1
        })
    }
    return ranges.sort((rangeA, rangeB) => rangeA.start - rangeB.start)
}
const findLowestSeed = (seeds) => Math.min(...seeds.filter((seed, index) => !(index % 2)))

// Part 1
// ======

const part1 = input => {
    const {seeds, maps} = preProcessing(input)
    return seeds.map(seed => {
        const soil = findDestinationNumber(maps, 'seed', 'soil', seed)
        const fertilizer = findDestinationNumber(maps, 'soil', 'fertilizer', soil)
        const water = findDestinationNumber(maps, 'fertilizer', 'water', fertilizer)
        const light = findDestinationNumber(maps, 'water', 'light', water)
        const temperature = findDestinationNumber(maps, 'light', 'temperature', light)
        const humidity = findDestinationNumber(maps, 'temperature', 'humidity', temperature)
        const location = findDestinationNumber(maps, 'humidity', 'location', humidity)
        return {seed, location}
    }).sort((a, b) => a.location - b.location).shift().location

}

// Part 2 - this takes upwards of 20 minutes on the prod input. Do not recommend.
// ======

const part2 = input => {
    const {seeds, maps} = preProcessing(input)
    const seedRanges = findSeedRanges(seeds)
    let lowestLocation = NaN
    for (const range of seedRanges) {
        let lowestLocationForRange = NaN
        for (let seed = range.start; seed <= range.end; seed++) {
            const soil = findDestinationNumber(maps, 'seed', 'soil', seed)
            const fertilizer = findDestinationNumber(maps, 'soil', 'fertilizer', soil)
            const water = findDestinationNumber(maps, 'fertilizer', 'water', fertilizer)
            const light = findDestinationNumber(maps, 'water', 'light', water)
            const temperature = findDestinationNumber(maps, 'light', 'temperature', light)
            const humidity = findDestinationNumber(maps, 'temperature', 'humidity', temperature)
            const location = findDestinationNumber(maps, 'humidity', 'location', humidity)
            lowestLocationForRange = Math.min(lowestLocationForRange || location, location)            
        }
        lowestLocation = Math.min(lowestLocation || lowestLocationForRange, lowestLocationForRange )
    }
    return lowestLocation    
}

module.exports = { part1, part2, findDestinationNumber, preProcessing }
