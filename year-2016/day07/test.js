const assert = require('assert')
const { part1, part2, findABBA, findABA, findHypernetSequences, stripHypernetSequences } = require('./script')

const IPs = 
`abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`

const IPs2 =
`aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb
ymjyffbcgimsalujegr[dnppglortkqlowskj]wxwtxtdaaopcyvp[xfsnsdrlopdotuqx]sprrvphwennltlddiw
ntfdficysbefpup[fvdhtaqmjosqoxosu]pwrbdoceiweqrfyrx[ftlwubetphczbxhx]jolpetpuszxjkxuupke[mbcbzrxeoqpibuyjsgg]cpdzzdzkwbucybc
xuabbxdwkutpsogcfea[tgetfqpgstsxrokcemk]cbftstsldgcqbxf[vwjejomptmifhdulc]ejeroshnazbwjjzofbe
`

// 136 too high
describe('Day 7: ', () => {
    describe ('findABBA', () => {
        it('should correclty find ABBA patterns', () => {
            assert.strictEqual(findABBA('abba'), true)
            assert.strictEqual(findABBA('ioxxoj'), true)
            assert.strictEqual(findABBA('ioxxo'), true)
            assert.strictEqual(findABBA('abcdefg'), false)
            assert.strictEqual(findABBA('aaaa'), false)
        })
    })
    
    describe ('findABA', () => {
        it('should correctly find ABA patterns', () => {
            assert.deepEqual(findABA('aba'), ['aba'])
            assert.deepEqual(findABA('xyx'), ['xyx'])
            assert.deepEqual(findABA('aaa'), [])
            assert.deepEqual(findABA('ioxxo'), [])
            assert.deepEqual(findABA('zazbz'), ['zaz', 'zbz'])
        })
    })

    describe ('findHypernetSequences', () => {
        it('should correctly find all hypernet sequences', () => {
            assert.deepEqual(findHypernetSequences('ioxxoj[asdfgh]zxcvbn'), ['[asdfgh]'])
            assert.deepEqual(findHypernetSequences('sjqrkysnnbgtkhwe[ibgrjvqztrkknsr]mnbkbbxvfhsihzkbsqz[hxxhvxonqzrgcant]kbkvnbphoymseakbxjf[yjkdvhsscxggtyyk]tofzfukarcsahrmvs'), [ '[ibgrjvqztrkknsr]', '[hxxhvxonqzrgcant]', '[yjkdvhsscxggtyyk]' ])
        })
    })

    describe ('stripHypernetSequences', () => {
        it('should correctly split a string and remove hypernet sequences', () => {
            assert.deepEqual(stripHypernetSequences('ioxxoj[asdfgh]zxcvbn'), ['ioxxoj', 'zxcvbn'])
            assert.deepEqual(stripHypernetSequences('sjqrkysnnbgtkhwe[ibgrjvqztrkknsr]mnbkbbxvfhsihzkbsqz[hxxhvxonqzrgcant]kbkvnbphoymseakbxjf[yjkdvhsscxggtyyk]tofzfukarcsahrmvs'), 
                [ 'sjqrkysnnbgtkhwe', 'mnbkbbxvfhsihzkbsqz', 'kbkvnbphoymseakbxjf', 'tofzfukarcsahrmvs' ])
        })
    })

    describe('Part One', () => {
        it('should find IPs which support TLS', () => {
            assert.strictEqual(part1(IPs), 2)
        })
    })


    describe('Part Two', () => {
        it('should find IPs which support SSL', () => {
            assert.strictEqual(part2(IPs2), 4)
        })
    })
})
