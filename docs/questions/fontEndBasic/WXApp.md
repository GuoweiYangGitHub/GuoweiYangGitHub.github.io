# 小程序面试题

## 小程序登录流程

![登录流程](https://clouds.guowei.link/appLogin.png)

1. 调用 `wx.login()` 获取 临时登录凭证 code，有效期为 5分钟；（临时登录凭证 code 只能使用一次）

2. 将临时 code 传到我们的后端，后端调用 `auth.code2Session` 接口，换取用户唯一标识 `OpenID` 和 会话密钥 `session_key`；（ openid 是用户唯一标识; session_key 能保证当前用户进行会话操作的有效性）

3. 注意：获取 session_key 出于安全性的考虑，要在后端调用。如果我们在前端通过 request 调用此接口，就不可避免的需要将我们小程序的appid 、secret 和服务端下发的 session_key 暴露在外部，会给我们的业务安全带来极大的风险。 **session_key 拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效**。反之如果用户一直在使用小程序，则用户登录态一直保持有效。**具体时效逻辑由微信维护，对开发者透明**。开发者**需要调用 wx.checkSession 接口检测当前用户登录态是否有效**。

4. 后端自定义新的密钥并关联返回的 session_key 和 openid，将新的密钥返给前端，前端将其存储在 storage 中。（会话密钥 session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥，所以要定义新的密钥）。 之所以存在storage中，是因为小程序没有 cookie，相应的后端 set-cookie 在小程序中不起作用。

5. 前端发送请求的时候，带着密钥，后端根据密钥识别用户身份，返回数据。

## 打开一个小程序到页面展示，经历了什么

1. 启动小程序
2. 运行环境准备
3. 下载代码包
4. 缓存代码包
5. 代码注入
6. 逻辑层与渲染层双线程并行
7. 渲染页面

![](https://clouds.guowei.link/1640830848109444.png)

## 微信小程序原理

- 数据驱动的架构模式，UI和数据是分离的，所有页面的更新都需要通过数据的更改来实现。

## 小程序的 v-model和vue的有什么不一样

- 小程序设置this.data不会被同步到视图，必须要调用

```js
this.setData({})
```

## 小程序的优化

- 控制图片大小以及比例
- 避免wxml节点数过大
- 滚动区域设置惯性滚动。`-webkit-overflow-scrolling: touch`
- 避免短时间内发起太多请求（使用懒加载）
- 合理的使用分包
- 减少data的大小，非必要不 setData
- 组件化
- 按需注入

## bindtap 与 bindcatch 区别

- bindtap不会阻止事件冒泡，bindcatch`会阻止`事件冒泡

## webview中的页面怎么跳回小程序中?

- wx.miniProgram.navigateTo({url:'/pages/index/index'})

## webview的页面怎么跳转到小程序导航的页面?

- 通过 switchTab 跳转，但是默认情况下不会重新加载数据，若需要重新加载数据，则需要在success属性中手动调用

```js
// 在 webview中的success属性中添加以下代码

success:function (e) {
  var page = getCurrentPages().pop()
  if(page === undefined || page === null) return

  page.onLoad()
}

```

## webview怎么跟小程序通信？

- webview向小程序发送数据，通过`wx.miniprogram.postMessage()`进行通信，而小程序通过`bind:message`的方法进行接收，但只有在页面`后退`、`分享`、`销毁`时，才会调用。

## 微信小程序和h5的区别

- 运行环境不同
  - 小程序运行在 webview 内核中
  - h5运行环境是浏览器

- 开发成本不同
  - 只在微信中运行，不用顾虑浏览器兼容问题

## 小程序设置less

- `easy less` 插件，配置一下 `settings.json` 就可以了

## 小程序的生命周期

- App
  - onLanch
  - onShow

- Page
  - onLoad
  - onShow
  - onReady
  - onHide
  - onUnload
  - onShareMessage
  - onPageScroll
  - onPullDownRefresh

- Component
  - created
  - attached
  - ready
  - moved
  - detached
  - error

## 小程序怎么阻止页面默认返回

[wx.enableAlertBeforeUnload](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.enableAlertBeforeUnload.html)

- `wx.enableAlertBeforeUnload(Object object)` 开启小程序页面询问对话框。
  - 弹窗条件
    - 当用户在小程序内非首页页面/最底层页
    - 官方导航栏上的的返回
    - 全屏模式下自绘返回键
    - android 系统 back 键时
  - 注意事项
    - 手势滑动返回时不做拦截
    - 在任何场景下，此功能都不应拦住用户退出小程序的行为

- 使用 `wx.hideHomeButton` 消除页面左上角的返回按钮

```js
Page({
  onShow: function () {
    wx.hideHomeButton();

  },
})
```

## 小程序绘制海报会出现的问题

- 图片显示不全，或者图片模糊
- 原因： 你设置的图片宽高例如为 750 x 1200 ，但实际在canvas画布上画出的尺寸为  375 x 600，图片会显示不全。

### wx.canvasToTempFilePath() 将画布指定区域导出生成指定大小的图片

- 解决
  - 图片居中问题
  - 生成图模糊问题

```js
wx.canvasToTempFilePath({
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  destWidth: 100,
  destHeight: 100,
  canvasId: 'myCanvas',
  success(res) {
    console.log(res.tempFilePath)
  }
})
```
