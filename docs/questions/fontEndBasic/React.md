# React面试题

## 组件通信

- 父传子: props；
- 子传父: 子调用父组件中的函数并传参；
- 兄弟: 利用redux实现和利用父组件。

## diff算法

- diff算法的本质: 就是找出两个对象之间的差异，目的是尽可能做到节点复用。
- 上述中的对象:指的其实就是vue中的virtual dom（虚拟dom树），即使用js对象来表示页面中的dom结构。

三个层级策略:
1、tree层级：dom节点跨层级的移动操作特别少，可以将其忽略不计。
2、component层级：拥有相同类的两个组件会生成类似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3、element层级：对于同一层级的一组子节点，可以通过唯一key进行区分。

## 高阶组件

- 高阶组件就是一个函数，且该函数接收一个组件作为参数，并返回一个新的组件。

## 常用的hooks

- seState: 设置和改变state，代替原来的state和setState
- useEffect: 代替原来的生命周期，componentDidMount，componentDidUpdate 和 componentWillUnmount 的合并版
- useLayoutEffect: 与 useEffect 作用相同，但它会同步调用 effect
- useMemo: 缓存的是计算结果。
- useCallback: 缓存的是函数。
- useRef: 跟以前的ref，一样，只是更简洁了

### useCallback和useMemo的区别

- `useMemo` **缓存的是计算结果(值)**。在**组件发生更新重新渲染时，会采用已有的缓存结果，而不是重新进行计算**，从而达到性能优化的效果。
- `useCallback` **缓存的是函数**。因为**函数式组件每次任何一个state的变化 整个组件都会被重新刷新**，一些函数是没有必要重新刷新的，此时就应该缓存起来，提高性能和减少资源浪费。（利用缓存函数，使子组件不会重新渲染）

### hooks优势

1. 函数组件无this问题
2. 自定义Hooks方便状态复用
3. 副作用关注点分离。

## redux

- 核心概念:
  - store、action、reducer

- 关键函数:
  - getState() ：用于获取当前最新的状态
  - subscribe() ：用于订阅监听当前状态的变化，然后促使页面重新渲染
  - dispatch() ：用于发布最新的状态

- 执行流程:
  - （1）用户通过事件触发ActionCreator制造action
  - （2）同时，用户触发的事件内调用dispatch来派发action
  - （3）reducer接收action，并处理state返回newState
  - （4）View层通过 getState() 来接收newState并重新渲染视图层
