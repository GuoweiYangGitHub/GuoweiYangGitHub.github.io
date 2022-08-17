# 索引访问类型（Indexed Access Types）

我们可以使用 索引访问类型（indexed access type） 查找另外一个类型上的特定属性：

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number
```

因为索引名本身就是一个类型，所以我们也可以使用联合、keyof 或者其他类型：

```ts
type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I3 = string | boolean
```

假设有这样一个业务场景，一个页面要用在不同的 APP 里，比如淘宝、天猫、支付宝，根据所在 APP 的不同，调用的底层 API 会不同，我们可能会这样写：

```ts
const APP = ['TaoBao', 'Tmall', 'Alipay'];

function getPhoto(app: string) {
  // ...
}

getPhoto('TaoBao'); // ok
getPhoto('whatever'); // ok
```

如果我们仅仅是对 app 约束为 string 类型，即使传入其他的字符串，也不会导致报错，我们可以使用字面量联合类型约束一下：

```ts
const APP = ['TaoBao', 'Tmall', 'Alipay'];
type app = 'TaoBao' | 'Tmall' | 'Alipay';

function getPhoto(app: app) {
  // ...
}

getPhoto('TaoBao'); // ok
getPhoto('whatever'); // not ok
```

但写两遍又有些冗余，我们怎么根据一个数组获取它的所有值的字符串联合类型呢？我们就可以结合上一篇的 typeof 和本节的内容实现：

```ts
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
type app = typeof APP[number];
// type app = "TaoBao" | "Tmall" | "Alipay"

function getPhoto(app: app) {
  // ...
}

getPhoto('TaoBao'); // ok
getPhoto('whatever'); // not ok
```

我们来一步步解析：

首先是使用 as const 将数组变为 readonly 的元组类型：

```ts
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
// const APP: readonly ["TaoBao", "Tmall", "Alipay"]
```

但此时 APP 还是一个值，我们通过 typeof 获取 APP 的类型：

```ts
type typeOfAPP = typeof APP;
// type typeOfAPP = readonly ["TaoBao", "Tmall", "Alipay"]
```

最后在通过索引访问类型，获取字符串联合类型：

```ts
type app = typeof APP[number];
// type app = "TaoBao" | "Tmall" | "Alipay"
```
