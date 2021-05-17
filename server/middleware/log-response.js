'use strict'

const logger = require('../../utils/logger').createLogger('RESPONSE')
const { cleanPath } = require('../../utils/helper')

module.exports = () => {
  return function(req, res, next) {
    let log = logger.child({ 
      component: `${cleanPath(req.path)}|${req.id}|` 
    })
    
    let start = process.hrtime()
    
    res.on('finish', () => {
      let diff = process.hrtime(start)
      let ms = diff[0] * 1e3 + diff[1] * 1e-6

      let resObj = {
        finished: res.headersSent,
        statusCode: res.statusCode,
        responseTime: ms
      }
      
      log.info({ resObj })
      logger.child({ component: `${cleanPath(req.path)}|${req.id}|TIME` }).info({ ms })
    })

    return next()
  }  
}
