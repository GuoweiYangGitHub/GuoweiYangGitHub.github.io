# npm 操作

## 清除npm缓存

```js
npm cache clean --force
```

## 全局命令查看

```js
npm list --depth=0 -global
```

## npm源

```js
// 临时使用淘宝源 npm i
npm i --registry https://registry.npm.taobao.org
// 配置使用淘宝镜像源
npm config set registry https://registry.npm.taobao.org
// 配置恢复官方镜像源
npm config set registry https://registry.npmjs.org
// node-sass使用淘宝镜像
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

## 发布npm包

```js
// 注册npm官网账号
npm adduser
// 登录npm账号
npm login
// 测试npm包
npm link
// 发布npm包（需要提高package.json里的版本号，并切换到npm官方源）
npm publish
```

