'use strict'

// Setup
const getConcreteRule = (rulesMap, index) => {
    let currentRule = rulesMap[index]

    if (/^[a-z]$/.test(currentRule) || ! /\b\d+\b/.test(currentRule)) {
        return currentRule
    }
    const indices = [...currentRule.matchAll(/\b\d+\b/g)].map(match => match[0])
    indices.forEach(subIndex => {
        const subConcreteRule = getConcreteRule(rulesMap, subIndex)
        const ruleRegex = new RegExp(`\\b${subIndex}\\b`)
        if (subConcreteRule.length == 1) {
            currentRule = currentRule.split(ruleRegex).join(subConcreteRule)
        } else {
            currentRule = currentRule.split(ruleRegex).join(`(${subConcreteRule})`)
        }
    })
    return currentRule.split(' ').join('')
}
const preprocessing2 = (input, ruleIndex) => {
    let [rules, messages] = input.split('\n\n')
    rules = rules.split('\n')
    const concreteRuleRegExp = /^(\d+): "(\w)"$/
    const referencedRuleRegExp = /^(\d+): ([\d\| ]+)$/
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

    const rule = getConcreteRule(rulesMap, ruleIndex)
    messages = messages.split('\n')

    return {
        rule,
        messages
    }
}
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
    // first pass
    rules.forEach(rule => {
        if (concreteRuleRegExp.test(rule)) {
            let [ruleId, letter] = concreteRuleRegExp.exec(rule).slice(1)
            rulesMap.forEach((refRule, refIndex) => {
                const letterRegex = new RegExp(`\\b${ruleId}\\b`)
                if (letterRegex.test(refRule)) {
                    rulesMap[refIndex] = refRule.split(letterRegex).join(letter)
                }
            })
        }
    })


    let numbersFound = rulesMap.some(rule => /\d/.test(rule))
    let hash = rulesMap.toString()
    while (numbersFound) {
        numbersFound = false
        rulesMap.forEach((rule, index) => {
            /*if (/^[a-z]$/.test(rule)) {
                // find all rules which reference index and replace index with single letter rule
                rulesMap.forEach((refRule, refIndex) => {
                    const letterRegex = new RegExp(`\\b${index}\\b`)
                    if (letterRegex.test(refRule)) {
                        rulesMap[refIndex] = refRule.split(letterRegex).join(rule)
                    }
                })
            } else*/ if (/^[a-z\ \|]+$/.test(rule)) {
                // if the rule contains only a mix of letters, spaces, and pipes
                // solidify the rule by removing spaces and surrounding in parenthesis
                rulesMap[index] = `(${rule.split(' ').join('')})`
            } else if (/^[\(\)a-z\|]+$/.test(rule)) {
                // if the rule has been solidified, find all rules which reference it, 
                // and replace references with the rule
                rulesMap.forEach((refRule, refIndex) => {
                    rulesMap.forEach((refRule, refIndex) => {
                        const chunkRegex = new RegExp(`\\b${index}\\b`)
                        if (chunkRegex.test(refRule)) {
                            rulesMap[refIndex] = refRule.split(chunkRegex).join(rule)
                        }
                    })
                })
            } else if (/^([\(\)a-z \|]+) \| ([\(\)a-z \|]+)$/.test(rule)) {
                // if the rule is only a combination of solidified rules i.e. `(solidified rule a) | (solidified rule b)`
                // strip spaces and surround each side in parenthesis
                let [sideA, sideB] = /^([\(\)a-z \|]+) \| ([\(\)a-z \|]+)$/.exec(rule).slice(1)
                rulesMap[index] = `((${sideA.split(' ').join('')})|(${sideB.split(' ').join('')}))`
            }
        })

        // one last check for numbers
        console.log(rulesMap)
        numbersFound = rulesMap.some(rule => /\d/.test(rule))

        if (hash == rulesMap.toString()) {
            console.log('no change')
            break
        }
        hash = rulesMap.toString()
    }
    console.log(rulesMap)
    process.exit()

    // final pass?
    rulesMap.forEach((rule, index) => {
        rulesMap[index] = rule.split(' ').join('')
    })
    messages = messages.split('\n')

    return {
        rulesMap,
        messages
    }
}

// Part 1
// ======

const part1 = input => {
    let { rule, messages } = preprocessing2(input, 0)

    console.log('rule', rule)
    rule = new RegExp(`^${rule}$`)
    return messages.filter(message => rule.test(message)).length
}

// Part 2
// ======

const part2 = input => {
    return preprocessing(input)
}

module.exports = { part1, part2 }
