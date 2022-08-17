# 移动端兼容性问题

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

## 解决移动端 1px问题

```scss
.div::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 300%;
  height: 300%;
  border: 1.5px solid #bfbfbf;

  transform: scale(1/3);
  transform-origin: left top; /*缩放原点*/
  border-radius: 6px;
}
```

## 手机端表单元素的默认外观重置

```scss
.input {
  -webkit-appearance: none;
}
```
