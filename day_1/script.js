const fs = require('fs');

let input = fs.readFileSync('input.txt').toString()
    .split('\n')
    .map(str => parseInt(str));

// part 1, find 2 numbers which sum to 2020, return product
function partOne(data) {
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (data[i] + data[j] == 2020) {
                return (data[i] * data[j]);
            }
        }
    }
}

// part 2, find 3 numbers which sum to 2020, return product
function partTwo(data) {
    for (var i = 0; i < data.length - 2; i++) {
        for(var j = i + 1; j < data.length - 1; j++) {
            for (var k = j + 1; k < data.length; k++) {
                if (data[i] + data[j] + data[k] == 2020) {
                    return (data[i] * data[j] * data[k]);
                }
            }
        }
    }
}

console.log('1.1:', partOne(input));
console.log('1.2:', partTwo(input));
