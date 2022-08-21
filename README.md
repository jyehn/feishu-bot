# feishu-bot

部署：

### 一些配置项
1. 在飞书开发者后台，创建应用，然后在 凭证和基础信息 中复制appId和app_secret
2. 在飞书开发的事件订阅中，打开encry key（也可以不打开，建议不打开，后面关于加密解密的环节都不需要了）
3. 在飞书开发者后台的权限管理中，申请权限。
4. 注册一个mongodb官网的账号，创建一个mongodb项目，在数据库用户管理中添加一个用户和密码

将上诉配置项写在文件.env中，如下
```
APP_ID=cli_xxx
APP_SECRET=xxx
ENCRYPT_KEY=xxxx
VERIFICATION_TOKEN=xxx
# mongodb
URI=mongodb+srv://<username>:<password>@xxx.mongodb.net/<leetcodeCodeBot>?retryWrites=true&w=majority
```

### 在飞书后台绑定事件订阅以及卡片变化订阅的URL

### 
