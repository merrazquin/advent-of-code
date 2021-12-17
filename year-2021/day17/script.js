'use strict'

// Setup
const SHORT = 0
const HIT = 1
const TOO_FAR = -1

class Probe {
    constructor(xVelocity, yVelocity) {
        this.reset(xVelocity, yVelocity)
    }

    reset(xVelocity, yVelocity){
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
        this.x = 0
        this.y = 0
        this.maxY = this.y
    }

    currentPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    step() {
        this.x += this.xVelocity
        this.y += this.yVelocity
        if (this.xVelocity > 0) {
            this.xVelocity--
        } else if(this.xVelocity < 0) {
            this.xVelocity++
        }
        this.yVelocity--
        this.maxY = Math.max(this.y, this.maxY)
    }
}

class TargetArea {
    constructor(minX, maxX, minY, maxY) {
        this.points = {}
        this.maxX = maxX
        this.minY = minY
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                this.points[`${x}_${y}`] = true
            }
        }
    }
    checkProbe(probe) {
        const location = probe.currentPosition()
        if (this.points[`${probe.x}_${probe.y}`]) {
            return HIT
        }

        return (location.x > this.maxX || location.y < this.minY) ? TOO_FAR : SHORT
    }
}


const testVelocity = (probe, targetArea) => {
    while (targetArea.checkProbe(probe) !== TOO_FAR) {
        if (targetArea.checkProbe(probe) === HIT) {
            return HIT
        }
        probe.step()
    }
    return targetArea.checkProbe(probe)
}

// Part 1
// ======

const part1 = input => {
    let [xRange, yRange] = input.trim().split(': ')[1].split(', ').map(coords => coords.split('=')[1].split('..').map(num => parseInt(num)))
    const targetArea = new TargetArea(...xRange, ...yRange)
    let maxY = 0
    let xVelocity = 1, yVelocity = 1
    
    while (xVelocity < xRange[0]) {
        const probe = new Probe(xVelocity, yVelocity)
        while(yVelocity < xRange[0]) {
            if (testVelocity(probe, targetArea) === HIT) {
                maxY = Math.max(maxY, probe.maxY)
            }
            yVelocity++
            probe.reset(xVelocity, yVelocity)
        }
        xVelocity++
        yVelocity = 0
    }

    return maxY
}

// Part 2
// ======

const part2 = input => {
    let [xRange, yRange] = input.trim().split(': ')[1].split(', ').map(coords => coords.split('=')[1].split('..').map(num => parseInt(num)))
    const targetArea = new TargetArea(...xRange, ...yRange)
    let maxY = 0
    let xVelocity = 1, yVelocity = yRange[0]
    let velocities = 0
    while (xVelocity < xRange[0] * 2) {
        const probe = new Probe(xVelocity, yVelocity)
        while(yVelocity < xRange[0] * 2) {
            if (testVelocity(probe, targetArea) === HIT) {
                velocities++
                maxY = Math.max(maxY, probe.maxY)
            }
            yVelocity++
            probe.reset(xVelocity, yVelocity)
        }
        xVelocity++
        yVelocity = yRange[1] * 2
    }
    return velocities
}

module.exports = { part1, part2 }
