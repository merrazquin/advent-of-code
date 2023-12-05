const assert = require('assert')
const { part1, part2, preProcessing, findDestinationNumber, findSourceNumber, findSeedRanges, seedExists } = require('./script')

const data = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

describe('Day 5: If You Give A Seed A Fertilizer', () => {
    describe('findDestinationNumber', () => {
        it('Should find the destination number of a source number', () => {
            const {maps} = preProcessing(data)
            assert.strictEqual(findDestinationNumber(maps, 'seed', 'soil', 79), 81)
            assert.strictEqual(findDestinationNumber(maps, 'soil', 'fertilizer', 81), 81)
            assert.strictEqual(findDestinationNumber(maps, 'fertilizer', 'water', 81), 81)
            assert.strictEqual(findDestinationNumber(maps, 'water', 'light', 81), 74)
            assert.strictEqual(findDestinationNumber(maps, 'light', 'temperature', 74), 78)
            assert.strictEqual(findDestinationNumber(maps, 'temperature', 'humidity', 78), 78)
            assert.strictEqual(findDestinationNumber(maps, 'humidity', 'location', 78), 82)
        })
    })

    describe('findSourceNumber', () => {
        it('Should find the source number of a destination number', () => {
            const {maps} = preProcessing(data)
            assert.strictEqual(findSourceNumber(maps, 'humidity', 'location', 82), 78)
            assert.strictEqual(findSourceNumber(maps, 'temperature', 'humidity', 78), 78)
            assert.strictEqual(findSourceNumber(maps, 'light', 'temperature', 78), 74)
            assert.strictEqual(findSourceNumber(maps, 'water', 'light', 74), 81)
            assert.strictEqual(findSourceNumber(maps, 'fertilizer', 'water', 81), 81)
            assert.strictEqual(findSourceNumber(maps, 'soil', 'fertilizer', 81), 81)
            assert.strictEqual(findSourceNumber(maps, 'seed', 'soil', 81), 79)
        })
    })

    describe('seedExists', () => {
        const {seeds} = preProcessing(data)
        const seedRanges = findSeedRanges(seeds)

        it('Should return true if seed is within one of the ranges provided', () => {
            assert.equal(seedExists(seedRanges, 82), true)
        })

        it('Should return false if seed is outside of ranges provided', () => {
            assert.equal(seedExists(seedRanges, 1), false)
        })
    })

    describe('Part One', () => {
        it('Should find the lowest location number that corresponds to any of the initial seed numbers', () => {
            assert.strictEqual(part1(data), 35)
        })
    })

    describe('Part Two', () => {
        it('Should find the lowest location number that corresponds to any of the initial seed numbers (when given as ranges)', () => {
            assert.strictEqual(part2(data), 46)
        })
    })
})

