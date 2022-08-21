const aesCiper = require('../utils/decrypt')
const Router = require('koa-router')

const feishu = require('../services/feishu')
const leetcode = require('../utils/leetcode')

const leetcodeBot = new Router()

leetcodeBot.get('/', async (ctx) => {
  ctx.body = `
      <p>hello !</p>
    `
})

//事件处理地址
leetcodeBot.post('/event', async (ctx) => {
  //如果是加密消息，则解密
  const requestBody = ctx.request.body.encrypt ? JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt)) : ctx.request.body
  // 飞书事件监听绑定
  if (requestBody?.challenge) {
    ctx.body = {
      challenge: requestBody.challenge,
      token: requestBody.token,
      type: requestBody.type
    }
  } else if (requestBody?.event) { //按理来说除了chanllege和订阅事件就没有别的类型了？
    // 避免冗余事件
    const _event = requestBody.header.event_id && (await ctx.db.collection('Events').findOne({ event_id: requestBody.header.event_id }))
    if (_event) {
      return
    } else {
      const result = ctx.db.collection('Events').insertOne({
        event_id: requestBody.header.event_id,
        ...requestBody.event.message
      })
    }
    //判断事件类型
    const eventType = requestBody.header.event_type
    //接收消息
    if (eventType === 'im.message.receive_v1') {
      let data = await leetcode.getRecentAcSubmissions('xcjm')
      console.log(data);
      let messageBody = {
        user_id: "49fc914e",
        msg_type: "text",
        content: {
          text: JSON.stringify(data)
        },
      }
      feishu.request("/open-apis/message/v4/send", "POST", messageBody)
    }
  }
  ctx.res.statusCode = 200
})

// 卡片事件处理
leetcodeBot.post('/card', async (ctx) => {
  // 飞书事件监听绑定
  if (ctx.request.body.encrypt) {
    const requestBody = JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt))
    ctx.body = {
      challenge: requestBody.challenge,
      token: requestBody.token,
      type: requestBody.type
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

module.exports = leetcodeBot
