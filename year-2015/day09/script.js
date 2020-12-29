'use strict'

const { getAllPermutations } = require('../../utils')

// Setup

const preprocessing = input => {
    const distances = {}
    input.split('\n').forEach(row => {
        let [pointA, pointB, distance] = /([^ ]+) to ([^ ]+) = (\d+)/.exec(row).slice(1)
        distance = parseInt(distance)
        if (!distances[pointA]) {
            distances[pointA] = {}
        }
        if (!distances[pointB]) {
            distances[pointB] = {}
        }

        distances[pointA][pointB] = distance
        distances[pointB][pointA] = distance
    })

    return distances
}

const getAllRoutes = distances => {
    const cities = Object.keys(distances)
    const routes = [cities.join('_')]
    getAllPermutations(cities, 0, cities.length - 1, routes)
    return routes
}

// Part 1
// ======

const part1 = input => {
    const distances = preprocessing(input)
    return getAllRoutes(distances).map(route => {
        const citites = route.split('_')
        let currCity = citites.shift()
        let routeDistance = 0
        while(citites.length) {
            let nextCity = citites.shift()
            routeDistance += distances[currCity][nextCity]
            currCity = nextCity
        }
        return routeDistance
    }).reduce((prevMin, routeDistance) => Math.min(prevMin || routeDistance, routeDistance), undefined)
}

// Part 2
// ======

const part2 = input => {
    const distances = preprocessing(input)
    return getAllRoutes(distances).map(route => {
        const citites = route.split('_')
        let currCity = citites.shift()
        let routeDistance = 0
        while(citites.length) {
            let nextCity = citites.shift()
            routeDistance += distances[currCity][nextCity]
            currCity = nextCity
        }
        return routeDistance
    }).reduce((prevMax, routeDistance) => Math.max(prevMax || routeDistance, routeDistance), undefined)
}

module.exports = { part1, part2 }
