# 笔试题

## 下面程序的输出结果是多少？

### 题目 1

```js
var number = 4;
var numberFactorial = (function factorial(number) {
  return number === 0 ? 1 : number * factorial(number - 1);
})(number);

console.log(numberFactorial);

/**
 * number 4
 * number 3
 * number 2
 * number 1
 * number 0
 * return 1
 * return 2
 * return 6
 * return 24
 *
 */
```

### 题目 2

```js
function addToList(item, list) {
  return list.push(item);
}
const result = addToList("nowcoder", ["hello"]);
```

### 题目 3

```js
var array = [];
for (var i = 0; i < 3; i++) {
  array.push(() => i);
}
var newArray = array.map((el) => el());
console.log(newArray);
```

### 题目 4

```js
function a(m, n) {
  var b = function (l) {
    return l <= m ? l * b(l + 1) : 1;
  };

  return b(m - n + 1);
}

console.log(a(4, 2));
```

### 题目 5

```js
const result = ["0x1", "0x2", "0x3"].map(parseInt);

console.log(result);
```

### 题目 6

```js
const first = () => {
  console.log("first");
  return false;
};
const second = () => {
  console.log("second");
  return true;
};
console.log(first() && second());
console.log(second() || first());
```

### 题目 7

```js
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

### 题目 8

```js
var arr = [1, 2, 3];
arr.push(arr.shift());
console.log(arr[1], arr[2]);
```

### 下面每项的返回值是什么？为什么？

```js
null == undefined;
0.1 + 0.2 == 0.3;
typeof NaN;
typeof Function;
typeof Object;
typeof {};
"a" + 1;
"a" - 1;
Function instanceof Object;
Object instanceof Function;
```

```js
console.log(typeof undefined == typeof NULL);
console.log(typeof function () {} == typeof class {});
```

### 执行后 a 和 b.age 的值分别为?

```js
var a = 10;
var b = {
  age: 11,
};
function fn(x, y) {
  --y.age;
  return --x;
}
fn(a, b);
```

## 正则题目

```js
var s = "12ab3cd",
  arr = s.split(/\d/);
console.log(arr[3], arr[4]);
```

## js 高级

### this 指向问题

#### 题目 1

```js
var x = 1;

var obj = {
  x: 3,
  fun: function () {
    var x = 5;
    return this.x;
  },
};

var fun = obj.fun;
console.log(obj.fun(), fun());
```

#### 题目 2

```js
var a = 5;
function test() {
  a = 0;
  alert(a);
  alert(this.a);
  var a;
  alert(a);
}
new test();
```

#### 题目 3

```js
function fun() {
  return () => {
    return () => {
      return () => {
        console.log(this.name);
      };
    };
  };
}
var f = fun.call({ name: "foo" });
var t1 = f.call({ name: "bar" })()();
var t2 = f().call({ name: "baz" })();
var t3 = f()().call({ name: "qux" });
```

#### 题目 4

- 考察箭头函数的特点

```js
const Person = (name = "wang", age = 10) => {
  this.name = name;
  this.age = age;
  return this.name + " is " + this.age + "years old";
};
let result = new Person("zhang", 11);
console.log(result);
```

#### 题目 5

```js
var name = "global";
var obj = {
  name: "local",
  foo: function () {
    this.name = "foo";
  }.bind(window),
};
var bar = new obj.foo();
setTimeout(function () {
  console.log(window.name);
}, 0);
console.log(bar.name);

var bar3 = (bar2 = bar);
bar2.name = "foo2";
console.log(bar3.name);
```
