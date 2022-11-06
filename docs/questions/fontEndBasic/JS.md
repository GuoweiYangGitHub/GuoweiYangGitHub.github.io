# JS 基础

## 小知识

- map() 没有 return 返回值 为 undefined
- sort() 默认会按着 ask 码来排序
- push() 返回值为当前 push 的元素

## var, let , const 的区别

- 变量提升、块级作用域、重复声明同名变量、重新赋值

## js基础数据类型和引用数据类型存在哪

- `基础数据类型`存在`栈（stack）`(特点：先进后出)中。
- `引用数据类型`存在`堆（heap）`（特点：数据任意存放）中。

## 面向对象

运用类、继承、封装等进行程序设计的一种思想。

- 能够将复杂问题和复杂逻辑简单化
- 方便扩展
- 方便维护

## require 和 import 的区别

- require 是`运行时调用`；import 是`编译时调用`（所以必须放在文件开头）。
- require 是`同步加载`模块； import 是`异步加载`模块（有一个独立模块依赖的解析阶段）。
- require 输出的是一个`值的（浅）拷贝`；import 输出的是`值的引用`。

- 本质区别
  - require 是赋值过程，其实 require 的结果就是对象，数字，字符串，函数等，再把 require 的结果赋值给某个变量
  - import 是解构过程，我们在 node 中使用 babel 支持 es6，也仅仅是将 es6 转码为 ES5 再执行，import 语法会被转换成 require

## Object.is() 对比两个参数是否相等

```js
Object.is(NaN,NaN)  // true

Object.is(+0,-0) // false

// 自己实现一个Object.is
if(!Object.is) {
  Object.is = function (x, y){
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
}

```

## 什么是纯函数

- 没有副作用的函数

## 什么是函数副作用

- 函数在正常工作任务之外对外部环境所施加的影响。

## 怎么在不使用变量的情况下 交换两个变量的值？

```js
let a = 1;
let b = 2;
[b,a] = [a,b]
```

### [b, a] = [a, b] 的原理是什么，它是怎么交换两个变量的值的？

- `[a, b] = [b=a, a=3]`
- 解构的过程为：
  1. 以从左到右的顺序计算出右侧数组的值，得到数组
  2. 以从左到右的顺序，将右侧数组的值赋值给左侧

- 可以看到解构赋值的过程中会有一个包含两个元素的的临时数组，并没有比传统方法节省空间，甚至空间会比传统方法多一个int值大小的空间

## 斐波拉契数列数组

```js
const map = new Map()
const list = []
function fn(num) {
  if(map.has(num)) {
    return map.get(num)
  }

  if(num === 1 || num === 2) {
    if(!map.has(num)) {
      list.push(1)
      map.set(num, 1)
    }
    return 1
  }

  const result = fn(num - 1 ) + fn(num - 2)
  map.set(num, result)
  list.push(result)
  return result
}

console.log('list',list)
```

## dispatchEvent 点击和真实点击的区别

- 没啥大区别，最终调用的都是 fireEventListener
- 其中的 microtask 执行条件是必须在 host 包装嵌套深度为 0 时才跑
- 用户点击时候，microtask 执行时，是回调完成后，此时包装深度已经是 0 了
- 而 dispatchEvent 时，由于 dispatchEvent 本身就是个层包装，需要它执行完成后包装深度才能是 0，才能 runMicrotask。

```html
<!-- 可以通过 event.isTrusted 判断是否由用户触发 true 用户触发；false 代码触发-->
<button class="btn">测试dispatchEvent()方法</button>

<script>
  let btn = document.querySelector('.btn');

  btn.addEventListener('click', function () {
    alert('点击了');
  });

  let clickEvent = new Event('click');
  btn.dispatchEvent(clickEvent);
</script>
```

## 使用 DocumentFragment 创建并组成一个dom子树

- 目的： 减少重绘重排的次数

```js
<ul id="list"></ul>


const list = document.querySelector('#list')
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']

const fragment = new DocumentFragment()

fruits.forEach((fruit) => {
  const li = document.createElement('li')
  li.textContent = fruit
  fragment.appendChild(li)
})

list.appendChild(fragment)

```

## 箭头函数与普通函数的区别

- 箭头函数中的 this 在编写代码的时候就已经确定了,及箭头函数本身所在的作用域,普通函数在调用时确定 this
- 箭头函数没有 `arguments`
- 箭头函数没有 `prototype`属性

## 浅拷贝

- 浅拷贝是值的赋值,对于对象是内存地址的赋值,目标对象的引用和原对象的引用指向的是同一块内存空间.如果其中一个对象改变,就会影响到另一个对象

## 深拷贝

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,对象与对象间不会共享内存,而是在堆内存中心开辟一个空间去储存,所以修改心对象不会影响原对象

### JSON.parse(JSON.stringify()) 深拷贝的问题

