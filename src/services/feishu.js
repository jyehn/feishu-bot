const config = require("../../config");
const lark = require("@larksuiteoapi/node-sdk");

const conf = {
  appId: config.feishu.appID,
  appSecret: config.feishu.appSecret,
  encryptKey: config.feishu.encryptKey, // 非必需，订阅事件时必需
  verificationToken: config.feishu.verification_token, // 非必需，订阅事件、消息卡片时必需
  appType: lark.AppType.SelfBuild,
  domain: lark.Domain.Feishu,
};
const client = new lark.Client(conf);

module.exports = {
  client,
  request(path, method, body) {
    const req = lark.api.newRequest(
      path,
      method,
      lark.api.AccessTokenType.Tenant,
      body,
    );
    return lark.api.sendRequest(conf, req);
  },
  post(path, body) {
    const req = lark.api.newRequest(
      path,
      "post",
      lark.api.AccessTokenType.Tenant,
      body,
    );
    return lark.api.sendRequest(conf, req);
  },
  get(path, body) {
    const req = lark.api.newRequest(
      path,
      "get",
      lark.api.AccessTokenType.Tenant,
      body,
    );
    return lark.api.sendRequest(conf, req);
  },
};
