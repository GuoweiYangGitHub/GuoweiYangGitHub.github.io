# 关于typescript笔记

## 小知识点

### `keyof` 操作符 返回的类型

- keyof 操作符返回的类型 `string | number | symbol`

### 模板字面量返回的类型

- `string | number | bigint | boolean | null | undefined`

### `Exclude` 排除某种类型

```ts
// 排除 Type中的symbol类型
type PropEventSource<Type> = {
    on(eventName: `${Exclude<keyof Type, symbol>}Changed`, callback: (newValue: any) => void): void;
};
```

### `Extract` 提取某个类型

```ts
// 从Type中提取string类型
type PropEventSource<Type> = {
     on(eventName: `${Extract<keyof Type, string>}Changed`, callback: (newValue: any) => void): void;
};
```

## 工具类型

### `Partial<Type>`

- 用于构造一个Type下面的所有属性都设置为可选的类型，这个工具类型会返回代表给定的一个类型的子集的类型。

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});


// fieldsToUpdate 可以是Todo类型中的部分属性
```

### `Record<Keys, Type>`

- 用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型。这个工具类型可以被用于映射一个类型的属性到另一个类型。

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
// const cats: Record<CatName, CatInfo>
```

### `Pick<Type, Keys>`

- 用于构造一个类型，它是从Type类型里面挑了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;
// const todo: TodoPreview
```

### `Omit<Type, Keys>`

- 用于构造一个类型，它是从Type类型里面过滤了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

// todo;

const todo: TodoPreview

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

todoInfo;
// const todoInfo: TodoInfo
```

### `Exclude<UnionType, ExcludedMembers>`

- 用于构造一个类型，它是从`UnionType`联合类型里面排除了所有可以赋给`ExcludedMembers`的类型。

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number

```

### `Extract<Type, Union>`

- 用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>;
// type T1 = () => void
```

### `NonNullable<Type>`

- 用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型。

```ts
type T0 = NonNullable<string | number | undefined>;
// type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>;
// type T1 = string[]
```

### `Parameters<Type>`

- 用于根据所有Type中函数类型的参数构造一个元祖类型。

```ts
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
// type T0 = []

type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
// type T2 = [arg: unknown]

type T3 = Parameters<typeof f1>;
// type T3 = [arg: {
//    a: number;
//    b: string;
// }]
type T4 = Parameters<any>;
// type T4 = unknown[]

type T5 = Parameters<never>;
// type T5 = never

type T6 = Parameters<string>;
// TypeError: Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = never

type T7 = Parameters<Function>;
// TypeError: Type 'Function' does not satisfy the constraint '(...args: any) => any'. Type 'Function' provides no match for the signature '(...args: any): any'.
// type T7 = never
```

### `ConstructorParameters<Type>`

- 用于根据Type构造函数类型来构造一个元祖或数组类型，它产生一个带着所有参数类型的元组（或者返回never如果Type不是一个函数）。

```ts
type T0 = ConstructorParameters<ErrorConstructor>;
// type T0 = [message?: string]

type T1 = ConstructorParameters<FunctionConstructor>;
// type T1 = string[]

type T2 = ConstructorParameters<RegExpConstructor>;
// type T2 = [pattern: string | RegExp, flags?: string]

type T3 = ConstructorParameters<any>;
// type T3 = unknown[]

type T4 = ConstructorParameters<Function>;
// TypeError: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'. Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = never
```

### `ReturnType<Type>`

- 用于构造一个含有Type函数的返回值的类型。

```ts
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
// type T0 = string

type T1 = ReturnType<(s: string) => void>;
// type T1 = void

type T2 = ReturnType<<T>() => T>;
// type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
// type T3 = number[]

type T4 = ReturnType<typeof f1>;
// type T4 = {
//    a: number;
//    b: string;
// }

type T5 = ReturnType<any>;
// type T5 = any

type T6 = ReturnType<never>;
// type T6 = never

type T7 = ReturnType<string>;
// TypeError: Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T7 = any

type T8 = ReturnType<Function>;
// TypeError: Type 'Function' does not satisfy the constraint '(...args: any) => any'. Type 'Function' provides no match for the signature '(...args: any): any'.
// type T8 = any
```

### `InstanceType<Type>`

- 用于构造一个由所有Type的构造函数的实例类型组成的类型。

```ts
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;
// type T0 = C

type T1 = InstanceType<any>;
// type T1 = any

type T2 = InstanceType<never>;
// type T2 = never

type T3 = InstanceType<string>;
// TypeError: Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
// type T3 = any

type T4 = InstanceType<Function>;
// TypeError: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'. Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = any
```

### `ThisParameterType<Type>`

- 用于提取一个函数类型Type的this (opens new window)参数类型，返回unknown (opens new window)如果这个函数类型没有this参数。

```ts
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

### `OmitThisParameter<Type>`

- 用于移除一个函数类型Type的this (opens new window)参数类型。如果Type没有明确的声明this 类型，那么这个返回的结果就是Type，不然的话，就返回一个新的函数类型，基于Type，但不再有this参数。范型会被抹去，只有最后重载的签名被传播进了返回的新的函数类型。

```ts
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());

```

### `ThisType<Type>`

- 这个类型不返回一个转换过的类型，它被用作标记一个上下文的this类型。注意下如果想使用这个工具类型，`noImplicitThis (opens new window)`的flag必须启用。

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

```

- 在上面的例子中，makeObject函数的参数重methods对象有上下文的类型包含了`ThisType<D & M>`，因此methods方法中的this类型是`{ x: number, y: number } & { moveBy(dx: number, dy: number): number }`。注意methods的类型是怎么同时成为一个接口的目标和方法中this类型的源。

- `ThisType<T>`标记的接口是一个生命在`lib.d.ts`中的简单的空接口。除了被认为是一个对象字面量的上下文类型，这个接口表现得就像一个空接口。
