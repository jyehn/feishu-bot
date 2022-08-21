const lark = require("@larksuiteoapi/allcore");
const config = require('../../config')

// 企业自建应用的配置
// appID、appSecret: "开发者后台" -> "凭证与基础信息" -> 应用凭证（App ID、App Secret）
// verificationToken、encryptKey："开发者后台" -> "事件订阅" -> 事件订阅（Verification Token、Encrypt Key）。
// helpDeskID、helpDeskToken, 服务台 token：https://open.feishu.cn/document/ukTMukTMukTM/ugDOyYjL4gjM24CO4IjN
const appSettings = lark.newInternalAppSettings({
    appID: config.feishu.appID,
    appSecret: config.feishu.appSecret,
    encryptKey: config.feishu.encryptKey, // 非必需，订阅事件时必需
    verificationToken: config.feishu.verification_token, // 非必需，订阅事件、消息卡片时必需
})

// 当前访问的是飞书，使用默认本地内存存储、默认控制台日志输出（Error级别），更多可选配置，请看：README.zh.md -> 如何构建整体配置（Config）。
const conf = lark.newConfig(lark.Domain.FeiShu, appSettings, {
    loggerLevel: lark.LoggerLevel.ERROR,
})

// 发送消息的内容
const body = {
    user_id: "49fc914e",
    msg_type: "text",
    content: {
        text: "test send message!!!!!",
    },
}

module.exports = {
    request(path, method, body) {
        const req = lark.api.newRequest(path, method, lark.api.AccessTokenType.Tenant, body)
        return lark.api.sendRequest(conf, req)
    },
    sendTestMessage() {
        console.log('send test message')
        const req = lark.api.newRequest("/open-apis/message/v4/send", "POST", lark.api.AccessTokenType.Tenant, body)
        // 发送请求
        lark.api.sendRequest(conf, req).then(r => {
            // 打印请求的RequestID
            console.log(r.getRequestID())
            // 打印请求的响应状态吗
            console.log(r.getHTTPStatusCode())
            console.log(r) // r = response.body
        }).catch(e => {
            // 请求的error处理
            console.log(e)
        })
    }
}
