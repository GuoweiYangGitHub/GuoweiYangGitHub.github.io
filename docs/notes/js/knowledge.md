# 笔记

## JavaScript有几种数据类型？

- number：数字类型
- string：字符串类型
- boolean：布尔值类型
- undefined：未定义类型
- null：空值类型
- object：对象类型
- symbol：symbol类型
- bigint：大数字类型

## 深拷贝与浅拷贝的区别？

- 深拷贝层层拷贝，浅拷贝只拷贝第一层，深层只是引用

- 在深拷贝中，新对象中的更改不会影响原始对象，而在浅拷贝中，新对象中的更改，原始对象中也会跟着改。

- 在深拷贝中，原始对象不与新对象共享相同的属性，而在浅拷贝中，它们具有相同的属性。

## 闭包是什么？

闭包是一个能读取其他函数内部变量的函数

- 优点：使外部能访问到局部的东西
- 缺点：使用不当容易造成内存泄漏的问题 例子：

```js
function a () {
  let num = 0

  // 这是个闭包
  return function () {
     return ++num
  }
}
const b = a()
console.log(b()) // 1
console.log(b()) // 2
```

## 什么是变量提升？函数提升？

变量提升

```js
console.log(name) // undefined
var name = 'Sunshine_Lin'

if (false) {
  var age = 23
}
console.log(age) // undefined 不会报错
```

函数提升

```js
console.log(fun) // function fun() {}
function fun() {}

if (false) {
  function fun2(){}
}
console.log(fun2) // undefined 不会报错
```

函数提升优先级 > 变量提升优先级

```js
console.log(fun) // function fun() {}
var fun = 'Sunshie_Lin'
function fun() {}
console.log(fun) // 'Sunshie_Lin'
```

## isNaN 与 Number.isNaN的区别?

- isNaN：除了判断NaN为true，还会把不能转成数字的判断为true，例如'xxx'
- Number.isNaN：只有判断NaN时为true，其余情况都为false

## 解决遍历对象时，把原型上的属性遍历出来了咋办？

使用`hasOwnProperty`判断

```js
function Person(name) {
  this.name = name
}
Person.prototype.age = 23
const person = new Person('Sunshine_lin')
for (const key in person) { console.log(key) } // name age
// 使用 hasOwnProperty
for (const key in person) {
  person.hasOwnProperty(key) && console.log(key)
} // name
```

## valueOf 与 toString

1. valueOf偏向于运算，toString偏向于显示
2. 对象转换时，优先调用toString
3. 强转字符串优先调用toString，强转数字优先调用valueOf
4. 正常情况下，优先调用toString
5. 运算操作符情况下优先调用valueOf

### 调用valueOf

| 调用者 | 返回值 | 返回值类型 |
| :-: | :-: | :-: |
| `Array` | 数组本身 | Array |
| `Date` | 毫秒数 | Number |
| `Function` | 函数本身 | Function |
| `Object` | 对象本身 | Object |
| `String` | 字符串 | String |

### 调用toString

| 调用者 | 返回值 | 返回值类型 |
| :-: | :--- | :-: |
| `Array` | 数组转字符串，相当于Array.join() | String |
| `Boolean` | 转字符串'true'、'false' | String |
| `Date` | 字符串日期，如'Fri Dec 23 2016 11:24:47 GMT+0800 (中国标准时间)' | String |
| `Number` | 数字字符串 | String |
| `Object` | '[object Object]' | String |
| `String` | 字符串 | String |

## JavaScript变量在内存中具体存储形式？

- 基本数据类型：存在`栈内存`里
- 引用数据类型：指针存`栈内存`，指向`堆内存`中一块地址，内容存在堆内存中
- 也有说法说其实JavaScript所有数据都存`堆内存`中，我也比较赞同这种说法

## JavaScript的装箱和拆箱？

### 装箱：把基本数据类型转化为对应的引用数据类型的操作

看以下代码，s1只是一个基本数据类型，他是怎么能调用indexOf的呢？

```js
const s1 = 'Sunshine_Lin'
const index = s1.indexOf('_')
console.log(index) // 8
```

原来是JavaScript内部进行了装箱操作

- 1、创建String类型的一个实例；
- 2、在实例上调用指定的方法；
- 3、销毁这个实例；

```js
var temp = new String('Sunshine_Lin')
const index = temp.indexOf('_')
temp = null
console.log(index) // 8
```

### 拆箱：将引用数据类型转化为对应的基本数据类型的操作

通过`valueOf`或者`toString`方法实现拆箱操作

```js
var objNum = new Number(123);
var objStr =new String("123");
console.log( typeof objNum ); //object
console.log( typeof objStr ); //object
console.log( typeof objNum.valueOf() ); //number
console.log( typeof objStr.valueOf() ); //string

console.log( typeof objNum.toString() ); // string
console.log( typeof objStr.toString() ); // string
```

## null和undefined的异同点有哪些？

相同点

- 都是空变量
- 都是假值，转布尔值都是false
- null == undefined 为 true不同点
- typeof判断null为object，判断undefined为undefined
- null转数字为0，undefined转数字为NaN
- null是一个对象未初始化，undefined是初始化了，但未定义赋值
- null === undefined 为 false

## 如何判断数据类型？

