# 使用taro开发微信小程序

## taro中的分享

### taro中要开启分享

#### 在页面级config中配置

```js
export default definePageConfig({
  enableShareAppMessage: true
});
```

#### 在文件中写入taro封装的函数

```ts
import { useShareAppMessage } from '@tarojs/taro';

export default defineComponent({
  name: 'ComponentName',
  setup() {
    // 分享
    useShareAppMessage((res) => {});

    return { };
  }
});
```

### 问题

> 如果全局页面都需要做分享功能，切默认有分享文案和图片，像这样写在页面中，非常的不友好。将来文案图片有变化，替换起来非常麻烦。所以可以将它封装成一个hooks。

#### 封装 **useShareMessage** hooks函数

```ts
import { useShareAppMessage } from '@tarojs/taro';

interface shareType {
  title: string;
  imageUrl: string;
  path: string;
}

// 分享hooks
export function useShareMessage(cb: Function = () => {}) {
  useShareAppMessage((res) => {
    const defaultShare: shareType = {
      path: `/pages/index/index?${shareParams}`,
      imageUrl:
        'https://img.cbg.pub/crm/files/dad715ea-40bb-a21f-3e5d-a01a639c18561639383207.jpg',
      title: '各路玩咖速速集结，快和乐堡啤酒放开玩就现在，WHY NOT!'
    };

    const buttonShare: shareType = {
      path: `/pages/index/index?${shareParams}`,
      imageUrl:
        'https://img.cbg.pub/crm/files/dad715ea-40bb-a21f-3e5d-a01a639c18561639383207.jpg',
      title: '推荐你，各路玩咖速速集结，快和乐堡啤酒放开玩就现在，WHY NOT！'
    };

    // 自定义返回的对象
    const shareResult: shareType = cb(res) || {};

    // 按钮分享
    if (res.from === 'button') {
      return {
        imageUrl: shareResult.imageUrl || buttonShare.imageUrl,
        title: shareResult.title || buttonShare.title,
        path: resultPath || buttonShare.path
      };
    } else {
      return {
        imageUrl: shareResult.imageUrl || defaultShare.imageUrl,
        title: shareResult.title || defaultShare.title,
        path: resultPath || defaultShare.path
      };
    }
  });
}
```

## taro中使用nutui 375设计稿的问题

> 修改config 目录下的 index.js 文件中配置

```js
const config = {
  // 1. 将设计图调整为750px
  designWidth: 750,

  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // 2.将nutui组件设置为黑名单即可
          selectorBlackList: [/nut-/]
        }
      }
    }
  },
}
```
