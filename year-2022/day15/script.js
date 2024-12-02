'use strict'

// Setup
const preprocessing = (input) => {
    const beacons = {}
    const sensors = {}

    let minX = 0
    let maxX = 0
    let minY = 0
    let maxY = 0

    input.trim().split('\n').forEach(sensorData => {
        const [sensor, beaconCandidate] = sensorData.substr('Sensor at '.length).split(': closest beacon is at ').map(coordInfo => {
            const [x, y] = coordInfo.split(', ').map(val => parseInt(val.split('=')[1]))
            minX = Math.min(minX, x)
            maxX = Math.max(maxX, x)
            minY = Math.min(minY, y)
            maxY = Math.max(maxY, y)
            return { x, y }
        })
        let beacon = beacons[`${beaconCandidate.x}_${beaconCandidate.y}`]
        if (!beacon) {
            beacon = {
                ...beaconCandidate,
                sensors: []
            }
            beacons[`${beaconCandidate.x}_${beaconCandidate.y}`] = beacon
        }
        const distance = manhattan(sensor, beacon)

        sensor.closestBeacon = beacon
        sensor.distance = distance

        beacon.sensors.push(sensor)

        sensors[`${sensor.x}_${sensor.y}`] = sensor
    })

    return {
        beacons,
        sensors
    }
}

const manhattan = (pos0, pos1) => {
    const d1 = Math.abs(pos1.x - pos0.x)
    const d2 = Math.abs(pos1.y - pos0.y)
    return d1 + d2
}

const addDeadZone = (sensor, beaconDeadZone, beacons, check) => {
    const distance = sensor.distance

    const yDelta = sensor.y - check
    if (Math.abs(yDelta) <= sensor.distance) {
        const width = ((distance - Math.abs(yDelta)) * 2) + 1
        const startX = sensor.x - Math.floor(width / 2)
        for (let x = startX; x < startX + width; x++) {
            if (!beacons[`${x}_${check}`]) {
                beaconDeadZone.add(x)
            }
        }
    }
}

const addDeadZoneDiamond = (sensor, beaconDeadZone, beacons, check) => {
    const distance = sensor.distance
    // diamond shaped deadZone is created such that 
    //  the widest row is at s.y with width of (distance * 2) + 1, s.x being the center (start at s.x - distance, end at s.y + distance)
    // while width > 0, put rows at s.y-n & s.y+n with width of ((distance-n) * 2) + 1
    // if any of these spaces is a beacon, ignore it
    let x = sensor.x - distance
    while (x <= sensor.x + distance) {
        let key = `${x}_${sensor.y}`
        if (!beacons[key]) {
            beaconDeadZone.add(key)
        }
        x++
    }

    let n
    for (n = 1; n <= distance; n++) {
        let x = sensor.x - (distance - n)
        while (x <= sensor.x + (distance - n)) {
            let key = `${x}_${sensor.y - n}`
            if (!beacons[key]) {
                beaconDeadZone.add(key)
            }
            key = `${x}_${sensor.y + n}`
            if (!beacons[key]) {
                beaconDeadZone.add(key)
            }
            x++
        }
    }
}

// Part 1
// ======

const part1 = (input, check = 2000000) => {
    const { beacons, sensors } = preprocessing(input)
    const beaconDeadZone = new Set()

    for (const [, sensor] of Object.entries(sensors)) {
        addDeadZone(sensor, beaconDeadZone, beacons, check)
    }

    return beaconDeadZone.size
}

// Part 2
// ======

const part2 = (input, max = 4000000) => {
    const data = preprocessing(input)
    const beacon = {x: 0, y: 0}
    console.log(data)
    return (beacon.x * 4000000) + beacon.y
}

module.exports = { part1, part2 }
