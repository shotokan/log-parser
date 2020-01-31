/**
 * author: Ivan Sabido
 */
const stringify = require('csv-stringify')

/**
 * Convert each log object to a csv string format
 */
function csv () {
  return stringify({
    header: true,
    columns: {
      ipAddress: 'ipAddress',
      datetime: 'datetime',
      method: 'method',
      url: 'url',
      httpVersion: 'httpVersion',
      statusCode: 'statusCode',
      bytesSent: 'bytessent',
      referer: 'referer',
      userAgent: 'userAgent',
      state: 'state',
      country: 'country',
      deviceType: 'device',
      browser: 'browser'
    }
  })
}

module.exports = csv
