# 开发中常用样式

## 水平垂直居中

- 使用flex

``` scss
.box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

```

- 使用定位

```scss
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

## 文本溢出

### 单行文本溢出

```scss
.box {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### 多行文本溢出

> 多行文本溢出显示不全的问题。

- 给该元素添加一个父盒子，父盒子设置固定高度撑起来

```scss
// 三行溢出
$line: 3;

.box {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
}
```

## 设置背景图片

```scss
.box {
  width: 300px;
  height: 200px;
  background-image: url("https://clouds.guowei.link/blog/1.jpg");
  background-size: 100% 100%;
}
```

## css画三角形

### 三角朝上

![三角朝上](https://clouds.guowei.link/blog/8602e920433d1b9b5278e576ba20faf4-0.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-left: $border solid transparent;
  border-right: $border solid transparent;
  border-bottom: $border * 2 solid $color;
}
```

### 三角朝下

![三角朝下](https://clouds.guowei.link/blog/028fa8308fad50dee1a82a46b1607cbe-1.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-left: $border solid transparent;
  border-right: $border solid transparent;
  border-top: $border * 2 solid $color;
}
```

### 三角朝左

![三角朝左](https://clouds.guowei.link/blog/5c00046f81df088351d4d43a521bc86d-2.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-top:$border solid transparent;
  border-right: $border * 2 solid $color;
  border-bottom: $border solid transparent;
}
```

### 三角朝右

![三角朝右](https://clouds.guowei.link/blog/0d4caee861ed445b58ab01b77cfc6b80-3.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-top:$border solid transparent;
  border-left: $border * 2 solid $color;
  border-bottom: $border solid transparent;
}
```

### 左上

![左上](https://clouds.guowei.link/blog/b771abb110d629c2e6f94e8e74c517b9-4.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-top: $border solid $color;
  border-right: $border solid transparent;
}
```

### 右上

![右上](https://clouds.guowei.link/blog/de343091e8805252190ba3bc138ea176-5.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-top: $border solid $color;
  border-left: $border solid transparent;
}
```

### 左下

![左下](https://clouds.guowei.link/blog/0a7cb9c950c407d36e62d3f60e6722a6-6.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-bottom: $border solid $color;
  border-right: $border solid transparent;
}
```

### 右下

![右下](https://clouds.guowei.link/blog/311bd207674c0be4dcf4abd0e25c1702-7.png)

```scss
// 三角形颜色
$color: red;
// 短边长度
$border: 10px;

.box {
  width: 0;
  height: 0;
  border-bottom: $border solid $color;
  border-left: $border solid transparent;
}
```

## 设置下划线

```scss
.box {
  text-decoration: underline;
}
```

## 强制开启GPU渲染

```scss
.box {
  -webkit-transform: translateZ(0px);
}
```

## 滚动条

### 隐藏滚动条

```scss
::-webkit-scrollbar {
  display: none;
}
```

### 自定义滚动条样式

```scss
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

## 点击穿透

- 点击可以穿透现有属性，穿透到下面。

```scss
// 元素不再是鼠标事件的目标，鼠标不再监听当前层而去监听下面的层中的元素。但是如果它的子元素设置了pointer-events为其它值，比如auto，鼠标还是会监听这个子元素的
.box {
  pointer-events: none; // auto | none
}
```
