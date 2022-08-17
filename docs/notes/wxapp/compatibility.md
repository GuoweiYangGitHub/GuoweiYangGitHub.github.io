# 小程序兼容性问题

## 解决小程序图片闪动变形问题

![解决小程序图片闪动变形问题](https://clouds.guowei.link/blog/tapd_32201678_base64_1653742633_3.png)

- 如果设置了 `widthFix`,则手动将`height`调整为 `auto`;
- 如果设置了 `heightFix`,则手动将`width`调整为 `auto`;

```html
<style lang="scss">
  .widthFix {
    height: auto;
  }

  .heightFix {
    width: auto;
  }
</style>

<image class="widthFix" mode="widthFix" src="https://clouds.guowei.link/blog/1.jpg" />

<image class="heightFix" mode="heightFix" src="https://clouds.guowei.link/blog/1.jpg" />
```

## showLoading 展示问题
> 小程序 wx.showLoading中title值在 安卓下只能显示最大7个字符，ios可大于7个字符