- typeof xxx：能判断出number，string，undefined，boolean，object，function（null是object）
- Object.prototype.toString.call(xxx)：能判断出大部分类型
- Array.isArray(xxx)：判断是否为数组

## 为什么typeof null 是object？

不同的数据类型在底层都是通过二进制表示的，二进制前三位为`000`则会被判断为`object`类型，而null底层的二进制全都是0，那前三位肯定也是`000`，所以被判断为`object`

## == 与 === 的区别？

- ==：在比较过程中会存在隐式转换
- ===：需要类型相同，值相同，才能为true

## JavaScript的隐式转换规则？

- 1、转成string类型： +（字符串连接符）
- 2、转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
- 3、转成boolean类型：!（逻辑非运算符)

## 双等号左右两边的转换规则？

- 1、null == undefined 为 true
- 2、如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1；
- 3、如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
- 4、如果一个操作数是对象，另一个操作数不是，则调用对象的toString()方法，用得到的基本类型值按照前面的规则进行比较

## undefined >= undefined 为什么是 false ？

按照`隐式转换规则`，可转换成`NaN >= NaN`，NaN 不等于 NaN，也不大于，所以是`false`

## null >= null 为什么是 true？

按照`隐式转换规则`，可转换成`0 >= 0`，0 等于 0，所以是`true`

## [] == ![] 为什么是 true ？

按照`双等号左右两边的转换规则`

- 1、! 优先级高于 ==，[]不是假值，所以先转换成 [] == false
- 2、右边为布尔值，false先转数字0，所以可转换为[] == 0
- 3、左边为对象，[]调用toString转为 ''，转换为'' == 0
- 4、左边为字符串，''转换为0，最终为 0 == 0

## 0.1 + 0.2 === 0.3，对吗？

不对，JavaScript的计算存在精度丢失问题

```js
console.log(0.1 + 0.2 === 0.3) // false
```

- 原因：JavaScript中小数是浮点数，需转二进制进行运算，有些小数无法用二进制表示，所以只能取近似值，所以造成误差
- 解决方法：
  - 先变成整数运算，然后再变回小数
  - toFixed() 性能不好，不推荐

## 什么是匿名函数？

匿名函数：就是没有函数名的函数，如：

```js
(function(x, y){
    alert(x + y);
})(2, 3);
```

这里创建了一个匿名函数(在第一个括号内)，第二个括号用于调用该匿名函数，并传入参数。

## 绑定点击事件有几种方式？

三种

- `xxx.onclick = function (){}`
- `<xxx onclick=""></xxx>`
- `xxx.addEventListener('click', function(){}, false)`

### addEventListener的第三个参数是干嘛的？

第三个变量传一个布尔值，需不需要阻止冒泡，默认是false，不阻止冒泡

## 函数声明和函数表达式的区别？

- 函数声明：享受函数提升
- 函数表达式：归类于变量声明，享受变量提升
- 函数提升优先级 > 变量提升优先级

```js
console.log(fun) // fun () {}
// 函数表达式
var fun = function(name) {}
// 函数声明
function fun () {}
console.log(fun) // fun (name) {}
```

## JavaScript的事件流模型有哪些？

- 事件冒泡：由最具体的元素接收，并往上传播
- 事件捕获：由最不具体的元素接收，并往下传播
- DOM事件流：事件捕获 -> 目标阶段 -> 事件冒泡

## Ajax、Axios、Fetch有啥区别？

- Ajax：是对XMLHttpRequest对象（XHR）的封装
- Axios：是基于Promise对XHR对象的封装
- Fetch：是window的一个方法，也是基于Promise，但是与XHR无关，不支持IE

## load、$(document).ready、DOMContentLoaded的区别？

DOM文档加载的步骤为

- 1、解析HTML结构。
- 2、加载外部脚本和样式表文件。
- 3、解析并执行脚本代码。
- 4、DOM树构建完成。// DOMContentLoaded触发、$(document).ready触发
- 5、加载图片等外部文件。
- 6、页面加载完毕。// load触发

## 如何阻止事件冒泡？

```js
function stopBubble(e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    window.event.cancelBubble = true;
  }
}
```

## 如何阻止事件默认行为？

```js
function stopDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
}

```

## 什么是事件委托？

当所有子元素都需要绑定相同的事件的时候，可以把事件绑定在父元素上，这就是`事件委托`，优点有：

- 绑定在父元素上只需要绑定一次，节省性能
- 子元素不需要每个都去绑定同一事件
- 如果后续又有新的子元素添加，会由于事件委托的原因，自动接收到父元素的事件监听

## 如何实现数组去重？

```js
// 使用 Map 去重
function quchong1(arr) {
  const newArr = []
  arr.reduce((pre, next) => {
    if (!pre.get(next)) {
      pre.set(next, 1)
      newArr.push(next)
    }
    return pre
  }, new Map())
  return newArr
}

// 使用 Set 去重
function quchong (arr) {
    return [...new Set(arr)]
}
```

## NaN是什么？有什么特点？

- NaN不等于自身，也就是 `NaN === NaN` 为 `false`
- NaN为假值，转布尔值为`false`
- NaN本质是一个number，`typeof NaN === number`

## 处理异步的方法有哪些？

- 回调函数
- promise
- 事件监听
- 发布订阅
- async await
