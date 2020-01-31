/* eslint-env jest */
const IPGeolocation = require('../ip-geolocation')
const IPAddress = '98.217.63.220'
const Country = 'United States'
const State = 'Massachusetts'

describe('testing ip-geolocation', () => {
  test('Should return geolocation data', done => {
    const geolocation = IPGeolocation(IPAddress)
    expect(geolocation).toBeDefined()
    expect(geolocation).toHaveProperty('ipAddress')
    expect(geolocation).toHaveProperty('location')
    done()
  })
  test('Should return country name', done => {
    const geolocation = IPGeolocation(IPAddress)
    const country = geolocation.getCountry()
    expect(country).toBe(Country)
    const country2 = geolocation.getCountry()
    expect(country2).toBe(Country)
    done()
  })
  test('Should return state name', done => {
    const geolocation = IPGeolocation(IPAddress)
    const state = geolocation.getState()
    expect(state).toBe(State)
    const state2 = geolocation.getState()
    expect(state2).toBe(State)
    done()
  })
  test('Should return state and country as unknown', done => {
    const geolocation = IPGeolocation('')
    const country = geolocation.getCountry()
    const state = geolocation.getState()
    expect(country).toBe('unknown')
    expect(state).toBe('unknown')
    done()
  })
})
