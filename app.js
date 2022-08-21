'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const config = require('./config')
const rootRoutes = require('./src/routes/routes')
const { loggerMiddleware } = require('./src/middlewares/logger')
const { errorHandler, responseHandler } = require('./src/middlewares/response')
const { corsHandler } = require('./src/middlewares/cors')

const app = new Koa()

// cors
app.use(cors(corsHandler))

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// Global Middlewares
app.use(bodyParser())

// Routes
app.use(rootRoutes.routes())

// Response
app.use(responseHandler)

module.exports = app
