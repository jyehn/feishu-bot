"use strict";

const path = require("path");
const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

module.exports = {
  port: "80",
  secret: "secret",
  publicDir: path.resolve(__dirname, "./public"),
  logPath: path.resolve(__dirname, "./logs/koa-template.log"),
  feishu: {
    appID: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    encryptKey: process.env.ENCRYPT_KEY,
    verification_token: process.env.VERIFICATION_TOKEN,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  mongoDB: {
    uri: process.env.URI,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
  },
  axios: {
    cookies: process.env.LC_COOKIES,
    csrfToken: process.env.LC_CSRF_TOKEN,
  },
};
