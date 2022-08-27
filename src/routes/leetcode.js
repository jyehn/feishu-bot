const aesCiper = require("../utils/decrypt");
const Router = require("koa-router");

const { client } = require("../services/feishu");
const leetcode = require("../utils/leetcode");
const detect = require("../services/detectLanguage");
const lark = require("@larksuiteoapi/node-sdk");
const config = require("../../config");

const leetcodeBot = new Router();

leetcodeBot.get("/", async ctx => {
  ctx.body = `
      <p>hello !</p>
    `;
});

// //事件处理地址
// leetcodeBot.post("/event", async ctx => {
//   //如果是加密消息，则解密
//   const requestBody = ctx.request.body.encrypt
//     ? JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt))
//     : ctx.request.body;
//   // 飞书事件监听绑定
//   if (requestBody?.challenge) {
//     ctx.body = {
//       challenge: requestBody.challenge,
//       token: requestBody.token,
//       type: requestBody.type,
//     };
//   } else if (requestBody?.event) {
//     //按理来说除了chanllege和订阅事件就没有别的类型了？
//     // 避免冗余事件
//     const _event =
//       requestBody.header.event_id &&
//       (await ctx.db
//         .collection("Events")
//         .findOne({ event_id: requestBody.header.event_id }));
//     if (_event) {
//       ctx.res.statusCode = 200;
//       return;
//     } else {
//       ctx.db.collection("Events").insertOne({
//         event_id: requestBody.header.event_id,
//         // eslint-disable-next-line node/no-unsupported-features/es-syntax
//         ...requestBody.event.message,
//       });
//     }
//     //判断事件类型
//     const eventType = requestBody.header.event_type;
//     //接收消息
//     if (eventType === "im.message.receive_v1") {
//       // let data = await leetcode.getRecentAcSubmissions("xcjm");
//       console.log(requestBody);
//       // 消息内容
//       const messgeContent = JSON.parse(requestBody.event.message.content)?.text;
//       const messageMentions = requestBody.event.message?.mentions;
//       const userId = requestBody.event.sender.sender_id.user_id;
//       const chatId = requestBody?.event?.message?.chat_id;
//       const chatType = requestBody?.message?.chat_type;
//       console.log(chatType);
//       // let data = await leetcode.getquestionData(
//       //   "maximum-product-of-two-elements-in-an-array",
//       // );
//       // const codeSnippets = data.data.question.codeSnippets;

//       const botBeMentioned = messageMentions?.some(
//         mention => mention.name === "leetcode 测试机",
//       );
//       if (botBeMentioned || chatType !== "group") {
//         detect(messgeContent).then(
//           res => {
//             client.im.message.create({
//               params: {
//                 receive_id_type: chatType === "group" ? "chat_id" : "user_id",
//               },
//               data: {
//                 receive_id: chatType === "group" ? chatId : userId,
//                 content: res,
//                 msg_type: "text",
//               },
//             });
//           },
//           err => {
//             client.im.message.create({
//               params: {
//                 receive_id_type: chatType === "group" ? "chat_id" : "user_id",
//               },
//               data: {
//                 receive_id: chatType === "group" ? chatId : userId,
//                 content: "出错了",
//                 msg_type: "text",
//               },
//             });
//           },
//         );
//       }
//     }
//   }
//   ctx.res.statusCode = 200;
// });

// 卡片事件处理
leetcodeBot.post("/card", async ctx => {
  // 飞书事件监听绑定
  if (ctx.request.body.encrypt) {
    const requestBody = JSON.parse(aesCiper.decrypt(ctx.request.body.encrypt));
    ctx.body = {
      challenge: requestBody.challenge,
      token: requestBody.token,
      type: requestBody.type,
    };
  }

  if (ctx.request.body.challenge) {
    ctx.body = {
      challenge: ctx.request.body.challenge,
      token: ctx.request.body.token,
      type: ctx.request.body.type,
    };
  }
});

//事件处理
const eventDispatcher = new lark.EventDispatcher({
  encryptKey: config.feishu.encryptKey,
}).register({
  //接收消息
  "im.message.receive_v1": async data => {
    const open_chat_id = data.message.chat_id;
    const mentions = data.message?.mentions;
    if (mentions) {
      const botBeMentioned = mentions.some(
        mention => mention.name === "leetcode 测试机",
      );
      if (botBeMentioned) {
        const res = await client.im.message.create({
          params: {
            receive_id_type: "chat_id",
          },
          data: {
            receive_id: open_chat_id,
            content: JSON.stringify({ text: "hello world" }),
            msg_type: "text",
          },
        });
        return res;
      }
    }
    return {};
  },
});

//卡片处理
const cardDispatcher = new lark.CardActionHandler(
  {
    encryptKey: config.feishu.encryptKey,
    verificationToken: config.feishu.verification_token,
  },
  async data => {
    console.log(data);
    return {}; //返回值会用来更新卡片
  },
);

leetcodeBot.post("/event", lark.adaptKoaRouter(eventDispatcher));
leetcodeBot.post("/card", lark.adaptKoaRouter(cardDispatcher));

module.exports = leetcodeBot;
