# 常见问题

## 获取当前版本信息

- develop: 开发版
- trial: 体验版
- release: 正式版

```js
const { miniProgram } = wx.getAccountInfoSync()
const envVersion = miniProgram.envVersion
```

## 获取系统信息

```js
wx.getSystemInfoSync()
```

## 加载字体

```js
wx.loadFontFace({
  family: 'webfont',
  global: true,
  source: `url(https://img.cbg.pub/file/jingA/WenYue-XinQingNianTi-NC-W8-1.otf)`,
  success() {},
  fail(res) {
    console.log(res);
  }
});
```

## 跳其他小程序

```js
wx.navigateToMiniProgram({
  appId: 'xxxx',
  path: 'xxxxxxxxxxxxx',
  extraData: {},
  envVersion: 'release',
  success(res) {
    // 打开成功
  }
});
```

## 公众号发红包

```js
// 待更新
```

## 小程序跳转直播间

[小程序跳转直播间官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/channels/wx.reserveChannelsLive.html)

[小程序跳转直播间](https://developers.weixin.qq.com/community/minihome/article/doc/0006c2671ac2a86e6e1d198dd51413)

### 说明

- 预约直播**可以不用关注当前品牌的视频号和公众号**，微信会直接会发通知给到用户。
- 当品牌**打开直播的时候**，微信就会发通知给用户。
- 只有**已认证的品牌**，用户才可以**提前预约直播**。
- 视频号**必须要和小程序或公众号关联**。
- **视频号直播必须要在开的时候**，才可以从小程序**跳到直播间内**。

### 功能

#### 获取视频号直播预告信息

> **wx.getChannelsLiveNoticeInfo(Object object)**

- 入参: `finderUserName`


- 可以 拿到返回值`noticeId`,再调用`wx.reserveChannelsLive(Object object)`去预约直播

```js
wx.getChannelsLiveNoticeInfo({
  finderUserName: finderUserName,
  success: (res) => {
    console.log('getChannelsLiveInfo success', res);
    const { noticeId } = res;
    wx.reserveChannelsLive({
      noticeId: noticeId,
      success: (res) => {
        console.log('res', res);
        // 直播间预约功能： https://developers.weixin.qq.com/community/minihome/article/doc/0006c2671ac2a86e6e1d198dd51413

        // 预约返回状态： https://mmbiz.qpic.cn/mmbiz_png/0bJtCKricpGEvKzZEs8bWuUtdv0kELbVon2dhTrjqeqffEYyhfjeImXmo6sNkCpDb5F7iaDFjlNMJlL55vpQ2iclA/0?wx_fmt=png
        if (res.state == 6) {
          console.log('预约成功了');
          that.missionTask(missionCode);
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  fail: function (err) {
    console.log('getChannelsLiveInfo err', err);
  }
});
```

#### 预约直播

> **wx.reserveChannelsLive(Object object)**

- 入参: `noticeId`

#### 获取直播间信息

> **wx.getChannelsLiveInfo(Object object)**

- 入参: `finderUserName`

#### 打开视频号直播

> **wx.openChannelsLive(Object object)**

- 入参：`finderUserName`、`feedId`、`nonceId`


## 自定义tabbar

### 1.需要在app.json 文件中配置

```json
"tabBar": {
  "custom": true,
  "color": "#fff",
  "selectedColor": "#fff",
  "borderStyle": "black",
  "backgroundColor": "#3DC00F",
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页"
    },
    {
      "pagePath": "pages/brandActivity/brandActivity",
      "text": "品牌活动"
    },
    {
      "pagePath": "pages/open/open",
      "text": "礼券合集"
    },
    {
      "pagePath": "pages/my/my",
      "text": "我的"
    }
  ]
}
```

### 2.需要在根目录创建`custom-tab-bar`文件夹

> taro中需要在src目录下面创建`custom-tab-bar`文件夹
