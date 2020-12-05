'use strict'
// Setup

const getRange = (min, max, lower) => {
  const mid = min + Math.floor((max - min - 1) / 2)

  if (lower) {
    return [min, mid]
  } else {
    return [mid + 1, max]
  }
}

const getSeatIDs = boardingPasses => {
  return boardingPasses.split('\n')
    .map(boardingPass => {
      let rowRangeMin = 0
      let rowRangeMax = 127
      let colRangeMin = 0
      let colRangeMax = 7

      boardingPass.split('').forEach((instruction, index) => {
        if (index < 7) {
          [rowRangeMin, rowRangeMax] = getRange(rowRangeMin, rowRangeMax, instruction === 'F')
        }
        else {
          [colRangeMin, colRangeMax] = getRange(colRangeMin, colRangeMax, instruction === 'L')
        }
      })

      return 8 * rowRangeMin + colRangeMin
    })
}

// Part 1
// ======

const part1 = input => {

  return getSeatIDs(input)
    .sort((a, b) => b - a)
    .shift()

}

// Part 2
// ======

const part2 = input => {
  const seats = getSeatIDs(input)
    .sort((a, b) => a - b)

  const minSeat = seats[0]
  const maxSeat = seats[seats.length - 1]
  for (var seat = minSeat; seat < maxSeat; seat++) {
    if (!seats.includes(seat)) return seat
  }
}

const part3 = input => {
  return parseInt(input).toString(2)
    .padStart(10, '0')
    .replace(/^((?:0|1){7})((?:0|1){3})$/, (match, row, col) => {
      return row.replace(/1/g, 'B').replace(/0/g, 'F') + col.replace(/1/g, 'R').replace(/0/g, 'L')
    })
}

module.exports = { part1, part2, part3 }

//12:00 AM - start
//12:18 AM - getRange method 
//12:21 AM - part 1
//12:23 AM - part 2
