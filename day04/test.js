const assert = require('assert')
const { part1, part2 } = require('./script')

const passports = 
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946`

const validHeightInInches = 
`hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:62in
`
const invalidHeightInInches = 
`hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:15in
`
describe('Day 4: Passport Processing', () => {
    describe('Part One', () => {
        it('it should return the total number of valid passports', () => {
            assert.strictEqual(part1(passports), 3)
        })
    })

    describe ('Part Two', () => {
        it('it should return the total number of stringently-validated passports', () => {
            assert.strictEqual(part2(passports), 2)
            assert.strictEqual(part2(validHeightInInches), 1)
            assert.strictEqual(part2(invalidHeightInInches), 0)
        })
    })
})
