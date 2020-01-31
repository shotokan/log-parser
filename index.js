/**
 * author: Ivan Sabido
 */
const fs = require('fs')

require('dotenv').config()
const short = require('short-uuid')
const es = require('event-stream')
const commandLineArgs = require('command-line-args')

const Parser = require('./log-parser')
const IPGeolocation = require('./ip-geolocation')
const UAParser = require('./useragent-parse')
const csvParser = require('./csv-parser')

const optionDefinitions = [
  { name: 'input', alias: 'i', type: String },
  { name: 'output', type: String, alias: 'o' }
]
const options = commandLineArgs(optionDefinitions)

const { output: outputPath, input } = options

const LOGFILENAME = process.env.LOG_FILE || input || 'gobankingrates.com.access.log'
const CSVFILENAME = process.env.CSV_FILE || outputPath || `access-log-${short.generate()}.csv`

const LOGPATH = `./logs/${LOGFILENAME}`
const CSVPATH = `./csv/${CSVFILENAME}`

const fileInputStream = fs.createReadStream(LOGPATH)

console.log(`LOG FILE: ${LOGPATH}...`)
console.log(`CSV FILE: ${CSVPATH}...`)

fileInputStream.pipe(es.split())
  .pipe(es.map(function (line, cb) {
    // converts from string to js object every line of the log file
    cb(null, Parser.parseLine(line))
  }))
  .pipe(es.mapSync(function (log) {
    // Avoid last line which is pased as null
    if (log) {
      const { ipAddress } = log
      const geolocation = IPGeolocation(ipAddress)
      const country = geolocation.getCountry()
      const state = geolocation.getState()
      // add country and state info to the log line
      return {
        ...log,
        country,
        state
      }
    }
  }))
  .pipe(es.mapSync(function (log) {
    // Avoid last line which is pased as null
    if (log) {
      const { userAgent } = log
      const ua = UAParser(userAgent)
      const browser = ua.getBrowser(userAgent)
      const deviceType = ua.getDevice(userAgent)
      // add browser and device info to the log line
      return {
        ...log,
        browser,
        deviceType
      }
    }
  }))
  .pipe(csvParser())
  .pipe(fs.createWriteStream(CSVPATH))
