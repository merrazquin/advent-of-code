const assert = require('assert')
const { part1, part2, hex2bin, getBinaryRepresentation, getLiteralValue, parseSegment } = require('./script')


describe('Day 16: Packet Decoder', () => {
    describe('Part One', () => {
        it('should convert single hex digit to a 4 bit binary sequence', () => {
            assert.strictEqual(hex2bin('D', 4), '1101')
        })
        it('should correctly represent a hex string as binary', () => {
            assert.strictEqual(getBinaryRepresentation('D2FE28'), '110100101111111000101000')
        })
        it('should get the literal value of a segment', () => {
            assert.strictEqual(getLiteralValue('101111111000101000').value, 2021)
        })
        it('should parse a segment', () => {
            const parsedSegment = parseSegment('110100101111111000101000')
            assert.strictEqual(parsedSegment.version, 6)
            assert.strictEqual(parsedSegment.typeID, 4)
            assert.strictEqual(parsedSegment.value, 2021)
            assert.strictEqual(parsedSegment.remainder, '000')
            
            const subPacketLenTest = parseSegment('00111000000000000110111101000101001010010001001000000000')
            assert.strictEqual(subPacketLenTest.subPacketLength, 27)
            const subPacketCountTest = parseSegment('11101110000000001101010000001100100000100011000001100000')
            assert.strictEqual(subPacketCountTest.subPacketCount, 3)
        })
        it('should get the sum of all versions in a transmission', () => {
            assert.strictEqual(part1('8A004A801A8002F478'), 16)
            assert.strictEqual(part1('620080001611562C8802118E34'), 12)
            assert.strictEqual(part1('C0015000016115A2E0802F182340'), 23)
            assert.strictEqual(part1('A0016C880162017C3686B18A3D4780'), 31)
        })
    })

    describe('Part Two', () => {
        it('should return the correct value of an expresion', () => {
            assert.strictEqual(part2('C200B40A82'), 3)
            assert.strictEqual(part2('04005AC33890'), 54)
            assert.strictEqual(part2('880086C3E88112'), 7)
            assert.strictEqual(part2('CE00C43D881120'), 9)
            assert.strictEqual(part2('D8005AC2A8F0'), 1)
            assert.strictEqual(part2('F600BC2D8F'), 0)
            assert.strictEqual(part2('9C005AC2F8F0'), 0)
            assert.strictEqual(part2('9C0141080250320F1802104A08'), 1)
        })
    })
})

