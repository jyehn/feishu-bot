'use strict'

const path = require('path')
const dotenv = require('dotenv')
const process = require('process')

dotenv.config()

module.exports = {
  port: '80',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  feishu: {
    appID: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    encryptKey: process.env.ENCRYPT_KEY,
    verification_token: process.env.VERIFICATION_TOKEN
  },
  mongoDB: {
    database: 'mall',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  }
}
