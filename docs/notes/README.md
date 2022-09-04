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

- 优点：
  - 可以使用闭包模拟私有化方法
- 缺点：
  - 增加一定的内存消耗
  - 使用不当容易造成内存泄漏的问题 例子：

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

## 数组常用的方法

| 方法 | 作用 | 是否影响原数组 |
| :-: | :-: | :-: |
| `push` | 在数组后添加元素，返回数组长度 | ✅ |
| `pop` | 删除数组最后一项，返回被删除项 | ✅ |
| `shift` | 删除数组第一项，并返回被删除项 | ✅ |
| `unshift` | 数组开头添加元素，返回数组长度 | ✅ |
| `reserve` | 反转一个数组，返回修改后的数组 | ✅ |
| `sort` | 排序一个数组，返回修改后的数组 | ✅ |
| `splice` | 截取数组，返回被截取的区间 | ✅ |
| `join` | 将一个数组所有元素连接成字符串并返回这个字符串 | ❌ |
| `concat` | arr1.concat(arr2, arr3) 连接数组 | ❌ |
| `map` | 操作数组每一项并返回一个新数组 | ❌ |
| `forEach` | 遍历数组，没有返回值 | ❌ |
| `filter` | 对数组所有项进行判断，返回符合规则的新数组 | ❌ |
| `every` | 数组每一项都符合规则才返回true | ❌ |
| `some` | 数组有符合规则的一项就返回true | ❌ |
| `reduce` | 接收上一个return和数组的下一项 | ❌ |
| `flat` | 数组扁平化 | ❌ |
| `slice` | 截取数组，返回被截取的区间 | ❌ |

## Math的常用方法有哪些？

| 方法 | 作用 |
| :-: | :-: |
| `Math.max(...arr)` | 取arr中的最大值 |
| `Math.min(...arr)` | 取arr中的最小值 |
| `Math.ceil(小数)` | 小数向上取整 |
| `Math.floor(小数)` | 小数向下取整 |
| `Math.round(小数)` | 小数四舍五入 |
| `Math.sqrt(num)` | 对num进行开方 |
| `Math.pow(num, m)` | 对num取m次幂 |
| `Math.random() * num` | 取0-num的随机数 |

## 使用 `Object.prototype.toString.call()` 返回的结果

| 类型 | toString | 结果 |
| :-: | :-: | :-: |
| `Map` | Object.prototype.toString.call(new Map()) | [object Map] |
| `Set` | Object.prototype.toString.call(new Set()) | [object Set] |
| `Array` | Object.prototype.toString.call([]) | [object Array] |
| `Object` | Object.prototype.toString.call({})) | [object Object] |
| `Symbol` | Object.prototype.toString.call(Symbol()) | [object Symbol] |
| `RegExp` | Object.prototype.toString.call(new RegExp()) | [object RegExp] |
| `Function` | Object.prototype.toString.call(function() {}) | [object Function] |
| `Null` | Object.prototype.toString.call(null) | [object Null] |
| `Undefined` | Object.prototype.toString.call(undefined) | [object Undefined] |
| `NaN` | Object.prototype.toString.call(NaN) | [object Number] |

## 讲讲JavaScript的垃圾回收机制

