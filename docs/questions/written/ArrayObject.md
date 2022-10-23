# 数组对象去重

## 使用 filter和map

```js
function uniqueFunc(arr, key){
  const res = new Map()
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1))
}
```

## 使用 reduce

```js
function uniqueFunc(arr, key){
  let hash = {}
  return arr.reduce((prevValue,currentValue) => {
    hash[currentValue[key]] ? '' : hash[currentValue[key]] = true && prevValue.push(currentValue)
    return prevValue
  },[])
}
```

## 数组去重的方式

### 第一种方法：ES6 - 直接用Set

```js
let arr=[12,23,15,12,48,55,16,12,6,8,6,10];
/*直接用SET */
let a = [...new Set(arr)];
let b = Array.from(new Set(arr));
console.log(a,b);

```

![](https://img-blog.csdnimg.cn/20200318155249555.png)

### 第二种方法：拿出当前项和后续进行比较（会新增堆内存）

```js
/*拿出当前项和后续进行比较*/
let arr=[12,23,15,12,48,55,16,12,6,8,6,10];
let c=[];
for(let i=0;i<arr.length;i++){
    let item=arr[i],
        args=arr.slice(i+1);
    if(args.indexOf(item)==-1){
        //无重复项
        c.push(item);
    }
}
console.log(c);
```

## 2.数组扁平化的N种实现方案

- 即将多维数组变为一位数组

### 第一种方法：使用ES6中`flat`方法

```js
/**数组扁平化 */
let arr= [
    [1,2,2],
    [3,4,5,5],
    [6,7,8,9,[11,12,[12,13,[14]]]],10
];
/**ES6方法: */
arr=arr.flat(Infinity);
console.log(arr);
```

### 第二种方法：使用toString()然后将字符串转化数字

```js
/**使用toString()然后将字符串转化数字 */
arr=arr.toString().split(',').map(item=>parseFloat(item));
console.log(arr);
```

### 第三种方法：转化JSON格式字符串 然后用正则替换所有的[]（比上一种方法多了一步，加了正则）

```js
/**转化JSON格式字符串 然后用正则替换所有的[] */
arr=JSON.stringify(arr).replace(/(\[|\])/g,'').split(',').map(item=>parseFloat(item));
console.log(arr);
```

### 第四种方法：循环验证是否为数组

```js
/**循环验证是否为数组 */
while(arr.some(item=>Array.isArray(item))){
    arr=[].concat(...arr);
}
console.log(arr);
```
