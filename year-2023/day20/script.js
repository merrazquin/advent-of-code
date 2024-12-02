'use strict'

// Setup
const preProcessing = input => input.split('\n').map(module => {
    let output
    const [type, moduleName, ...destinations] = module.split(' -> ').map((val, index) => {
        if (index) {
            return val.split(', ')
        }
        if (val[0] === '%') {
            return ['flip', val.substring(1)]
        }
        if (val[0] === '&') {
            return ['conj', val.substring(1)]
        }
        return ['broadcaster', val]
    }).flat()
    
    return {type, moduleName, destinations}
}).map((module, _, modules) => {

    if (module.type === 'flip') {
        module.state= -1 // -1 for off, 1 for on
        module.recentPulse = -1
    }
    if (module.type === 'conj') {
        module.memory = -1 // -1 for low, 1 for high
        module.inputs = modules.filter(input => input.destinations.includes(module.moduleName))
    }
    return module
}).map((module, _, modules) => {
    module.destinations = module.destinations.map(destination => {
        const foundModule = modules.find(module => module.moduleName === destination)
        if (!foundModule) {
            return {moduleName: destination, type: 'output', destinations: []}
        }
        return foundModule
    })
    return module
})

const processPulse = async (module, pulse, pulseCounts = {low: 0, high: 0}) => {
    let pulseIsHigh = pulse === 1
    const pulsesToProcessNext = []
    switch(module.type) {
    case 'broadcaster':
        // send pulse
        module.destinations.forEach(destination => {
            pulseCounts[pulseIsHigh ? 'high' : 'low']++
            const destinationPulse = {destination, pulse}
            pulsesToProcessNext.push(destinationPulse)
            console.log(`${module.moduleName} -${destinationPulse.pulse === -1 ? 'low' : 'high'}-> ${destinationPulse.destination.moduleName}`)                    
        })
        break
    case 'flip':
        if (pulseIsHigh) {
            // high pulse is ignored
            return 0
        }
        module.state *= -1
        pulseIsHigh = module.state === 1
        module.destinations.forEach(destination => {
            if (destination.type === 'conj') {
                module.recentPulse = pulseIsHigh ? 1 : -1
            }
            pulseCounts[pulseIsHigh ? 'high' : 'low']++
            const destinationPulse = {destination, pulse: module.state}
            pulsesToProcessNext.push(destinationPulse)
            console.log(`${module.moduleName} -${destinationPulse.pulse === -1 ? 'low' : 'high'}-> ${destinationPulse.destination.moduleName}`)                    
        })
        break
    case 'conj':
        // inputs all highs
        console.log(`###${module.moduleName}###`)
        console.log(module.inputs.map(input => `${input.moduleName} ${input.recentPulse}`))
        const allHigh = module.inputs.every(input => input.recentPulse === 1)
        module.destinations.forEach(destination => {
            pulseCounts[allHigh ? 'low' : 'high']++
            const destinationPulse = {destination, pulse: allHigh ? -1 : 1}
            pulsesToProcessNext.push(destinationPulse)
            console.log(`${module.moduleName} -${destinationPulse.pulse === -1 ? 'low' : 'high'}-> ${destinationPulse.destination.moduleName}`)                    
        })
        break
    }
    
    // console.log('\n',pulsesToProcessNext.map(nextPulse => {
    //     return {
    //         nextPulse: nextPulse.pulse,
    //         dest: nextPulse.destination.moduleName
    //     }
    // }))
    for (const nextPulse of pulsesToProcessNext) {
        await processPulse(nextPulse.destination,  nextPulse.pulse, pulseCounts)
    }
}

// Part 1
// ======

const part1 = (input, pushCount = 1000) => {
    const modules = preProcessing(input)
    const broadcaster = modules.find(module => module.moduleName === 'broadcaster')
    const pulseCounts = {high: 0, low: 0} 
    while (pushCount--) {
        pulseCounts.low++
        console.log('button -low-> broadcaster')
        processPulse(broadcaster, -1, pulseCounts)
        console.log('\n\n')
    }
    console.log(pulseCounts)
    return pulseCounts.low * pulseCounts.high
}

// Part 2
// ======

const part2 = input => {
    return 0 //preProcessing(input)
}

module.exports = { part1, part2 }
