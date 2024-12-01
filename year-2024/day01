const axios = require('axios');
const sessionID = '<REDACTED>';

const url = 'https://adventofcode.com/2024/day/1/input';
const cookie = `session=${sessionID}`;

const demo = `3   4
4   3
2   5
1   3
3   9
3   3`;

p1(demo);

axios.get(url, {
  headers: {
    'Cookie': cookie,  // Add the cookie in the headers
  }
}).then(response => p1(response.data))
.catch((error) => {
  console.error('Error:', error);
});

function p1(rawData) {
  const left = [];
  const right = [];
  const data = rawData.trim().split('\n').map(line => line.split(/\s+/));
  data.forEach ( lr => {
    const [l, r] = lr;
    left.push(parseInt(l));
    right.push(parseInt(r));
  });
  left.sort((a, b) => a-b);
  right.sort((a, b) => a-b);
  
  let sum = left.reduce((acc, curr, index) => acc + Math.abs(right[index] - curr), 0);
  console.log('p1', sum);
  p2(left, right);
}

function p2(left, right) {
  let sum = left.reduce((acc, curr) => acc + right.filter(r => r === curr).length * curr, 0);
  console.log('p2', sum);
}
