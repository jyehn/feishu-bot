# feishu-bot🤖

仍在开发中 ⛳️

使用到的：

- mongoDB
- koa
- koa-router
- node-schedule
- larksuiteapi

部署过程

### 一些配置项

1. 在飞书开发者后台，创建应用，然后在 凭证和基础信息 中复制 appId 和 app_secret
2. 在飞书开发的事件订阅中，打开 encry key（也可以不打开，建议不打开，后面关于加密解密的环节都不需要了）
3. 在飞书开发者后台的权限管理中，申请权限。
4. 注册一个 mongodb 官网的账号，创建一个 mongodb 项目，在数据库用户管理中添加一个用户和密码

将上诉配置项写在文件.env 中，如下

```
APP_ID=cli_xxx
APP_SECRET=xxx
ENCRYPT_KEY=xxxx
VERIFICATION_TOKEN=xxx
# mongodb
URI=mongodb+srv://<username>:<password>@xxx.mongodb.net/<leetcodeCodeBot>?retryWrites=true&w=majority
```

### 在飞书后台绑定事件订阅以及卡片变化订阅的 URL

事件订阅绑定到 http(s)://xxx.xxx.xxx/leetcode/event
卡片变化绑定到 http(s)://xxx.xxx.xxx/leetcode/card

### 修改 routes 目录下对应文件的逻辑

routes 下每一个文件代表一个根域名下的子路由，如果要再支持一个机器人，那么在 这个目录下新建一个路由文件，然后设置这个路径下的路由方法

### 运行

```bash
npm start
```
