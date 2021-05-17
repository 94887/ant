// Update with your config settings.
const config = require('./server/boot/config')

module.exports = {
  development: {
    client: 'pg',
    version: '9.5',
    connection: {
      host: config.postgresURL,
      user: config.postgresUser,
      password: config.postgresPassword,
      database: config.postgresDB
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
    searchPath: [config.postgresSchema],
  }
}
