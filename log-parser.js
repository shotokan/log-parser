/**
 * Parse a string that represents a line in the access.log file and returns an object with ipAddress,
 * datetime, method, url, httpVersion, statusCode, bytesSent, refferer, userAgent properties
 * @param {string} line represents a line from an access.log file
 * @return {object}
 */
function parseLine (line) {
  // pause the readstream
  const regex = /(?<ipAddress>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(?<datetime>\d{2}\/[a-z]{3}\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4})\] (("(?<method>GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE|CONNECT) )(?<url>.+)(?<httpVersion>http\/1\.[1|0])") (?<statusCode>\d{3}) (?<bytesSent>\d+) (["](?<referer>(-)|(.+))["]) (["](?<userAgent>.+)["])/gi
  const match = regex.exec(line)
  if (match) {
    return match.groups
  }
  return null
}

module.exports = {
  parseLine
}
