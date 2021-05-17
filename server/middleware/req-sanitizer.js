'use strict'

const { trimJSON } = require('../../utils/helper')

module.exports = () => {
  return function(req, res, next) {
    req.body = trimJSON(req.body)
    return next()
  }
}
