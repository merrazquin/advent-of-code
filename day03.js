'use strict'
//6:21 AM
//6:29 AM incorrect answer: 8
//6:31 AM correct answer 216

const TREE = '#';
const rowIncrememnt = 1;
const colIncrement = 3;
let rowIndex = 0;
let colIndex = 0;
let treeCount = 0;

// Part 1
// ======

const part1 = input => {
  const data = input.split('\n');
  do {
    rowIndex += rowIncrememnt;
    colIndex += colIncrement;

    const row = data[rowIndex];
    if (row.charAt(colIndex % row.length) === TREE) {
      treeCount++
    }
  } while (rowIndex < data.length - 1)

  return treeCount;
}

// Part 2
// ======

const part2 = input => {
  return input
}

module.exports = { part1, part2 }
