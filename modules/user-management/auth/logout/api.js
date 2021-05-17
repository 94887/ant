'use strict'

const app = require('./../../../../server/server')
const rH = require('./../../../../utils/require-helper')
const { _ , async, moment } = rH
const logger = rH.createLogger('AUTH /auth')
const validator = rH.validator()
const schema = require('./schema')
const { LOGIN, AUTH_TOKEN, CACHE_PREFIX } = rH.constants
const { pg } = rH.pg

module.exports = function (req, res, next) {

  let log = logger.child({
    component: 'logout/' + req.id
  })

  async.auto({
    logout_user: function (cb) {
      app.models.User.logout(req._token, cb)
    },
    remove_access_tokens: ['logout_user', function (result, cb) {
      app.models.AccessToken.destroyById(req._token, cb)
    }],
    expire_user_acl: ['logout_user', function (result, cb) {
      app.models.simpleCache.deleteKey(CACHE_PREFIX.USER_ACLS + req._user.userId, cb)
    }]
  }, function (error, results) {
    log.trace({ logout_fn: results })

    if (error) {
      return res.status(401).send(error)
    }

    res.clearCookie('access_token')
    
    res.send({
      success: true,
      code: 'LOGOUT_SUCCESSFUL',
      data: {}
    })
  })
}