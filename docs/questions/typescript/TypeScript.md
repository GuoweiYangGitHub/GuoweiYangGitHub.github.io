# Typescript 面试

## type 和 interface的区别

1. type后面有 = ，interface 没有。
2. type可以描述任何类型组合，interface 只能描述对象结构
3. interface 可以继承自（extends）interface 或对象结构的 type。type 也可以通过 & 做对象结构的继承。
4. 多次声明的同名 interface 会进行声明合并，type 则不允许多次声明。
5. type可以使用in 关键字 生成映射类型，interface不行。

- 用来描述对象或函数类型
- 可以通过交叉实现继承
  - interface可以扩展，type可以通过交叉实现interface的extends行为
  - interface可以extends type，同时type也可以与interface类型交叉
- type可以使用in 关键字 生成映射类型，interface不行。

```js
type Keys = "name" | "sex"
type DuKey = {
  [Key in Keys]: string //类似 for ... in
}
let stu: Dukey = {
  name: 'wang'，
  sex: 'man'
}
```

### type 怎么继承

```js
type Name = {
  name: string
}

type Person = Name & {
  age: number
}

const people: Person = {
  name: 'ren',
  age: 20
}

// interface 可以通过 extends 进行继承 ； type不能通过 extends进行继承
```
