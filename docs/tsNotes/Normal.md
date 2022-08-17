# 基础

## 常见类型

### 类型别名和接口的不同

> 类型别名和接口非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 type 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。

```js
// Interface
// 通过继承扩展类型
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey

// Type
// 通过交集扩展类型
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear = getBear();
bear.name;
bear.honey;

```

```js
// Interface
// 对一个已经存在的接口添加新的字段
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// Type
// 创建后不能被改变
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.

```

- 在 TypeScript 4.2 以前，类型别名的名字可能会出现在报错信息中 (opens new window)，有时会替代等价的匿名类型（也许并不是期望的）。接口的名字则会始终出现在错误信息中。
- 类型别名也许不会实现声明合并，但是接口可以。
- 接口可能只会被用于声明对象的形状，不能重命名原始类型。
- 接口通过名字使用的时候，他们的名字会总是出现在错误信息中，如果直接使用，则会出现原始结构。

> 大部分时候，你可以根据个人喜好进行选择。TypeScript 会告诉你它是否需要其他方式的声明。如果你喜欢探索性的使用，那就使用 interface ，直到你需要用到 type 的特性。

### 类型断言

有的时候，你知道一个值的类型，但 TypeScript 不知道。

举个例子，如果你使用 document.getElementById，TypeScript 仅仅知道它会返回一个 HTMLElement，但是你却知道，你要获取的是一个 HTMLCanvasElement。

这时，你可以使用类型断言将其指定为一个更具体的类型：

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

就像类型注解一样，类型断言也会被编译器移除，并且不会影响任何运行时的行为。

你也可以使用尖括号语法（注意不能在 .tsx 文件内使用），是等价的：

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> 谨记：因为类型断言会在编译的时候被移除，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者 null 产生。

TypeScript 仅仅允许类型断言转换为一个更加具体或者更不具体的类型。这个规则可以阻止一些不可能的强制类型转换，比如：

```ts
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

有的时候，这条规则会显得非常保守，阻止了你原本有效的类型转换。如果发生了这种事情，你可以使用双重断言，先断言为 any （或者是 unknown），然后再断言为期望的类型：

```ts
const a = (expr as any) as T;
```

### 字面量推断

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

在上面这个例子里，req.method 被推断为 string ，而不是 "GET"，因为在创建 req 和 调用 handleRequest 函数之间，可能还有其他的代码，或许会将 req.method 赋值一个新字符串比如 "Guess" 。所以 TypeScript 就报错了。

有两种方式可以解决：

1.添加一个类型断言改变推断结果：

```ts
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

修改 1 表示“我有意让 req.method 的类型为字面量类型 "GET"，这会阻止未来可能赋值为 "GUESS" 等字段”。修改 2 表示“我知道 req.method 的值是 "GET"”.

2.你也可以使用 as const 把整个对象转为一个类型字面量：

```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

as const 效果跟 const 类似，但是对类型系统而言，它可以确保所有的属性都被赋予一个字面量类型，而不是一个更通用的类型比如 string 或者 number

### 非空断言操作符（后缀 !）

TypeScript 提供了一个特殊的语法，可以在不做任何检查的情况下，从类型中移除 null 和 undefined，这就是在任意表达式后面写上 ! ，这是一个有效的类型断言，表示它的值不可能是 null 或者 undefined：

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

就像其他的类型断言，这也不会更改任何运行时的行为。重要的事情说一遍，只有当你明确的知道这个值不可能是 null 或者 undefined 时才使用 ! 。

## 类型收窄

试想我们有这样一个函数，函数名为 padLeft：

```ts
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}
```

该函数实现的功能是：

如果参数 padding 是一个数字，我们就在 input 前面添加同等数量的空格，而如果 padding 是一个字符串，我们就直接添加到 input 前面。

让我们实现一下这个逻辑：

```ts
function padLeft(padding: number | string, input: string) {
  return new Array(padding + 1).join(" ") + input;
	// Operator '+' cannot be applied to types 'string | number' and 'number'.
}
```

如果这样写的话，编辑器里 padding + 1 这个地方就会标红，显示一个错误。

这是 TypeScript 在警告我们，如果把一个 number 类型 (即例子里的数字 1 )和一个 number | string 类型相加，也许并不会达到我们想要的结果。换句话说，我们应该先检查下 padding 是否是一个 number，或者处理下当 padding 是 string 的情况，那我们可以这样做

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}
```

这个代码看上去也许没有什么有意思的地方，但实际上，TypeScript 在背后做了很多东西。

TypeScript 要学着分析这些使用了静态类型的值在运行时的具体类型。目前 TypeScript 已经实现了比如 if/else 、三元运算符、循环、真值检查等情况下的类型分析。

在我们的 if 语句中，TypeScript 会认为 typeof padding === number 是一种特殊形式的代码，我们称之为类型保护 (type guard)，TypeScript 会沿着执行时可能的路径，分析值在给定的位置上最具体的类型。

