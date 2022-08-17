# 对象类型（Object types）

在 JavaScript 中，最基本的将数据成组和分发的方式就是通过对象。在 TypeScript 中，我们通过对象类型（object types）来描述对象。

## 索引签名（Index Signatures）

有的时候，你不能提前知道一个类型里的所有属性的名字，但是你知道这些值的特征。

这种情况，你就可以用一个索引签名 (index signature) 来描述可能的值的类型，举个例子：

```ts
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1]; // const secondItem: string
```

这样，我们就有了一个具有索引签名的接口 `StringArray`，这个索引签名表示当一个 `StringArray` 类型的值使用 `number` 类型的值进行索引的时候，会返回一个 `string` 类型的值。

一个索引签名的属性类型必须是 `string` 或者是 `number`。

虽然 TypeScript 可以同时支持 string 和 number 类型，但数字索引的返回类型一定要是字符索引返回类型的子类型。这是因为当使用一个数字进行索引的时候，JavaScript 实际上把它转成了一个字符串。这就意味着使用数字 100 进行索引跟使用字符串 100 索引，是一样的。

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
  [x: string]: Dog;
}
```

尽管字符串索引用来描述字典模式（dictionary pattern）非常的有效，但也会强制要求所有的属性要匹配索引签名的返回类型。这是因为一个声明类似于 obj.property 的字符串索引，跟 obj["property"]是一样的。在下面的例子中，name 的类型并不匹配字符串索引的类型，所以类型检查器会给出报错：

```ts
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string;
	// Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

然而，如果一个索引签名是属性类型的联合，那各种类型的属性就可以接受了：

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

最后，你也可以设置索引签名为 readonly。

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
// Index signature in type 'ReadonlyStringArray' only permits reading.
```

因为索引签名是 `readonly` ，所以你无法设置 `myArray[2]` 的值。

## 属性继承（Extending Types）

对接口使用 extends关键字允许我们有效的从其他声明过的类型中拷贝成员，并且随意添加新成员。

接口也可以继承多个类型：

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## 交叉类型（Intersection Types）

TypeScript 也提供了名为交叉类型（Intersection types）的方法，用于合并已经存在的对象类型。

交叉类型的定义需要用到 `&` 操作符：

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

这里，我们连结 Colorful 和 Circle 产生了一个新的类型，新类型拥有 `Colorful` 和 `Circle` 的所有成员。

```ts
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
// Argument of type '{ color: string; raidus: number; }' is not assignable to parameter of type 'Colorful & Circle'.
// Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
```

## 接口继承与交叉类型（Interfaces vs Intersections）

这两种方式在合并类型上看起来很相似，但实际上还是有很大的不同。最原则性的不同就是在于冲突怎么处理，这也是你决定选择那种方式的主要原因。

```ts
interface Colorful {
  color: string;
}

interface ColorfulSub extends Colorful {
  color: number
}

// Interface 'ColorfulSub' incorrectly extends interface 'Colorful'.
// Types of property 'color' are incompatible.
// Type 'number' is not assignable to type 'string'.
```

使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会：

```ts
interface Colorful {
  color: string;
}

type ColorfulSub = Colorful & {
  color: number
}
```

虽然不会报错，那 `color` 属性的类型是什么呢，答案是 `never`，取得是 `string` 和 `number` 的交集。

## 泛型对象类型（Generic Object Types）

让我们写这样一个 Box 类型，可以包含任何值：

```ts
interface Box {
  contents: any;
}
```

现在 `contents` 属性的类型为 any，可以用，但容易导致翻车。

我们也可以代替使用 `unknown`，但这也意味着，如果我们已经知道了 `contents` 的类型，我们需要做一些预防检查，或者用一个容易错误的类型断言。

```ts
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());
```

一个更加安全的做法是将 Box 根据 contents 的类型拆分的更具体一些：

```ts
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
```

但是这也意味着我们不得不创建不同的函数或者函数重载处理不同的类型：

```ts
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

这样写就太繁琐了。

所以我们可以创建一个泛型 Box ，它声明了一个类型参数 (type parameter)：

```ts
interface Box<Type> {
  contents: Type;
}
```

你可以这样理解：Box 的 Type 就是 contents 拥有的类型 Type。

当我们引用 Box 的时候，我们需要给予一个类型实参替换掉 Type：

```ts
let box: Box<string>;
```

把 Box 想象成一个实际类型的模板，Type 就是一个占位符，可以被替代为具体的类型。当 TypeScript 看到 `Box<string>`，它就会替换为 `Box<Type>` 的 `Type` 为 `string` ，最后的结果就会变成 `{ contents: string }`。换句话说，`Box<string>`和 `StringBox` 是一样的。

```ts
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "hello" };
boxA.contents;
// (property) Box<string>.contents: string

let boxB: StringBox = { contents: "world" };
boxB.contents;
// (property) StringBox.contents: string
```

不过现在的 `Box` 是可重复使用的，如果我们需要一个新的类型，我们完全不需要再重新声明一个类型。

```ts
interface Box<Type> {
  contents: Type;
}

interface Apple {
  // ....
}

// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;
```

这也意味着我们可以利用泛型函数避免使用函数重载。

```ts
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

类型别名也是可以使用泛型的。比如：

```ts
interface Box<Type> {
  contents: Type;
}
```

使用别名对应就是：

```ts
type Box<Type> = {
  contents: Type;
};
```

类型别名不同于接口，可以描述的不止是对象类型，所以我们也可以用类型别名写一些其他种类的的泛型帮助类型。

```ts
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNull<Type> = OneOrMany<Type> | null

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

type OneOrManyOrNullStrings = OneOrMany<string> | null
```

## ReadonlyArray 类型（The ReadonlyArray Type）

`ReadonlyArray` 是一个特殊类型，它可以描述数组不能被改变。

```ts
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

`ReadonlyArray` 主要是用来做意图声明。当我们看到一个函数返回 ReadonlyArray，就是在告诉我们不能去更改其中的内容，当我们看到一个函数支持传入 `ReadonlyArray` ，这是在告诉我们我们可以放心的传入数组到函数中，而不用担心会改变数组的内容。

不像 `Array`，`ReadonlyArray` 并不是一个我们可以用的构造器函数。

```ts
new ReadonlyArray("red", "green", "blue");
// 'ReadonlyArray' only refers to a type, but is being used as a value here.
```

TypeScript 也针对 `ReadonlyArray<Type>` 提供了更简短的写法 `readonly Type[]`。

```ts
function doStuff(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

最后有一点要注意，就是 `Arrays` 和 `ReadonlyArray` 并不能双向的赋值：

```ts
let x: readonly string[] = [];
let y: string[] = [];

x = y; // ok
y = x; // The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.

```

## 元组类型（Tuple Types）

元组类型是另外一种 Array 类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型

```ts
type StringNumberPair = [string, number];
```

在这个例子中，StringNumberPair 就是 string 和 number 的元组类型。
