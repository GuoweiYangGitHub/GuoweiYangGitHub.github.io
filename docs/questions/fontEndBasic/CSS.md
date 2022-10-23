# CSS 常用

## 盒子模型

```txt
一种是 IE 盒子模型 border-box 宽或高 = content + border + padding
一种是标准盒子模型 content-box 宽或高 = content
  设置这两种盒子模型: `box-sizing: border-box/content-box;`
```

## BFC 块级格式化上下文

### BFC 布局规则

- 内部的 BOX 会在垂直方向,一个接一个的放置
- BFC 是页面上的一个隔离的独立容器
- box 垂直方向的距离是由 margin 决定的,属于同一 BFC 的两个相邻元素 margin 会重叠
- 每个元素的左边,与包含的盒子的左边相接触,即使存在浮动也如此.
- BFC 的区域不会与 float 重叠
- BFC 就是页面上一个隔离的容器,容器里面的子元素不会影响到外面的元素.反之也是如此
- 计算 BFC 的高度时,浮动元素也参与计算.

### 哪些元素会生成 BFC

- float 不为 none
- position 不为 static/relative
- overflow 不为 visible
- display 的值为 table table-cell table-caption
- 根元素

### 怎么防止 margin 重叠

- overflow:hidden;

### 有哪些 BFC 应用

- 左侧/右侧固定,右侧/左侧 自适应

```html
<style>
  .left {
    float: left;
  }
  .right {
    overflow: hidden;
  }
</style>
```

## 弹性布局

- initial 设置它的属性为它的默认值
- inherit 让父元素继承该属性

- 主轴对齐方式 justify-content: flex-start | flex-end | center| baseline
- 侧轴对齐方式 align-items: flex-start | flex-end | center | space-between | space-around
- 改变主轴方向 flex-decoration: row | row-reverse | column | column-reverse | initial | inherit
  - row(默认值)水平显示 | 与 row 相同,顺序相反 | 垂直显示 | 垂直显示, 顺序相反 | | 从父元素继承该属性值
- 给 flex 布局盒子固定宽度: flex-basis: number | auto | initial | inherit

### flex: 1; 是 flex-group ，flex-shrink，flex-basis 三个属性的缩写

- flex: 1 其实全写 是： flex: 1 1 auto;
- flex-group 定义项目的放大比例 （默认 0）
- flex-shrink 定义项目的缩小比例 （默认 1）
- flex-basis 定义分配多余空间之前，项目占据的主轴空间，根据此属性 计算主轴是否有多余空间 （默认 auto）

## opacity:0, visibility:hidden,display:none 的区别？

- 空间占据
  - display：none 隐藏后不占据额外空间，它会产生回流和重绘
  - visibility：hidden 或 opacity：0 隐藏后会占用空间，只会发生重绘
- 子元素继承
  - display：none 不会被子元素继承， 父元素不在了，子元素肯定也不会显示
  - visibility：hidden 会被子元素继承， 子元素可以设置 visibility：visible； 使子元素显示出来。
  - opacity：0，也会被子元素继承，但是不能设置子元素 opacity：1，使其重新显示。
- 事件绑定
  - display：none 和 visibility：hidden 绑定的事件无法触发
  - opacity：0 绑定的事件是可以被触发
- 过渡动画
  - transition 对 display 和 visibility 是无效的。
  - 但是对于 opacity 是有效的。

## 强制开启gpu渲染

```css
/* 滑动元素 */
-webkit-transform: translateZ(0px);
```

## 手机端表单元素的默认外观重置？

- webkit-appearance: none;

## 滚动条

```js
// 隐藏滚动条
::-webkit-scrollbar {
  display: none;
}
```

```js
// 自定义滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: hsla(220,4%,58%,.5);
}
```

- 其他方式：

```js
// 给滚动区域设置margin-right负值来溢出，父元素设置overflow：hidden达到隐藏滚动条效果，兼容所有浏览器。

// 可以再自行添加一个div来模拟滚动条效果，div里添加子元素通过translate和滚动区域scrollTop的值来计算移动。
```

## 文本溢出隐藏

```js
// 单行文本溢出
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;

// 多行文本溢出
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
word-break: break-all;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;

// 多行文本溢出显示不全问题
给该元素添加一个父盒子，父盒子设置固定高度撑起来
```

## 占据剩余高度

- 父盒子不定宽高，第一个子盒子也不定宽高，第二个子盒子占据剩余高度

```js
// 父盒子
height: 100%或数值;
display: flex;
flex-direction: column;

// 要占据剩余高度的子盒子
flex: 1;
```

## scoped

- scoped原理：

```js
// 带有class的标签会自动加上data-v-xxxxxxxx属性，而style里的所有样式会变成属性选择器。

// 这样就能保证你的样式只会作用于当前组件，不会影响其他组件。(但无法保证不受其他组件的样式影响，所以最好所有组件都用scoped。)

// /deep/ 可以穿透子组件，需要和css预处理器及scoped一起使用。
```

## 让不定宽高的元素水平居中

```css
/* 1. */
.father {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  transfrom: translateX(-50%);
}

/* 2 table居中*/
.father {
  display: table;
}
.child {
  display: table-cell;
}

/* 3.flex居中 */
.father {
  display: flex;
  align-items: center;
}

/* 4.如果是块元素 */
.child {
  margin-left: auto;
  margin-right: auto;
}

/* 5.如果行内块,图片,文字,块元素 */
.father {
  text-align: center;
}
```

## 两边固定中间自适应

```html
<!-- 方法1.使用定位 -->
<style>
  .box {
    position: relative;
  }

  .left {
    position: absolute;
    width: 200px;
    left: 0;
  }

  .right {
    position: absolute;
    width: 200px;
    right: 0;
  }

  .center {
    margin-left: 200px;
    margin-right: 200px;
    width: 100%;
  }
</style>
<body>
  <div class="box">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</body>

<!-- 方法2. 使用浮动 -->
<style>
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .center {
    overflow: hidden;
  }
</style>
<body>
  <!-- 注意, 盒子的位置需要发生变化 -->
  <div class="box clearfix">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
  </div>
</body>
```

## `font-weight:500` 在android无效

```js
// font-weight: 500; 之所以无效是系统使用的字体不支持，例如windows的微软雅黑、宋体，

// 而ios的字体支持，

// 所以，ios有效，android无效
```

## css面试真题

### 面试题1

- 请问下面两个div的颜色分别是什么？

> 考察重绘

```html
<style>
  .blue {
    color: blue
  }
  .red {
    color: red
  }
</style>

<div class="red blue">123</div>
<div class="blue red">123</div>

```
