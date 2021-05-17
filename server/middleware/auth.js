'use strict'

const rH = require('./../../utils/require-helper')

const _ = rH._
const async = rH.async
const logger = rH.createLogger('AUTH_MIDDLEWARE')
const { OPEN_ROUTES, PATH_TO_FEATURE } = rH.constants
const { getAccessToken, getUser, getUserACLs } = require('../../utils/auth-middleware-helper')
const validateToken = require('./../../modules/user-management/auth/check-authentication/validate-token')

function isRouteOpen(reqPath) {
  return _.includes(OPEN_ROUTES, reqPath) || _.startsWith(reqPath, '/explorer')
}

module.exports = () => {
  return (req, res, next) => {

    let log = logger.child({
      component: 'auth_middleware/' + req.id
    })
    if (isRouteOpen(req.path)) {
      return next()
    }

    async.auto({
      access_token_exists: function (cb) {
        if (!req._token) {
          return cb({ code: 'TOKEN_NOT_FOUND' })
        }

        return cb(null, req._token)
      },
      get_access_token: ['access_token_exists', function (results, cb) {
        getAccessToken(req._token, function (error, tokenObj) {
          if (error) {
            log.error({ access_token_error: error })
            return cb(error)
          }

          if (_.includes('/api/users/reset-password', req.path)) {
            if (!validateToken(tokenObj.created, tokenObj.ttl * 1000)) {
              return cb({ code: 'INVALID_TOKEN' })
            }
          } else {
            if (!validateToken(tokenObj.created, tokenObj.ttl)) {
              return cb({ code: 'INVALID_TOKEN' })
            }
          }

          return cb(null, tokenObj)
        })
      }],
      user: ['get_access_token', function (results, cb) {
        getUser(results.get_access_token.userId, cb)
      }],
      user_acls: ['get_access_token', function (results, cb) {
        getUserACLs(results.get_access_token.userId, cb)
      }]
    }, function (error, results) {
      if (error) {
        log.error({ auth_middleware_error: error })
        return next(error)
      }

      req.accessToken = results.user

      req._user = results.user
      req._userACLs = results.user_acls

      return next()
    })
  }
}