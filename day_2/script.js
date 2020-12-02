const fs = require('fs');
let passwordRegEx = new RegExp(/([0-9]+)-([0-9]+) ([a-z]): (.*)/);
let firstRuleValid = 0;
let secondRuleValid = 0;

fs.readFileSync('input.txt').toString()
    .split('\n')
    .forEach(str => {
        let [full, min, max, letter, password] = passwordRegEx.exec(str);
        min = parseInt(min);
        max = parseInt(max);

        const passwordArray = password.split('');
        const instancesOfLetter = passwordArray.filter(char => char === letter).length;

        if (instancesOfLetter >= min && instancesOfLetter <= max) {
            firstRuleValid++;
        }

        const pos1valid = passwordArray[min - 1] === letter;
        const pos2valid = passwordArray[max - 1] === letter;

        if (pos1valid != pos2valid) {
            secondRuleValid++;
        }
    });

console.log('2.1:', firstRuleValid);
console.log('2.2:', secondRuleValid);