TypeScript 的类型检查器会考虑到这些类型保护和赋值语句，而这个**将类型推导为更精确类型的过程，我们称之为收窄(narrowing)**。 在编辑器中，我们可以观察到类型的改变：

### 类型判断式(type predicates)

在有的文档里， type predicates 会被翻译为类型谓词。考虑到 predicate 作为动词还有表明、声明、断言的意思，区分于类型断言（Type Assertion），这里我就索性翻译成类型判断式。

如果引用这段解释：

> In mathematics (opens new window), a predicate is commonly understood to be a Boolean-valued function (opens new window)_ P_: _X_→ {true, false}, called the predicate on X.

如果你想直接通过代码控制类型的改变， 你可以自定义一个类型保护。实现方式是定义一个函数，这个函数返回的类型是类型判断式，示例如下：

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

在这个例子中，pet is Fish就是我们的类型判断式，一个类型判断式采用 parameterName is Type的形式，但 parameterName 必须是当前函数的参数名。

当 isFish 被传入变量进行调用，TypeScript 就可以将这个变量收窄到更具体的类型：

```ts
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim(); // let pet: Fish
} else {
  pet.fly(); // let pet: Bird
}
```

注意这里，TypeScript 并不仅仅知道 if 语句里的 pet 是 Fish 类型，也知道在 else 分支里，pet 是 Bird 类型，毕竟 pet 就两个可能的类型。

你也可以用 isFish 在 Fish | Bird 的数组中，筛选获取只有 Fish 类型的数组：

```ts
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// 在更复杂的例子中，判断式可能需要重复写
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

### 穷尽检查（Exhaustiveness checking）

never 类型可以赋值给任何类型，然而，没有类型可以赋值给 never （除了 never 自身）。这就意味着你可以在 switch 语句中使用 never 来做一个穷尽检查。

举个例子，给 getArea 函数添加一个 default，把 shape 赋值给 never 类型，当出现还没有处理的分支情况时，never 就会发挥作用。

```ts
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

当我们给 Shape 类型添加一个新成员，却没有做对应处理的时候，就会导致一个 TypeScript 错误：

```ts
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```

因为 TypeScript 的收窄特性，执行到 default 的时候，类型被收窄为 Triangle，但因为任何类型都不能赋值给 never 类型，这就会产生一个编译错误。通过这种方式，你就可以确保 getArea 函数总是穷尽了所有 shape 的可能性。

## 函数

### 调用签名（Call Signatures）

在 JavaScript 中，函数除了可以被调用，自己也是可以有属性值的。然而上一节讲到的函数类型表达式并不能支持声明属性，如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名（call signature）。

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 : 而不是 =>。

### 构造签名 （Construct Signatures）

JavaScript 函数也可以使用 new 操作符调用，当被调用的时候，TypeScript 会认为这是一个构造函数(constructors)，因为他们会产生一个新对象。你可以写一个构造签名，方法是在调用签名前面加一个 new 关键词：

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

一些对象，比如 Date 对象，可以直接调用，也可以使用 new 操作符调用，而你可以将调用签名和构造签名合并在一起：

```ts
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

### 泛型函数 （Generic Functions）

我们经常需要写这种函数，即函数的输出类型依赖函数的输入类型，或者两个输入的类型以某种形式相互关联。让我们考虑这样一个函数，它返回数组的第一个元素：

```ts
function firstElement(arr: any[]) {
  return arr[0];
}
```

注意此时函数返回值的类型是 any，如果能返回第一个元素的具体类型就更好了。

在 TypeScript 中，泛型就是被用来描述两个值之间的对应关系。我们需要在函数签名里声明一个类型参数 (type parameter)：

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

通过给函数添加一个类型参数 Type，并且在两个地方使用它，我们就在函数的输入(即数组)和函数的输出(即返回值)之间创建了一个关联。现在当我们调用它，一个更具体的类型就会被判断出来：

```ts
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

### 推断（Inference）

注意在上面的例子中，我们没有明确指定 Type 的类型，类型是被 TypeScript 自动推断出来的。

我们也可以使用多个类型参数，举个例子：

```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

注意在这个例子中，TypeScript 既可以推断出 Input 的类型 （从传入的 string 数组），又可以根据函数表达式的返回值推断出 Output 的类型。

### 约束（Constraints）

有的时候，我们想关联两个值，但只能操作值的一些固定字段，这种情况，我们可以使用**约束（constraint）**对类型参数进行限制

让我们写一个函数，函数返回两个值中更长的那个。为此，我们需要保证传入的值有一个 number 类型的 length 属性。我们使用 extends 语法来约束函数参数：

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

TypeScript 会推断 longest 的返回类型，所以返回值的类型推断在泛型函数里也是适用的。

正是因为我们对 Type 做了 { length: number } 限制，我们才可以被允许获取 a b参数的 .length 属性。没有这个类型约束，我们甚至不能获取这些属性，因为这些值也许是其他类型，并没有 length 属性。

基于传入的参数，longerArray和 longerString 中的类型都被推断出来了。**记住，所谓泛型就是用一个相同类型来关联两个或者更多的值**。

### 泛型约束实战（Working with Constrained Values）

这是一个使用泛型约束常出现的错误

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
    // Type '{ length: number; }' is not assignable to type 'Type'.
    // '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
  }
}
```

