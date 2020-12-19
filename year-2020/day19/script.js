'use strict'

// Setup

const preprocessing = input => {
    let [rules, messages] = input.split('\n\n')
    rules = rules.split('\n')
    const referencedRuleRegExp = /^(\d+): ([\d\| ]+)$/
    const concreteRuleRegExp = /^(\d+): "(\w)"$/
    let rulesMap = new Array(rules.length)
    
    rules.forEach(rule => {
        if (concreteRuleRegExp.test(rule)) {
            let [ruleId, letter] = concreteRuleRegExp.exec(rule).slice(1)
            rulesMap[ruleId] = letter
        } else if (referencedRuleRegExp.test(rule)) {
            let [ruleId, ruleInfo] = referencedRuleRegExp.exec(rule).slice(1)
            rulesMap[ruleId] = ruleInfo
        }
    })

    let filtered = true
    console.log(rulesMap)
    while (filtered) {
        filtered = false
        rulesMap.forEach((rule, index) => {
            if (/^[a-z]$/.test(rule)) {
                // find all rules which reference index and replace index with single letter rule
                rulesMap.forEach((refRule, refIndex) => {
                    if (refRule.indexOf(index) != -1) {
                        rulesMap[refIndex] = refRule.split(index).join(rule)
                        filtered = true
                    }
                })
            } else if (/^[a-z\ \|]+$/.test(rule)) {
                // if the rule contains only a mix of letters, spaces, and pipes
                // solidify the rule by removing spaces and surrounding in parenthesis
                rulesMap[index] = `(${rule.split(' ').join('')})`
                filtered = true
            } else if (/^[\(\)a-z\|]+$/.test(rule)) {
                // if the rule has been solidified, find all rules which reference it, 
                // and replace references with the rule
                rulesMap.forEach((refRule, refIndex) => {
                    if (refRule.indexOf(index) != -1) {
                        rulesMap[refIndex] = refRule.split(index).join(rule)
                        filtered = true
                    }
                });
            } else if (/^([\(\)a-z \|]+) \| ([\(\)a-z \|]+)$/.test(rule)) {
                console.log(index)
                let [sideA, sideB] = /^([\(\)a-z \|]+) \| ([\(\)a-z \|]+)$/.exec(rule).slice(1)
                console.log('   ',sideA, sideB)
                rulesMap[index] = `((${sideA.split(' ').join('')})|(${sideB.split(' ').join('')}))`
                filtered = true
            }
        })
    }
    
    // final pass?
    rulesMap.forEach((rule, index) => {
        rulesMap[index] = rule.split(' ').join('')
    })

    // // find stuff with only letters left
    // rulesMap.forEach((rule, index) => {
    //     if (/^[a-z\ \|]+$/.test(rule)) {
    //         console.log(rule)
    //     }
    // })

    console.log(rulesMap)
    process.exit(0)
    messages = messages.split('\n')

    return {
        rules,
        messages
    }
}

// Part 1
// ======

const part1 = input => {
    return preprocessing(input)
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
