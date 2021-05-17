'use strict'

let pg = require('pg')

pg.types.setTypeParser(1700, parseFloat)

let knexfile = require('../knexfile') 
let knex = require('knex')(knexfile.development)


module.exports.pg = knex