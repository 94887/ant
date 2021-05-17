const rH = require('./../../utils/require-helper')

let AUTH_TOKEN = rH.constants.AUTH_TOKEN
let _ = rH._

module.exports = function () {
  return function setAuthToken(req, res, next) {
    req._token = null
    req._user = {}
    req._userACLs = {}

    for (let i = AUTH_TOKEN.SOURCES.length - 1; i >= 0; i--) {
      for (let j = 0; j < AUTH_TOKEN.ALIASES.length; j++) {
        let tokenPath = AUTH_TOKEN.SOURCES[i] + '.' + AUTH_TOKEN.ALIASES[j]
        let token = _.get(req, tokenPath)
        
        if (token) {
          console.log('token path', tokenPath)
          req._token = token
          return next()
        }
      }
    }

    return next() 
    }
}