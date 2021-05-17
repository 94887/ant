'use strict'

const statusCode = require('../../utils/status-codes')
const logger = require('../../utils/logger').createLogger('error-handler')

module.exports = () => {
  return (err, req, res, next) => {
    logger.error({ err })

    if (err.code) {
      return next({
        ...err,
        status: statusCode[err.code] || 420,
        message: err.message || res.__(`ERROR.${err.code}`)
      })
    }

    if (err.message) {
      return next({
        ...err,
        status: 420,
        message: err.message
      })
    }

    return next({
      code: 'UNKNOWN_ERROR',
      status: statusCode['UNKNOWN_ERROR'],
      message: res.__('ERROR.UNKNOWN_ERROR')
    })
  }
}