## Set

- 成员的值都是唯一的,没有重复的值,类似于数组
- 可以遍历
- Set.prototype.constructor Set 构造函数
- Set.prototype.size 返回Set实例的成员总数

- add(value) 添加某个值,返回Set结构本身
- delete(value) 删除某个值,返回一个布尔值,表示是否成功
- has(value) 返回一个布尔值,表示参数是否为Set成员
- clear() 清除所有成员,没有返回值
- 特殊情况
  - +0 与-0 在存储判断唯一性是恒等的,所以不重复
  - undefined 与 undefined 是恒等的,所以不重复
  - NaN 与 NaN 是不恒等的,但是在 Set 中只能存一个

```js
let mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add('some Text');
console.log(mySet); // 1,5,'some Text'

var mySet = new Set([1, 2, 3, 4, 5, 5]); // [1,2,3,4,5]

// 并集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1,2,3,4}

// 交集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var intersect = new Set([...a].filter(x => b.has(x))) // {2,3}

// 差集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var difference = new Set([...a].filter(x => !b.has(x))) // {1}
```

## Map

- 键值对的集合,`键值可以是任意类型`
- 可以遍历
  map 的定义
- map.set()
- map.get()
- map.has()
- map.delete()
```js
let map = new Map();
let map = new Map([key, value], [key, valu]); //默认带参数的定义
```

- 在开发过程中, 涉及到数据结构,能使用 Map 不使用 Array, 尤其是复杂的数据结构,如果对数组的储存考虑唯一性,使用 Set,放弃 Array

#### 箭头函数与普通函数的区别

- 箭头函数中的 this 在编写代码的时候就已经确定了,及箭头函数本身所在的作用域,普通函数在调用时确定 this
- 箭头函数没有 `arguments`
- 箭头函数没有 `prototype`属性

#### 浅拷贝

- 浅拷贝是值的赋值,对于对象是内存地址的赋值,目标对象的引用和原对象的引用指向的是同一块内存空间.如果其中一个对象改变,就会影响到另一个对象

```js
// Array.prototype.slice

let arr1 = [{ a: 1, b: 2 }, { c: 1 }];
let newArr = arr1.slice();
// 扩展运算符
let newArr = [...arr1];
```

#### 深拷贝

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,对象与对象间不会共享内存,而是在堆内存中心开辟一个空间去储存,所以修改心对象不会影响原对象
- 常用方法:

```js
// 方法一:
JSON.parse(JSON.stringify(arr));
// 作用于对象深拷贝
Object.assign({}, sourceTarget);
```

- 手写深拷贝

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  const type = Object.prototype.toSting().call(obj).slice(8, -1);
  let strategy = {
    Date: (obj) => new Date(obj),
    RegExp: (obj) => new RegExp(obj),
    Array: clone,
    Object: clone,
  };

  function clone(obj) {
    if (map.get(obj)) return map.get(obj);
    let target = new obj.constructor();
    map.set(obj, target);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = deepClone(obj[key], map);
      }
    }
    return target;
  }
  return strategy[type] && strategy[type](obj);
}
```
