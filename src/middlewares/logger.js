'use strict'

const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const config = require('../config')

// 这个是判断是否有logs目录，没有就新建，用来存放日志
const logsDir = path.parse(config.logPath).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}
// 配置log4.js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: { type: 'dateFile', filename: config.logPath, pattern: '-yyyy-MM-dd' }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('[Default]')
// logger中间件
const loggerMiddleware = async (ctx, next) => {
// 请求开始时间
  const start = new Date()
  await next()
  // 结束时间
  const ms = new Date() - start
    // 打印出请求相关参数
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
    (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}
module.exports = {
  logger,
  loggerMiddleware
}
