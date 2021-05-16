const server_ip = process.env.server_ip || ''
const db_username = process.env.db_username || ''
const db_password = process.env.db_password || ''
const db_name = process.env.db_name || ''
const schema_name = process.env.schema_name || ''

//ENTER YOUR SERVER DETAILS I CAN'T SHARE MY SERVER DETAILS

module.exports = {
  development: {
    client: 'pg',
    version: '9.5',
    connection: {
      host: `${server_ip}`,
      user: `${db_username}`,
      password: `${db_password}`,
      database: `${db_name}` 
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
    searchPath: [`${schema_name}`],
  }
};
