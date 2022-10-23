# 兼容性问题

## 1.Android 端文字未垂直居中

```text
1. 通过line-height等于height设置时有时会出现未垂直居中,换用flex布局的align-items: center;

2.小于12px大小的字体会偏上: 通过transform: scale() 和 transform-origin控制字体缩放
```

## 2.ios 页面底部 margin-bottom 失效（有人没遇到过这个问题？？）

- 设置一个空的 div 撑起 margin-bottom 设置的高度

## 3.absolute 定位元素被输入法顶起

- 当 absolute 元素的父元素设置 height 等于屏幕高度时,输入法弹起,屏幕高度缩小,导致定位元素顶起,遮盖了其他元素
- 解决方法:
  - input 获取焦点时,让定位元素隐藏或改成静态定位,失去焦点时恢复.

## 4.输入法弹窗导致窗口变小

输入法弹窗显示时,会导致 window 窗口高度变小

- 场景:
  - 页面 a,输入法弹窗显示时,跳到页面 b,会导致页面 b 通过 window.innerHeight 获取的高度有问题
- 解决方法:
  - 1.跳转页面之前,先用 document.activeElement.blur()隐藏虚拟键盘,然后延时 300 毫秒再跳转
  - 2.跳转前先通过 window.innerHeight 获取输入法未弹起时的内容窗口高度,再通过地址拼接传递该高度.

## 移动端 1px 的问题

> devicePixelRatio = 物理像素 / css 像素。

- 使用伪类 + transform scale 配合

```css
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

## 手机端使用 echarts 有没有遇到过什么问题

- 同一个 echartsDOM 你要渲染两种不同类型的图表时，你要先 echartsDOM.clear()移除实例中所有的组件和图表
- 移动端 echarts 字号设置不受浏览器最小字号限制，我们可以随意的设置更符合界面显示需要的字号
- tooltip 显示框默认是出现在用户交互的数据点附近，在手机端可能会有显示不全的问题，可以动态设置 tooltip 的位置
