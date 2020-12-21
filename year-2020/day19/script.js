'use strict'

// Setup
const referencesOverridenRule = (rulesMap, index, overrides) => {
    // find out if a rule refrences 8 or 11 anywhere in its downstream
    // if it does, skip it

    const currentRule = rulesMap[index]
    const overrideIndices = Object.keys(overrides).map(index => parseInt(index))
    const regex = new RegExp(`\\b${overrideIndices.join('|')}\\b`)
    if (/^[a-z]$/.test(currentRule)) {
        return false
    }
    if (overrideIndices.includes(index) || regex.test(currentRule)) {
        return true
    }
    const indices = [...currentRule.matchAll(/\b\d+\b/g)].map(match => match[0])
    let isReferenced = false
    indices.forEach(subIndex => {
        if (subIndex != index) {
            isReferenced = isReferenced || referencesOverridenRule(rulesMap, subIndex, overrides)
        }
    })
    return isReferenced
}
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
const preprocessing = (input, ruleIndex, overrides = {}) => {
    let [rules, messages] = input.split('\n\n')
    rules = rules.split('\n')
    const concreteRuleRegExp = /^(\d+): "(\w)"$/
    const referencedRuleRegExp = /^(\d+): ([\d| ]+)$/
    let rulesMap = new Array(rules.length)
    rules.forEach(rule => {
        let ruleId, ruleInfo
        if (concreteRuleRegExp.test(rule)) {
            [ruleId, ruleInfo] = concreteRuleRegExp.exec(rule).slice(1)
            rulesMap[ruleId] = ruleInfo
        } else if (referencedRuleRegExp.test(rule)) {
            [ruleId, ruleInfo] = referencedRuleRegExp.exec(rule).slice(1)
            rulesMap[ruleId] = ruleInfo
        }

        // if (overrides[ruleId]) {
        //     rulesMap[ruleId] = overrides[ruleId]
        // }
    })

    let rule
    if (Object.keys(overrides).length) {
        // attempt to process non-overriden rules
        rulesMap = rulesMap.map((rule, index) => {
            if (referencesOverridenRule(rulesMap, index, overrides)) {
                console.log(index, 'CIRCULAR')
                return rule
            }
            if (index === 0 || index == 8 || index == 11) return rule
            return getConcreteRule(rulesMap, index)
        })
        // for
        rulesMap.forEach((rule, index) => console.log(index.toString().padStart(2, '0'), rule))
        console.log(' ')
        console.log(getConcreteRule(rulesMap, 0))
        process.exit()
    }  else {
        rule = getConcreteRule(rulesMap, ruleIndex)
        messages = messages.split('\n')
    }

    return {
        rule,
        messages
    }
}
// Part 1
// ======

const part1 = input => {
    let { rule, messages } = preprocessing(input, 0)

    console.log('rule', rule)
    rule = new RegExp(`^${rule}$`)
    return messages.filter(message => rule.test(message)).length
}

// Part 2
// ======

const part2 = input => {
    let { rule, messages } = preprocessing(input, 0, {8: '42 | 42 8', 11: '42 31 | 42 11 31'})

    console.log('rule', rule)
    console.log(' ')
    rule = new RegExp(`^${rule}$`)
    return messages.filter(message => rule.test(message)).length
}

module.exports = { part1, part2 }
