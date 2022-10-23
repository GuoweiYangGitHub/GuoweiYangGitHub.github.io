# 手写深拷贝

## 浅拷贝

- 浅拷贝是值的赋值,对于对象是内存地址的赋值,目标对象的引用和原对象的引用指向的是同一块内存空间.如果其中一个对象改变,就会影响到另一个对象

```js
// Array.prototype.slice

let arr1 = [{ a: 1, b: 2 }, { c: 1 }];
// 方法一
let newArr = arr1.slice();

// 方法二：
let newArr = [...arr1];

// 方法三
Object.assign({}, sourceTarget);
```

## 深拷贝

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,对象与对象间不会共享内存,而是在堆内存中心开辟一个空间去储存,所以修改心对象不会影响原对象

### 简单快速版

- 实现功能：
  - 正常拷贝基础数据类型，数组和对象
  - 解决环引用问题。

- 未实现功能
  - 无法拷贝 Symbol，RegExp,Function, Map,Set 数据类型

```js
function deepClone(target, map = new Map()){
  // 基本数据类型直接返回
  if(typeof target !== 'object') {
    return target
  }

  // 判断是数组还是对象
  const temp = Array.isArray(target) ? [] : {}

  // 如果已存在则直接返回
  if(map.get(target)) {
    return map.get(target);
  }
  // 不存在则第一次设置
  map.set(target, temp)

  for(const key in target) {
    // 递归
    temp[key] = deepClone(target, map)
  }
  return temp;
}
```

### 完全版本

#### 我们先把以上的引用类型数据分为两类

- 可遍历的数据类型
- 不可遍历的数据类型

#### 可遍历数据类型

- 主要处理以下几种类型
  - Map
  - Set
  - Array
  - Object

```js
// 可遍历的类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

// 不可遍历类型
const symbolTag = '[object Symbol]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 将可遍历类型存在一个数组里
const canForArr = ['[object Map]', '[object Set]', '[object Array]', '[object Object]']

// 将不可遍历类型存在一个数组
const noForArr = ['[object Symbol]', '[object RegExp]', '[object Function]']

// 判断类型的函数
function checkType(target) {
    return Object.prototype.toString.call(target)
}

// 判断引用类型的temp
function checkTemp(target) {
  const c = target.constructor
  return new c()
}
```

#### 不可遍历引用类型

主要处理以下几种类型

- Symbol
- RegExp
- Function

```js
// 拷贝Function的方法
function cloneFunction(func){
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);

    if (body) {
      if (param) {
          const paramArr = param[0].split(',');
          return new Function(...paramArr, body[0]);
      } else {
          return new Function(body[0]);
      }
    } else {
        return null;
    }

  } else {
    return eval(funcString);
  }
}

// 拷贝Symbol的方法
function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.call(target));
}

// 拷贝RegExp的方法
function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

```

#### 最终深拷贝方法

```js

function deepClone(target ,map = new Map()) {

  // 获取类型
  const type = checkType(target)

  // 基本数据类型直接返回
  if(!canForArr.concat(noForArr).includes(type)) {
    return target
  }

  // 判断Function，RegExp，Symbol
  if (type === funcTag) return cloneFunction(target)
  if (type === regexpTag) return cloneReg(target)
  if (type === symbolTag) return cloneSymbol(target)


  // 引用数据类型特殊处理
  const temp = checkTemp(target)

  if(map.get(target)) {
    // 已存在则直接返回
    return map.get(target)
  }

  // 不存在则第一次设置
  map.set(target, temp)

  // 处理Map类型
  if(type === mapTag) {
    target.forEach((item, i) => {
      temp.set(i, deepClone(item, map))
    })

    return temp
  }

  // 处理Set类型
  if(type === setTag) {
    target.forEach(item => {
      temp.add(deepClone(item, map))
    })
    return temp
  }

  // 处理数组和对象
  for(const key in target) {
    // 递归
    temp[key] = deepClone(target[key], map)
  }

  return temp

}
```
