# 常用知识点

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

### 双等号左右两边的转换规则？

- 1、null == undefined 为 true
- 2、如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1；
- 3、如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
- 4、如果一个操作数是对象，另一个操作数不是，则调用对象的toString()方法，用得到的基本类型值按照前面的规则进行比较

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
