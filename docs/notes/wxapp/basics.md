# 基础

## 生命周期

- 带有组件的生命周期执行顺序

```js
// 生命周期执行顺序
 onLaunch(app.js) -> onShow(app.js) -> attached(组件)->onLoad(页面)-> onShow(页面)
```

## 项目页面的说明

- project.config.json  项目配置文件，做一些个性化配置，例如界面颜色、编译配置等等
- app.json  当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等
- sitemap  配置小程序及其页面是否允许被微信索引
- pages  里面包含一个个具体的页面
- wxss  页面样式，app.wxss  作为全局样式，会作用于当前小程序的所有页面，局部页面样式  page.wxss  仅对当前页面生- 效。
- app.js  小程序的逻辑
- js  页面逻辑
- json  页面配置
- wxml  页面结构

## 小程序 app.json 文件说明

```js
{
  pages: [], //页面的一些配置
  plugins: {}, //
  window: {},
  networkTimeout: {}, // 超时时间
  navigateToMiniProgramAppIdList： [], // 可跳转的其他小程序appid 最多只能10个
  permission: {}, //权限控制
  sitemapLocation: '',
  subpackages: [], //分包
  preloadRule: {} //预加载

}
```

## 小程序中使用 npm 包

- 要先构建 再使用

```js
1. npm init 初始化
2. npm i 包名 -S 下载包
2.5 在构建npm包的时候需要手动创建 目录 `/miniprogram/`
3. 工具 - 构建npm
4. 详情 - 本地设置 - 使用npm模块
```

## 小程序覆盖 vant 样式，重写自定义样式

```js
// page中

// js配置
Page({
  options: {
    styleIsolation: "shared",
  },
});

// wxml
// <van-cell-group>
//   <van-field model:value="{{ form.name }}" placeholder="姓名/name" required />
// </van-cell-group>

// wxss  这个 .van-cell 根据Dom来
//  .van-cell {
//   border: 1rpx solid #ccc !important;
//   border-radius: 10rpx !important;
//   margin-bottom: 30rpx !important;
// }
```

## 小程序 Page 页面生命周期

```js
Page({
  onLoad: function (options) {
    // 生命周期回调—监听页面加载  -- 只加载一次
  },
  onReady: function () {
    //应该相当于Vue mounted
    // 生命周期回调-监听页面初次渲染完成
  },
  onShow: function () {
    //每次切换都会显示
    // 监听小程序显示。小程序启动，或从后台进入前台显示时
  },
  onHide: function () {
    // 每次切换都会显示
    // 监听小程序隐藏。小程序从前台进入后台时。
  },
  onUnload: function () {
    // 页面销毁
  }

  //  ---------------以下不是生命周期钩子函数----------------
  onPullDownRefresh: function () {
    // 监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角转发
  },
  onPageScroll: function () {
    // 页面滚动触发事件的处理函数
  },
  onResize: function () {
    // 页面尺寸改变时触发
  },
});
```

## 组件的生命周期

```js
Component({
  // 组件的生命周期
  lifetimes: {
    created: function () {
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready: function () {
      // 在组件在视图层布局完成后执行
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    error: function () {
      // 每当组件方法抛出错误时执行
    },
  },
});
```

## 组件的传值

### 父组件向子组件传值

```js
// 同Vue父传子相同

// 子组件接收值不太相同
Component({
  properties: {
    title: {
      type: String,
      require: true,
      value: "",
    },
  },
});
```

### 子组件向父组件传值

```js
// ======== 父组件 ========
// 写成 bindmyevent 或者 bind:myevent 都可以
<component-tag-name bind:myevent="onMyEvent" />;

Page({
  onMyEvent: function (e) {
    console.log(e.detail);
  },
});

// ======== 子组件 ========
<button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>;

Component({
  properties: {},
  methods: {
    onTap: function () {
      var myEventDetail = {}; // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent("myevent", myEventDetail, myEventOption);
    },
  },
});
```

## 组件中的插槽

```js
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    /* ... */
  },
  methods: {
    /* ... */
  },
});
```

> 组件中设置插槽位置

```html
<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>
```

> 引用组件的页面模板中使用

```js
<component-tag-name>
  <view slot="before">这里是插入到组件slot name="before"中的内容</view>
  <view slot="after">这里是插入到组件slot name="after"中的内容</view>
</component-tag-name>
```

## 回到顶部

```js
wx.pageScrollTo({
  scrollTop: 0,
});
```

## 静态初始化渲染缓存

> 可以在 app.json 的 window 配置段中添加这个配置

```js
{
  "initialRenderingCache": "static"
}

// 对所有页面启动
{
  "window": {
    "initialRenderingCache": "static"
  }
}
```

### 启动时更新

#### 冷启动与热启动

- 冷启动： 小程序在微信后台销毁后，重新打开， 会是冷启动，会执行`app.js` 中的`onLanch`和`onShow`等生命周期
- 热启动：小程序在微信后台挂起，最小化后重新打开，会是热启动， 热启动）
  - 注意：热启动只会执行`app.js`中的`onShow`生命周期，而不会执行，`onLanch`生命周期（注意注意

> 小程序每次冷启动时，都会检查是否有更新版本，如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。

```js
const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: "更新提示",
    content: "新版本已经准备好，是否重启应用？",
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    },
  });
});

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
});
```

### `:host` 选择器

- 组件所在节点的默认样式

```js
// wxss
:host {
  color: yellow;
}

// wxml
<custom-component>黄颜色文本</custom-component>
```

## 快速导航

- 用户信息 `userInfo` 字段 `指南/插件/插件功能页/用户功能页`
- 分包 `指南/基础能力/分包加载/使用分包`

## 小程序细节点

- `wx.getLaunchOptionsSync` 获取小程序启动时的一些参数
- `wx.getEnterOptionsSync` 获取本次小程序启动时的参数。如果当前是`冷启动`，则返回值与 `App.onLaunch` 的回调参数一致；如果当前是`热启动`，则返回值与 `App.onShow` 一致。

### 小程序场景值

| 场景值 | 场景                            | appId 含义 |
| ------ | ------------------------------- | ---------- |
| 1020   | 公众号 profile 页相关小程序列表 | 来源公众号 |
| 1035   | 小程序打开小程序                | 来源小程序 |
| 1036   | App 分享消息卡片                | 来源 App   |
| 1037   | 小程序打开小程序                | 来源小程序 |
| 1038   | 从另一个小程序返回              | 来源小程序 |
| 1043   | 公众号模板消息                  | 来源公众号 |

### 小程序分栏模式

- 在 app.json 中同时添加 "resizable": true 和 "frameset": true 两个配置项就可以启用分栏模式。

```js
{
  "resizable": true,
  "frameset": true
}
```
