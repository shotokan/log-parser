/**
 * author: Ivan Sabido
 */

const parser = require('ua-parser-js')

/**
 * Parse user-agent header to get the device type and browser
 * @param {string} ipAddress
 */
function UserAgentParser (rawUA) {
  this.userAgent = null
  this.browser = null
  this.device = null
  if (rawUA) {
    this.userAgent = parser(rawUA)
  }
}

/**
 * Find device type
 * @param {string} userAgent http user-agent string
 * @return {string} device
 */
UserAgentParser.prototype.getDevice = function () {
  if (this.device) {
    return this.device
  }
  this.device = 'unknown'
  if (this.userAgent) {
    const { device } = this.userAgent
    if (device) {
      this.device = device.type || 'desktop'
    }
  }
  return this.device
}

/**
 * Find the browser
 * @return {string} browser
 */
UserAgentParser.prototype.getBrowser = function () {
  if (this.browser) {
    return this.browser
  }
  this.browser = 'unknown'
  if (this.userAgent) {
    const { browser } = this.userAgent
    if (browser && browser.name) {
      this.browser = browser.name
    }
  }
  return this.browser
}

module.exports = function UAParser (userAgent) {
  return new UserAgentParser(userAgent)
}