- 弊端

  1. 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果 ，时间将知识字符串的形式，而不是对象的形式。
  2. 如果 obj 里有 RegExp，Error 对象，序列化的结果只得到空对象
  3. 如果 obj 里有函数，undefined，则序列化的结果会把函数或 undefined 丢失
  4. 如果对象里有 NaN,infinity 和-Infinity，序列化的结果会变成 null
  5. JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的，则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor
  6. 如果对象中存在循环引用的情况也无法正确实现深拷贝

- 浅拷贝：
  - 只会讲对象的各属性进行依次复制，并不会递归复制。
- 深拷贝：
  - 不仅将原对象的各属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深拷贝的方法递归复制到新对象上



## es6 新增

- promise
- Set()
- Map()
- Object.assign() //浅拷贝
- 箭头函数
- let 和 const
- 模板字符串
- class
- 数据解构
- 数据展开 ...操作符
- import export

## new 操作符做了什么

- 创建了一个空对象
- 让this指向了该对象
- 执行构造函数并给对象的属性赋值，继承构造函数的原型
- 判断构造函数是否有返回值，且根据返回值的类型进行返回，引用类型，返回引用地址，值类型返回值。

## this 指向 (函数的 4 种调用模式)

- 普通函数调用 this 执行 window
- 对象调用 this 指向 调用的这个对象
- new 构造函数 调用, this 指向 new 构造函数的实例
- setTimeout setInterval this 指向 window
- 箭头函数 ,this 指向上下文(context 也就是作用域)
- call,apply 调用 this 指向你要替换的对象

## 介绍 DOM 的三个阶段

- 事件捕获
- 目标阶段
- 事件冒泡

## 预编译

- 举例

```js
var AO = {
  a = function a(){console.log("函数a");};
  d = 'abc'
}
```

1. 创建AO对象
2. 找形参和变量声明，将变量和形参作为AO属性名，值为undefined
3. 将实参和形参相统一
4. 在函数体里找到函数声明，值赋予函数体。最后程序输出变量值的时候，就是从AO对象中拿

## 什么叫变量对象？

- 变量对象是 js 代码在进入执行上下文时，js 引擎在内存中建立的一个对象，用来存放当前执行环境中的变量。

## 词法作用域（Lexical scope）

- 这里想说明，我们在函数执行上下文中有变量，在全局执行上下文中有变量。JavaScript的一个复杂之处在于它如何查找变量，如果在函数执行上下文中找不到变量，它将在调用上下文中寻找它，如果在它的调用上下文中没有找到，就一直往上一级，直到它在全局执行上下文中查找为止。(如果最后找不到，它就是 undefined)。

## 闭包

- 什么是闭包?
  - 一个函数访问父级或父级以上作用域的变量，那这个函数就被称为闭包。
- 闭包产生的条件
  - 函数在定义时的词法作用域以外的地方被调用就会产生闭包(词法作用域: 定义在词法阶段的作用域)
  - 当内部函数 `访问了外部函数的局部变量`才会产生闭包.
    - 可以通过控制台 `sources` -> `Call Stack` -> `Closure`(如果产生了闭包才会有 Closure)
- 创建闭包的常见方式,就是在一个函数内部创建另一个函数
- 闭包的用处
  - 可以减少全局变量的定义，避免全局变量的污染
  - 可以读取函数内部的变量
  - 在内存中维护一个变量，可以用做缓存
- 闭包的问题:
  - 造成内存泄露
  - 闭包可能在父函数外部，改变父函数内部变量的值。
  - 造成性能损失

## 原型与原型链

### 理解

- 所有的函数(包括构造函数) 都是 Function new 出来的,原型都是 Function.prototype
- 所有的原型对象都是 Object(构造函数) new 出来的,原型都是 Object.prototype

### instanceof 的原理

- A instance B 是指 B.prototype 是否在 A 的原型链上(简单理解就是沿着 A 的**proto** 跟 B 的 prototype 寻找,如果能找到同一引用返回 true,否则返回 false)

## Reflect 对象

- Reflect 对象与 Proxy 对象一样， 也是 ES6 为了操作对象而提供的新 API。
- Reflect.get(target, name, receiver): 查找并返回 target 对象的 name 属性，如果没有改属性，则返回 undefined。
- Reflect.set(target,name, value, receiver): 设置 target 对象的 name 属性等于 value

```js
// proxy代理
const target = {
  name: 'yang',
  sex: 'man'
};
const handler = {
  get(target, key) {
    console.log('获取名字');
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    return Reflect.set(target, key, `强行设置为${value}`);
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.name);
// 在获取name属性是先进入get方法，在get 方法里面打印了获取名字/性别，然后通过 Reflect.get(target, key) 的返回值拿到属性值，相当于 target[key]
```

- proxy 会改变 target 中的 this 指向，一旦 Proxy 代理了 target，target 内部的 this 则指向了 Proxy 代理

```js
const target = new Date('2021-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target); //重新绑定this指向
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.getDate());
```
