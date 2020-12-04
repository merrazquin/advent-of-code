'use strict'
// 6:40 AM start
// 6:59 AM parsing complete
// 7:12 AM part 1
// 7:34 AM part 2


// Setup
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


const validBirthYear = year => {
  year = parseInt(year);
  return 1920 <= year && year <= 2002;
}
const validIssueYear = year => {
  year = parseInt(year)
  return 2010 <= year && year <= 2020;
}
const validExpirationYear = year => {
  year = parseInt(year)
  return 2020 <= year && year <= 2030;
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
const validHairColor = color => {
  return /^#[0-9a-f]{6}$/.test(color);
}
const validEyeColor = color => {
  return /^amb|blu|brn|gry|grn|hzl|oth$/.test(color)
}
const validPassportId = id => {
  return /^\d{9}$/.test(id)
}

const optional = input => {
  return true
}


const VALIDATORS = {
  byr: validBirthYear,
  iyr: validIssueYear,
  eyr: validExpirationYear,
  hgt: validHeight,
  hcl: validHairColor,
  ecl: validEyeColor,
  pid: validPassportId,
  cid: optional
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
    if(KEYS[key] && !credential[key]) return false;
  }
  return true;
}

const isCredentialFullyValid = credential => {
  for (const key in VALIDATORS) {
    if(!VALIDATORS[key](credential[key])) return false;
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
