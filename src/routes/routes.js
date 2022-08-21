const Router = require('koa-router')

const leetcode = require('./leetcode')


module.exports = new Router()
                .use('/leetcode', leetcode.routes(), leetcode.allowedMethods())
