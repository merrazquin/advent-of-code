'use strict'
//6:21 AM part 1 begin
//6:29 AM incorrect... FORGOT TO MODULO!!!
//6:31 AM correct answer 216

//6:34 AM part 2 begin
//6:39 AM part 2 correct answer

/** BENCHMARKING */
// advent Running part 1 +0ms
// advent Got output in 0.136191ms +0ms
// advent Running part 2 +0ms
// advent Got output in 0.280581ms +1ms

const TREE = '#';

const getTreeCount = (input, rowIncrememnt, colIncrement) => {
  const data = input.split('\n');
  const height = data.length;

  let rowIndex = 0;
  let colIndex = 0;
  let treeCount = 0;

  while (rowIndex < height) {
    const row = data[rowIndex];
    if (row.charAt(colIndex % row.length) === TREE) {
      treeCount++;
    }
    rowIndex += rowIncrememnt;
    colIndex += colIncrement;
  }

  return treeCount;
}

// Part 1
// ======

const part1 = input => {
  return getTreeCount(input, 1, 3);
}

// Part 2
// ======

const part2 = input => {
  return getTreeCount(input, 1, 1) * getTreeCount(input, 1, 3) * getTreeCount(input, 1, 5) * getTreeCount(input, 1, 7) * getTreeCount(input, 2, 1);
}

module.exports = { part1, part2 }
