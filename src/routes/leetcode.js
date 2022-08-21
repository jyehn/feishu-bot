const aesCiper = require('../utils/decrypt')
const Router = require('koa-router')

const feishu = require('../services/feishu')

const leetcode = new Router()

leetcode.get('/', async (ctx) => {
  ctx.body = `
      <p>hello !</p>
    `
})

leetcode.post('/event', async (ctx) => {
  // 飞书事件监听绑定
  if (ctx.request.body.encrypt) {
    const result = JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt))
    console.log(result)
    if (result?.challenge) {
      ctx.body = {
        challenge: result.challenge,
        token: result.token,
        type: result.type
      }
    } else if (result?.event) {
      console.log(result.event.message.content)
    }
    
  }
  
 
  
})

leetcode.post('/card', async (ctx) => {
  // 飞书事件监听绑定
  if (ctx.request.body.encrypt) {
    const result = JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt))
    ctx.body = {
      challenge: result.challenge,
      token: result.token,
      type: result.type
    }
  }

  if (ctx.request.body.challenge) {
    ctx.body = {
      challenge: ctx.request.body.challenge,
      token: ctx.request.body.token,
      type: ctx.request.body.type
    }
  }
})

module.exports = leetcode
