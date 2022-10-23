# 多终端适配

## 跨终端解决方案

- flutter
- Taro
- React Native
- H5 Hybrid
- 桌面端对应的方案就是Electron

## 跨终端web适配方式

- 可以写多套代码，输入网址时判断pc或mobile，返回对应的内容。
- 响应式设计 bootstrap

## 跨终端通信

### jsBridge

- [jsBridge](https://juejin.cn/post/6936814903021797389)

- Web端和Native可以类比于Client/Server模式，Web端调用原生接口时就如同Client向Server端发送一个请求类似，JSB在此充当类似于HTTP协议的角色，实现JSBridge主要是两点：
  - 将native 端的原生接口封装为JavaScript接口
  - 将 JavaScript 接口 封装为 原生接口

### 开源的 jsBridge

- DSBridge，主要通过注入API的形式。`DSBridge for Android`、`DSBridge for IOS`
- JSBridge， 主要通过拦截 URL Schema 的形式， `JsBridge`
