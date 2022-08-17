# 布局类

## 两边固定中间自适应

### 使用flex布局

![使用flex布局](https://clouds.guowei.link/blog/微信图片_20220612162828.png)

```html
<style>
  .box {
    position: relative;
    width:100%;
    /* 要有明确的高度，不能自动，否则会不生效 */
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .top {
    width: 100%;
    /* 要有明确的高度 */
    height: 50px;
  }

  .center {
    flex:1;
    width: 100%;
    height: 100%;
    /* 在区域内滚动 */
    overflow: auto;
  }

  .bottom {
    width: 100%;
    /* 要有明确的高度 */
    height: 100px;
  }
</style>
<body>
  <div class="box">
    <div class="top"></div>
    <div class="center"></div>
    <div class="bottom"></div>
  </div>
</body>
```

### 使用定位

```html
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
    width: 100px;
    right: 0;
  }

  .center {
    /* 要与left的 width保持一致 */
    margin-left: 200px;
    /* 要与right的宽度保持一致 */
    margin-right: 100px;
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
```

### 使用浮动

```html
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
