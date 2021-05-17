'use strict'

const app = require('./../../../../server/server')
const rH = require('./../../../../utils/require-helper')
const { _ , async, moment } = rH
const logger = rH.createLogger('AUTH /auth')
const validator = rH.validator()
const schema = require('./schema')
const { LOGIN, AUTH_TOKEN } = rH.constants
const { pg } = rH.pg

module.exports = function (req, res, next) {

  let log = logger.child({
    component: 'login/' + req.id
  })

  log.trace({
    params: {
      email: _.get(req, 'body.email'),
      passwordLength: _.get(req, 'body.password.length', -1)
    }
  })

  async.auto({
    validate_input: function (cb) {
      if (!validator.validate(schema, req.body)) {
        log.error({
          validate_inputs: validator.errors
        })

        return cb({ code: 'INSUFFICIENT_PARAMS', message: validator.errorsText() })
      }
      
      return cb(null)
    },
    user: ['validate_input', function (results, cb) {
      app.models.User
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then((user) => {
          return cb(null, user)
        })
        .catch((error) => {
          log.error({ error: error })
          return cb(error)
        })
    }],
    check_login_attempts: ['user', function (results, cb) {
      if (!results.user) {
        return cb({
          code: 'EMAIL_DOES_NOT_EXIST'
        })
      }

      pg('login_attempt')
        .where({
          user_id: results.user.id,
        })
        .andWhere(function() {
          this.where('created_at', '>', moment.utc().subtract(LOGIN.FAILED_ATTEMPT_RESET_TIME, 's').toString())
        })
        .orderBy('id', 'desc')
        .limit(LOGIN.MAX_FAILED_ATTEMPTS)
        .then((loginAttempts) => {
          let attempts = _.partition(loginAttempts, {
            successful: false
          })
          let unsuccessfulAttempts = attempts[0]
          
          if (unsuccessfulAttempts.length >= LOGIN.MAX_FAILED_ATTEMPTS) {
            return cb({
              code: 'LOGIN_LIMIT_REACHED'
            })
          }
          
          return cb(null, loginAttempts)
        })
        .catch((error) => {
          log.error({
            error: error
          })
          return cb({
            code: 'UNKNOWN_ERROR'
          })
        })
    }],
    email_verification: ['check_login_attempts', function (results, cb) {
      if (results.user.emailVerified) {
        return cb(null, results.user.emailVerified)
      }

      return cb({ code: 'EMAIL_NOT_VERIFIED' })
    }],
    match_password: ['email_verification', function(results, cb) {
      results.user.hasPassword(req.body.password, function (error, isMatch) {
        if (error) {
          log.error({ error: error })
          return cb({
            code: 'UNKNOWN_ERROR'
          })
        }

        pg('login_attempt')
          .insert({
            user_id: results.user.id,
            successful: isMatch,
          })
          .then((loginAttempt) => {
            log.info({
              loginAttempt
            })
          })
          .catch((error)=> {
            log.error({
              error: error
            })
          })
        
        if (!isMatch) {
          return cb({
            code: 'LOGIN_FAILED'
          })
        }

        return cb(null, isMatch)
      })
    }],
    generate_token: ['match_password', function (results, cb) {
      results.user.createAccessToken(AUTH_TOKEN.TTL, function(error, token) {
        if (error) {
          log.error({ error: error })
          return cb({
            code: 'DB_INSERT_ERROR'
          })
        }

        return cb(null, token)
      })
    }]
  }, function (error, results) {
    log.trace({ login_fn: results })

    if (error) {
      return res.status(403).send({ error: { ...error, message: res.__(`ERROR.${error.code}`) }})
    }

    res.cookie('access_token', results.generate_token.id, {
      httpOnly: true,
      maxAge: results.generate_token.ttl,
      signed: false,
    })
    res.send({
      success: true,
      code: 'LOGIN_SUCCESSFUL',
      data: {
        user: {
          userId: results.user.userId,
          firstName: results.user.firstName,
          lastName: results.user.lastName,
          email: results.user.email,
          phone: results.user.phone, 
          accessToken: results.generate_token.id
        }
      }
    })
  })
}