- [垃圾回收](https://juejin.cn/post/6996828267068014600)

## 哪些操作会造成内存泄漏？

- 没有清理的DOM元素引用
- 定时器没有清除
- 事件侦听没有移除


## JS中有哪些不同类型的弹出框？

- 在JS中有三种类型的弹出框可用，分别是：
  - Alert
  - Confirm
  - Prompt

## 如何将 JS 日期转换为ISO标准

`toISOString()`方法用于将js日期转换为ISO标准。 它使用ISO标准将js Date对象转换为字符串。如：

```js
var date = new Date();
var n = date.toISOString();
console.log(n);
// YYYY-MM-DDTHH:mm:ss.sssZ
```

## 如何在JS中编码和解码 URL

`encodeURI()` 函数用于在JS中对URL进行编码。它将url字符串作为参数并返回编码的字符串。

注意: encodeURI()不会编码类似这样字符：`/ ? : @ & = + $ #`，如果需要编码这些字符，请使用encodeURIComponent()。 用法：

```js
var uri = "my profile.php?name=sammer&occupation=pāntiNG";
var encoded_uri = encodeURI(uri);
```

`decodeURI()` 函数用于解码js中的URL。它将编码的url字符串作为参数并返回已解码的字符串，用法：

```js
var uri = "my profile.php?name=sammer&occupation=pāntiNG";
var encoded_uri = encodeURI(uri);
decodeURI(encoded_uri);
```

## 什么是BOM？有哪些api？

- BOM就是`browser object model`，`浏览器对象模型`

| api | 作用 | 代表方法或属性 |
| :-: | :-: | :-: |
| `window.history` | 操纵浏览器的记录 | history.back() history.go(-1) |
| `window.innerHeight` | 获取浏览器窗口的高度 |  |
| `shift` | 删除数组第一项，并返回被删除项 |  |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.host：获取域名和端口 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.hostname：获取主机名 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.port：获取端口号 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.pathname：获取url的路径 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.search：获取?开始的部分 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.href：获取整个url |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.hash：获取#开始的部分 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.origin：获取当前域名 |
| `window.innerWidth` | 操作刷新按钮和地址栏 | location.navigator：获取当前浏览器信息 |

## BOM 和 DOM 的关系

`BOM`全称Browser Object Model，即浏览器对象模型，主要处理浏览器窗口和框架。

DOM全称Document Object Model，即文档对象模型，是 HTML 和XML 的应用程序接口（API），遵循W3C 的标准，所有浏览器公共遵守的标准。

JS是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)，由于BOM的window包含了document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM的根节点。

可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。

## JS中的substr()和substring()函数有什么区别

substr() 函数的形式为substr(startIndex,length)。 它从startIndex返回子字符串并返回'length'个字符数。

```js
var s = "hello";
( s.substr(1,4) == "ello" ) // true
```

substring() 函数的形式为substring(startIndex,endIndex)。 它返回从startIndex到endIndex - 1的子字符串。

```js
var s = "hello";
( s.substring(1,4) == "ell" ) // true
```

## 解释一下 "use strict" ?

“use strict”是Es5中引入的js指令。 使用“use strict”指令的目的是强制执行严格模式下的代码。 在严格模式下，咱们不能在不声明变量的情况下使用变量。 早期版本的js忽略了“use strict”。

## new 操作符做了什么

- 创建了一个空对象
- 通过this变量指代该对象
- 给对象的属性赋值，并继承了构造函数的原型
- 构造函数隐式地返回this

## 箭头函数的特点

- 没有原型属性
- 不绑定this，会捕获其所在上下文的this，作为自己的this
- 不绑定 arguments，用 reset参数代替。
- 不能使用yield命令。
- 不能作为构造函数，不能用new创建一个箭头函数的实例。

## parseInt 与进制转化

- parseInt() 函数可解析一个字符串，并返回一个整数。
- 当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
- 当忽略参数 radix , JavaScript 默认数字的基数如下:
  - 如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。
  - 如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。
  - 如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。

| 参数 | 描述 |
| :-: | :-: |
| `string` | 必需。要被解析的字符串。 |
| `radix` | 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。 |

### 进制计算方式

- `xyz(n) = x*n^2 + y*n^1 + z`
- `abxyz(n) = a*n4 + b*n^3 +  x*n^2 + y*n^1 + z`

```js
// 举个例子

paseInt('10',9) //解析： 1*9^1 + 0*9^0
// 输出：9

parseInt('fdfsdkl234', 16)
// 解析：
  // 1. 剔除无用信息， 因为s非16进制字母，则剔除s后面字符：有效字母为fdf
  // 2. f对应16进制15; d 对应 16进制13, 则：
  // 3. 15*16^2 + 13*16^1 + 15*16^0
// 输出： 4063
```

### 面试题

- `["0x1", "0x2", "0x3"].map(parseInt) 的结果`

```js

// 1.map默认会传入三个参数，分别是 item,index,self
  // 则：对应的遍历的值分别是
  parseInt('0x1',0) // redix默认为0，会转化为10进制： 值：1
  parseInt('0x2',1) // 第二个参数为无效参数， 值： NaN
  parseInt('0x3',2) // 代码输出为0；不太懂。。。

// 4.所以返回的结果为：
  // [1, NaN, 0]
```
