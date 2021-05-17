'use strict'

const {
  EMAIL_ADDRESS
} = require('./../../../../utils/constant')

module.exports = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string', 
      minLength: 5,
      maxLength: 100,
      pattern: EMAIL_ADDRESS
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 72
    }
  }
}