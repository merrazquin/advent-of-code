'use strict'
// Setup
const getRange = (min, max, lower) => {
  if (max - min === 1) {
    return [lower ? min : max, -1]
  }
  const mid = min + Math.floor((max - min - 1) / 2)
  
  if (lower) {
    return [min, mid]
  } else {
    return [mid + 1, max]
  }
}

// Part 1
// ======

const part1 = input => {

  return input.split('\n')
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
    .sort((a, b) => b - a)
    .shift()

}

// Part 2
// ======

const part2 = input => {
  const seats = input.split('\n')
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
    .sort((a, b) => a - b)

    for(var i = 68; i < 965; i++) {
      if (seats.indexOf(i) == -1) return i;
    }
}

module.exports = { part1, part2 }

//12:00 AM - start
//12:18 AM - getRange method 
//12:21 AM - part 1
//12:23 AM - part 2
