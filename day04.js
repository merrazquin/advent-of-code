'use strict'
// 6:40 AM start
// 6:59 AM parsing complete
// 7:12 AM part 1
// 7:34 AM part 2


// Setup
const validYear = (year, min, max) => {
  year = parseInt(year)
  return min <= year && year <= max;
}

const validHeight = height => {
  let parsed = /^(\d+)(cm|in)$/.exec(height);
  
  if (parsed) {
    let [raw, h, u] = parsed;
    h = parseInt(h);
    if (u == 'in') {
      return 59 <= h && h <= 76;
    } else {
      return 150 <= h && h <= 193;
    }
  }
  return false;
}

const validPattern = (val, pattern) => {
  return pattern.test(val);
}

const optional = input => true

const KEYS = {
  byr: true,
  iyr: true,
  eyr: true,
  hgt: true,
  hcl: true,
  ecl: true,
  pid: true,
  cid: false
}

const VALIDATORS = {
  byr: {
    validator: validYear,
    args: [1920, 2002]
  },
  iyr: {
    validator: validYear,
    args: [2010, 2020]
  },
  eyr: {
    validator: validYear,
    args: [2020, 2030]
  },
  hgt:{
    validator: validHeight,
    args: []
  },
  hcl: {
    validator: validPattern,
    args: [/^#[0-9a-f]{6}$/]
  },
  ecl: {
    validator: validPattern,
    args: [/^amb|blu|brn|gry|grn|hzl|oth$/]
  },
  pid: {
    validator: validPattern,
    args: [/^\d{9}$/]
  },
  cid: {
    validator: optional,
    args: []
  }
};

const processCredential = credential => {
  let keys = [];
  return credential.split(/ |\n/)
    .reduce((prev, curr) => {
      let [key, val] = curr.split(':');
      prev[key] = val;
      keys.push(key);
      return prev;
    }, {});
}

const isCredentialValid = credential => {
  for (const key in KEYS) {
    if(KEYS[key] && !credential[key]){
      return false;
    }
  }
  return true;
}

const isCredentialFullyValid = credential => {
  for (const key in VALIDATORS) {
    let {validator, args} = VALIDATORS[key]
    if(!validator(credential[key], ...args)) {
      return false;
    }
  }
  return true;
}

// Part 1
// ======

const part1 = input => {
  const data = input.split('\n\n')
    .map(processCredential);
  return data.filter(isCredentialValid).length;
}

// Part 2
// ======

const part2 = input => {
  const data = input.split('\n\n')
    .map(processCredential);
  return data.filter(isCredentialFullyValid).length;
}

module.exports = { part1, part2 }
