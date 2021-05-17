'use strict'

let loopback = require('loopback')
let boot = require('loopback-boot')
let path = require('path')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let app = module.exports = loopback()
let logger = require('./../utils/logger').createLogger('server')

let COOKIE_SECRET_KEY = 'TEST_SECRET_KEY' 

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.middleware('parse', cookieParser(COOKIE_SECRET_KEY))
app.middleware('parse', bodyParser.urlencoded({ extended: true }))
app.middleware('parse', bodyParser.json())


app.start = () => {
  return app.listen(() => {
    app.emit('started')
    let baseUrl = app.get('url').replace(/\/$/, '')
    logger.info('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath
      logger.info('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}


boot(app, __dirname, function(err) {
  if (err) throw err
  
  if (require.main === module) {
    app.start()
  }
})
