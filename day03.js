'use strict'
//6:21 AM part 1 begin
//6:29 AM incorrect... FORGOT TO MODULO!!!
//6:31 AM correct answer 216

//6:34 AM part 2 begin
//6:39 AM part 2 correct answer
const TREE = '#';

const getTrees = (input, rowIncrememnt, colIncrement) => {
  let rowIndex = 0;
  let colIndex = 0;
  let treeCount = 0;
  const data = input.split('\n');
  while (rowIndex + rowIncrememnt < data.length) {
    rowIndex += rowIncrememnt;
    colIndex += colIncrement;

    const row = data[rowIndex];
    if (row.charAt(colIndex % row.length) === TREE) {
      treeCount++
    }
  } 

  return treeCount;
}

// Part 1
// ======

const part1 = input => {
  return getTrees(input, 1, 3);
}

// Part 2
// ======

const part2 = input => {
  return getTrees(input, 1, 1) * getTrees(input, 1, 3) * getTrees(input, 1, 5) * getTrees(input, 1, 7) * getTrees(input, 2, 1);
}

module.exports = { part1, part2 }
