'use strict'

const modifiedDragonCurve = a => {
    let b = a.split('').reverse().join('')
    b = b.replace(/0/g, 'x')
    b = b.replace(/1/g, '0')
    b = b.replace(/x/g, '1')
    return a + '0' + b
}

const getData = (input, length) => {
    let data = modifiedDragonCurve(input)
    while (data.length < length) {
        data = modifiedDragonCurve(data)
    }
    return data.substr(0, length)
}

const getChecksum = data => {
    let checksum = ''

    for (let i = 0; i < data.length; i += 2) {
        const pair = data.substr(i, 2)
        if (pair == '00' || pair == '11') {
            checksum += '1'
        } else {
            checksum += '0'
        }
    }
    if (checksum.length % 2 == 0) {
        return getChecksum(checksum)
    } else {
        return checksum
    }
}

// Part 1
// ======
const part1 = (input, length = 272) => {
    const filledDisk = getData(input, length)
    return getChecksum(filledDisk)
}

// Part 2
// ======

const part2 = (input, length = 35651584) => {
    return part1(input, length)
}

module.exports = { part1, part2, modifiedDragonCurve, getChecksum, getData }