这个函数看起来像是没有问题，Type 被 { length: number} 约束，函数返回 Type 或者一个符合约束的值。

而这其中的问题就在于函数理应返回与传入参数相同类型的对象，而不仅仅是符合约束的对象。我们可以写出这样一段反例：

```ts
// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));
```

### 函数重载（Function Overloads）

一些 JavaScript 函数在调用的时候可以传入不同数量和类型的参数。举个例子。你可以写一个函数，返回一个日期类型 Date，这个函数接收一个时间戳（一个参数）或者一个 月/日/年 的格式 (三个参数)。

在 TypeScript 中，我们可以通过写重载签名 (overlaod signatures) 说明一个函数的不同调用方法。 我们需要写一些函数签名 (通常两个或者更多)，然后再写函数体的内容：

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

在这个例子中，我们写了两个函数重载，一个接受一个参数，另外一个接受三个参数。前面两个函数签名被称为重载签名 (overload signatures)。

然后，我们写了一个兼容签名的函数实现，我们称之为实现签名 (implementation signature) ，但这个签名不能被直接调用。尽管我们在函数声明中，在一个必须参数后，声明了两个可选参数，它依然不能被传入两个参数进行调用。

#### 写一个好的函数重载的一些建议

就像泛型一样，也有一些建议提供给你。遵循这些原则，可以让你的函数更方便调用、理解。

让我们设想这样一个函数，该函数返回数组或者字符串的长度

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

这个函数代码功能实现了，也没有什么报错，但我们不能传入一个可能是字符串或者是数组的值，因为 TypeScript 只能一次用一个函数重载处理一次函数调用。

### 其他需要知道的类型（Other Types to Know About）

这里介绍一些也会经常出现的类型。像其他的类型一样，你也可以在任何地方使用它们，但它们经常与函数搭配使用。

#### **void**

这个特殊的类型 object 可以表示任何不是原始类型（primitive）的值 (string、number、bigint、boolean、symbol、null、undefined)。object 不同于空对象类型 { }，也不同于全局类型 Object。很有可能你也用不到 Object。

> object 不同于 Object ，总是用 object!

注意在 JavaScript 中，函数就是对象，他们可以有属性，在他们的原型链上有 Object.prototype，并且 instanceof Object。你可以对函数使用 Object.keys 等等。由于这些原因，在 TypeScript 中，函数也被认为是 object。

#### **unknown**

unknown 类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的：

```ts
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
  // Object is of type 'unknown'.
}
```

有的时候用来描述函数类型，还是蛮有用的。你可以描述一个函数可以接受传入任何值，但是在函数体内又不用到 any 类型的值。

你可以描述一个函数返回一个不知道什么类型的值，比如：

```ts
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

#### **never**

一些函数从来不返回值：

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

never 类型表示一个值不会再被观察到 (observed)。

当 TypeScript 确定在联合类型中已经没有可能是其中的类型的时候，never 类型也会出现：

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

#### **Function**

在 JavaScript，全局类型 Function 描述了 bind、call、apply 等属性，以及其他所有的函数值。

它也有一个特殊的性质，就是 Function 类型的值总是可以被调用，结果会返回 any 类型：

```ts
function doSomething(f: Function) {
  f(1, 2, 3);
}
```

这是一个无类型函数调用 (untyped function call)，这种调用最好被避免，因为它返回的是一个不安全的 any类型。

如果你准备接受一个黑盒的函数，但是又不打算调用它，() => void 会更安全一些。

### 剩余参数（Rest Parameters and Arguments）

#### 剩余参数（Rest Parameters）

除了用可选参数、重载能让函数接收不同数量的函数参数，我们也可以通过使用剩余参数语法（rest parameters），定义一个可以传入数量不受限制的函数参数的函数：

剩余参数必须放在所有参数的最后面，并使用 ... 语法：

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

在 TypeScript 中，剩余参数的类型会被隐式设置为 `any[]` 而不是 `any`，如果你要设置具体的类型，必须是 `Array<T>` 或者 T[]的形式，再或者就是元组类型（tuple type）。

#### 剩余参数（Rest Arguments）

我们可以借助一个使用 ... 语法的数组，为函数提供不定数量的实参。举个例子，数组的 push 方法就可以接受任何数量的实参：

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

注意一般情况下，TypeScript 并不会假定数组是不变的(immutable)，这会导致一些意外的行为：

```ts
// 类型被推断为 number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
// A spread argument must either have a tuple type or be passed to a rest parameter.
```

修复这个问题需要你写一点代码，通常来说, 使用 `as const` 是最直接有效的解决方法：

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

通过 `as const` 语法将其变为只读元组便可以解决这个问题。

注意当你要运行在比较老的环境时，使用剩余参数语法也许需要你开启 `[downlevelIteration]`
