/* eslint-env jest */
const UA = require('../useragent-parse')

const rawUA = 'Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F69 Safari/600.1.4'
const UNKNOWNUA = 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'
const DEVICE = 'tablet'
const BROWSER = 'Mobile Safari'

describe('testing user-agent parser', () => {
  test('Should return geolocation data', done => {
    const userAgent = UA(rawUA)
    expect(userAgent).toBeDefined()
    expect(userAgent).toHaveProperty('device')
    expect(userAgent).toHaveProperty('browser')
    done()
  })
  test('Should return device type', done => {
    const userAgent = UA(rawUA)
    const device = userAgent.getDevice()
    expect(device).toBe(DEVICE)
    const device2 = userAgent.getDevice()
    expect(device2).toBe(DEVICE)
    done()
  })
  test('Should return browser', done => {
    const userAgent = UA(rawUA)
    const browser = userAgent.getBrowser()
    expect(browser).toBe(BROWSER)
    const browser2 = userAgent.getBrowser()
    expect(browser2).toBe(BROWSER)
    done()
  })
  test('Should return unknown value for browser', done => {
    const userAgent = UA(UNKNOWNUA)
    const browser = userAgent.getBrowser()
    expect(browser).toBe('unknown')
    const device = userAgent.getDevice()
    expect(device).toBe('desktop')
    done()
  })
})
