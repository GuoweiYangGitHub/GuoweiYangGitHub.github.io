# 小程序面试题

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
- 避免短时间内发起太多请求
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
