'use strict'

const logger = require('../../utils/logger').createLogger('REQUEST')
const { cleanPath } = require('../../utils/helper')

module.exports = () => {
  return function(req, res, next) {
    let log = logger.child({ 
      component: `${cleanPath(req.path)}|${req.id}|` 
    })
    
    let reqObj= {
      id: req.id,
      method: req.method,
      url: req.url,
      body: req.body,
      headers: req.headers,
      path: req.path,
      token: req._token,
      user: req._user,
    }
    
    log.info({ reqObj })
    
    return next()
  }
}
