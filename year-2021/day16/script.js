'use strict'

const { chunk, sumAll, multiplyAll } = require('../../utils')
class Packet {
    constructor(version = '', typeID = '') {
        this.version = version
        this.typeID = typeID
        this.subPackets = []
        this.value = 0
        this.subPacketCount = 0
        this.subPacketLength = 0
    }
    getValue() {
        let subPacketVals = []
        if (this.subPackets.length) {
            subPacketVals = this.subPackets.map(packet => packet.getValue())
        }
        switch(this.typeID) {
        case 0:
            return sumAll(subPacketVals)
        case 1:
            return multiplyAll(subPacketVals)
        case 2:
            return Math.min(... subPacketVals)
        case 3:
            return Math.max(... subPacketVals)
        case 4:
            return this.value
        case 5:
            return this.subPackets[0].getValue() > this.subPackets[1].getValue() ? 1 : 0
        case 6:
            return this.subPackets[0].getValue() < this.subPackets[1].getValue() ? 1 : 0
        case 7:
            return this.subPackets[0].getValue() == this.subPackets[1].getValue() ? 1 : 0
        }
    }
    toString() {
        return JSON.stringify((({ version, typeID, value, subPacketCount, subPacketLength }) => ({ version, typeID, value, subPacketCount, subPacketLength }))(this))
    }
}
// Setup
const hex2bin = (hex, len = 8) => (parseInt(hex, 16).toString(2)).padStart(len, '0')
const getBinaryRepresentation = hex => hex.split('').map(hexChar => hex2bin(hexChar, 4)).join('')
const getLiteralValue = segment => {
    const chunks = chunk(segment, 5)
    const cutoff = chunks.findIndex(chunk => chunk[0] === '0')
    const valChunks = chunks.splice(0, cutoff + 1).map(chunk => chunk.slice(1))
    const remainder = chunks.join('')
    return {
        value: parseInt(valChunks.join(''), 2),
        remainder
    }
}

const parseSegment = (segment, depth = 0, debug = false) => {
    const parsed = new Packet(parseInt(segment.slice(0, 3), 2), parseInt(segment.slice(3, 6), 2))
    let literalVal
    switch(parsed.typeID) {
    case 4:
        literalVal = getLiteralValue(segment.slice(6))
        parsed.value = literalVal.value
        parsed.remainder = literalVal.remainder
        if (debug) console.log(' '.repeat(depth), depth, parsed.toString())
        break
    default:
        parsed.lengthType = parseInt(segment.slice(6, 7))
        if(parsed.lengthType === 0) {
            parsed.subPacketLength = parseInt(segment.slice(7, 22), 2)
            if (debug) console.log(' '.repeat(depth), depth, parsed.toString())
            let subPacket = parseSegment(segment.slice(22, 22 + parsed.subPacketLength), depth + 1)
            parsed.subPackets.push(subPacket)
            while (subPacket.remainder) {
                subPacket = parseSegment(subPacket.remainder, depth + 1)
                parsed.subPackets.push(subPacket)
            }
            parsed.remainder = segment.slice(22 + parsed.subPacketLength)
        } else {
            parsed.subPacketCount = parseInt(segment.slice(7, 18), 2)
            if (debug) console.log(' '.repeat(depth), depth, parsed.toString())
            if (parsed.subPacketCount) {
                let subPacket = parseSegment(segment.slice(18), depth + 1)
                parsed.subPackets.push(subPacket)
                while (parsed.subPackets.length < parsed.subPacketCount) {
                    subPacket = parseSegment(subPacket.remainder, depth + 1)
                    parsed.subPackets.push(subPacket)
                }
                parsed.remainder = parsed.subPackets[parsed.subPacketCount - 1].remainder
            }
        }
    }

    return parsed
}

// Part 1
// ======
const sum = values => values.reduce((a, b) => a + b, 0)

const totalProp = (prop) => (ob) => ob[prop] + sum (ob.subPackets.map (totalProp (prop) ))


const part1 = input => {
    const bin = getBinaryRepresentation(input)
    const packets = parseSegment(bin)
    return totalProp('version')(packets)
}

// Part 2
// ======

const part2 = input => {
    const bin = getBinaryRepresentation(input)
    const packets = parseSegment(bin)
    return packets.getValue()
}

module.exports = { part1, part2, getLiteralValue, hex2bin, getBinaryRepresentation, parseSegment }
