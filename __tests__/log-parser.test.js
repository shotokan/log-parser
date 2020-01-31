/* eslint-env jest */
const LogParser = require('../log-parser')
const LINE = '207.114.153.6 - - [10/Jun/2015:18:14:56 +0000] "GET /favicon.ico HTTP/1.1" 200 0 "http://www.gobankingrates.com/banking/find-cds-now/" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36"'

describe('testing log-parser', () => {
  test('Should have parseLine function', done => {
    expect(LogParser).toBeDefined()
    expect(LogParser).toHaveProperty('parseLine')
    done()
  })
  test('Should return object with log values', done => {
    const log = LogParser.parseLine(LINE)
    expect(log).toHaveProperty('ipAddress')
    expect(log).toHaveProperty('datetime')
    expect(log).toHaveProperty('method')
    expect(log).toHaveProperty('url')
    expect(log).toHaveProperty('httpVersion')
    expect(log).toHaveProperty('statusCode')
    expect(log).toHaveProperty('bytesSent')
    expect(log).toHaveProperty('referer')
    expect(log).toHaveProperty('userAgent')
    expect(log.ipAddress).toBe('207.114.153.6')
    done()
  })
})
