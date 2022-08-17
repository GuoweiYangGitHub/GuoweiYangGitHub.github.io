# 泛型（Generics）

软件工程的一个重要部分就是构建组件，组件不仅需要有定义良好和一致的 API，也需要是可复用的（reusable）。好的组件不仅能够兼容今天的数据类型，也能适用于未来可能出现的数据类型，这在构建大型软件系统时会给你最大的灵活度。

在比如 C# 和 Java 语言中，用来创建可复用组件的工具，我们称之为泛型（generics）。利用泛型，我们可以创建一个支持众多类型的组件，这让用户可以使用自己的类型消费（consume）这些组件。

## 使用泛型类型变量（Working with Generic Type Variables）

当你创建类似于 `identity` 这样的泛型函数时，你会发现，编译器会强制你在函数体内，正确的使用这些类型参数。这就意味着，你必须认真的对待这些参数，考虑到他们可能是任何一个，甚至是所有的类型（比如用了联合类型）。

让我们以 identity 函数为例：

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

假设这个函数，使用的是 Type 类型的数组而不是 Type。因为我们使用的是数组，.length 属性肯定存在。我们就可以像创建其他类型的数组一样写。

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

你可以这样理解 `loggingIdentity` 的类型：泛型函数 `loggingIdentity` 接受一个 Type 类型参数和一个实参 arg，实参 arg 是一个 Type 类型的数组。而该函数返回一个 Type 类型的数组。

如果我们传入的是一个全是数字类型的数组，我们的返回值同样是一个全是数字类型的数组，因为 Type 会被当成 number 传入。

现在我们使用类型变量 Type，是作为我们使用的类型的一部分，而不是之前的一整个类型，这会给我们更大的自由度。

我们也可以这样写这个例子，效果是一样的：

```ts
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

## 泛型类型 (Generic Types)

泛型函数的形式就跟其他非泛型函数的一样，都需要先列一个类型参数列表，这有点像函数声明：

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

泛型的类型参数可以使用不同的名字，只要数量和使用方式上一致即可：

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Input>(arg: Input) => Input = identity;
```

我们也可以以对象类型的调用签名的形式，书写这个泛型类型：

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

这可以引导我们写出第一个泛型接口，让我们使用上个例子中的对象字面量，然后把它的代码移动到接口里：

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

有的时候，我们会希望将泛型参数作为整个接口的参数，这可以让我们清楚的知道传入的是什么参数 (举个例子：`Dictionary<string>` 而不是 `Dictionary`)。而且接口里其他的成员也可以看到。

```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

注意在这个例子里，我们只做了少许改动。不再描述一个泛型函数，而是将一个非泛型函数签名，作为泛型类型的一部分。

现在当我们使用 GenericIdentityFn 的时候，需要明确给出参数的类型。(在这个例子中，是 number)，有效的锁定了调用签名使用的类型

当要描述一个包含泛型的类型时，理解什么时候把类型参数放在调用签名里，什么时候把它放在接口里是很有用的。

除了泛型接口之外，我们也可以创建泛型类。注意，不可能创建泛型枚举类型和泛型命名空间。

## 泛型类（Generic Classes）

泛型类写法上类似于泛型接口。在类名后面，使用尖括号中 <> 包裹住类型参数列表：

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

在这个例子中，并没有限制你只能使用 number 类型。我们也可以使用 string 甚至更复杂的类型：

```ts
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

就像接口一样，把类型参数放在类上，可以确保类中的所有属性都使用了相同的类型。

正如我们在 Class 章节提过的，一个类它的类型有两部分：静态部分和实例部分。泛型类仅仅对实例部分生效，所以当我们使用类的时候，注意静态成员并不能使用类型参数。

## 泛型约束（Generic Constraints）

在早一点的 loggingIdentity 例子中，我们想要获取参数 arg 的 .length 属性，但是编译器并不能证明每种类型都有 .length 属性，所以它会提示错误：

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

相比于能兼容任何类型，我们更愿意约束这个函数，让它只能使用带有 .length 属性的类型。只要类型有这个成员，我们就允许使用它，但必须至少要有这个成员。为此，我们需要列出对 Type 约束中的必要条件。

为此，我们需要创建一个接口，用来描述约束。这里，我们创建了一个只有 .length 属性的接口，然后我们使用这个接口和 extends 关键词实现了约束：

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

现在这个泛型函数被约束了，它不再适用于所有类型：

```ts
loggingIdentity(3);
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
```

我们需要传入符合约束条件的值：

```ts
loggingIdentity({ length: 10, value: 3 });
```

## 在泛型约束中使用类型参数（Using Type Parameters in Generic Constraints）

你可以声明一个类型参数，这个类型参数被其他类型参数约束。

举个例子，我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 obj 上不存在的属性。所以我们在两个类型之间建立一个约束：

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");

// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

## 在泛型中使用类类型（Using Class Types in Generics）

在 TypeScript 中，当使用工厂模式创建实例的时候，有必要通过他们的构造函数推断出类的类型，举个例子：

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

下面是一个更复杂的例子，使用原型属性推断和约束，构造函数和类实例的关系

```ts
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```
