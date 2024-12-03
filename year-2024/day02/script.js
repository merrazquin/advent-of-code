'use strict'

// Setup
const preProcessing = input => input.trim().split('\n').map(report => report.split(' ').map(l => parseInt(l)))

// Part 1
// ======

const isReportSafe = (report, checkDampener = false) => {
    let joinedReport = report.join()
    let ascSortedReport = report.slice().sort((a, b) => a-b).join()
    let descSortedReport = report.slice().sort((a, b) => b-a).join()

    let safe = false
    if (joinedReport === ascSortedReport || joinedReport === descSortedReport) {
        safe = report.every((level, index) => {
            if (index < report.length - 1) {
                const diff = Math.abs(level - report[index + 1]) 
                return diff >= 1 && diff <= 3
            }
            return true
        })
    } else {
        safe = false
    }
    
    if (!checkDampener) {
        return safe
    }

    for (let i = 0; i < report.length; i++) {
        let newReport = report.slice()
        newReport.splice(i, 1)
        if (isReportSafe(newReport)) {
            return true
        }
    }
    return false
}
const part1 = input => {
    return preProcessing(input).filter(report => isReportSafe(report, false)).length
}

// Part 2
// ======

const part2 = input => {
    return preProcessing(input).filter(report => isReportSafe(report, true)).length
}

module.exports = { part1, part2 }
