/**
 * author: Ivan Sabido
 */
const fs = require('fs')

const Reader = require('@maxmind/geoip2-node').Reader
const isIp = require('is-ip')

const DB = process.env['GEOLITE2.DB'] || './ip-database/GeoLite2-City.mmdb'
const dbBuffer = fs.readFileSync(DB)
const reader = Reader.openBuffer(dbBuffer)

/**
 * Get Geolocation given an IP address and using maxmind database
 * @param {string} ipAddress
 */
function IPGeo (ipAddress) {
  this.location = null
  this.ipAddress = null
  if (isIp(ipAddress)) {
    try {
      this.ipAddress = ipAddress
      this.location = reader.city(ipAddress)
    } catch {
      console.log(`IP ${ipAddress} not found in GeoLite2 db`)
    }
  }
}

/**
 * Get Country given an IP address and maxmind database
 * @return {string} country
 */
IPGeo.prototype.getCountry = function () {
  if (!this.location) {
    return 'unknown'
  }

  const { country } = this.location
  if (!this.country && country && country.names) {
    const { names: countryNames } = country
    const { en: countryName } = countryNames
    this.country = countryName || 'unknown'
  }
  return this.country
}

/**
 * Get State given an IP Address
 * @return {string} state
 */
IPGeo.prototype.getState = function () {
  if (!this.location) {
    return 'unknown'
  }
  if (this.state) {
    return this.state
  }
  const [subdivision] = this.location.subdivisions
  if (subdivision && subdivision.names) {
    const { names } = subdivision
    const { en: stateName } = names
    this.state = stateName || 'unknown'
  }
  return this.state
}

module.exports = function IPGeolocation (ipAdress) {
  return new IPGeo(ipAdress)
}
