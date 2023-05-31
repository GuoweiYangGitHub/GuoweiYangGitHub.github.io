(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{650:function(t,s,a){"use strict";a.r(s);var e=a(7),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"react面试题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react面试题"}},[t._v("#")]),t._v(" React面试题")]),t._v(" "),a("h2",{attrs:{id:"组件通信"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件通信"}},[t._v("#")]),t._v(" 组件通信")]),t._v(" "),a("ul",[a("li",[t._v("父传子: props；")]),t._v(" "),a("li",[t._v("子传父: 子调用父组件中的函数并传参；")]),t._v(" "),a("li",[t._v("兄弟: 利用redux实现和利用父组件。")])]),t._v(" "),a("h2",{attrs:{id:"diff算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#diff算法"}},[t._v("#")]),t._v(" diff算法")]),t._v(" "),a("ul",[a("li",[t._v("diff算法的本质: 就是找出两个对象之间的差异，目的是尽可能做到节点复用。")]),t._v(" "),a("li",[t._v("上述中的对象:指的其实就是vue中的virtual dom（虚拟dom树），即使用js对象来表示页面中的dom结构。")])]),t._v(" "),a("p",[t._v("三个层级策略:\n1、tree层级：dom节点跨层级的移动操作特别少，可以将其忽略不计。\n2、component层级：拥有相同类的两个组件会生成类似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。\n3、element层级：对于同一层级的一组子节点，可以通过唯一key进行区分。")]),t._v(" "),a("h2",{attrs:{id:"高阶组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#高阶组件"}},[t._v("#")]),t._v(" 高阶组件")]),t._v(" "),a("ul",[a("li",[t._v("高阶组件就是一个函数，且该函数接收一个组件作为参数，并返回一个新的组件。")])]),t._v(" "),a("h2",{attrs:{id:"常用的hooks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用的hooks"}},[t._v("#")]),t._v(" 常用的hooks")]),t._v(" "),a("ul",[a("li",[t._v("seState: 设置和改变state，代替原来的state和setState")]),t._v(" "),a("li",[t._v("useEffect: 代替原来的生命周期，componentDidMount，componentDidUpdate 和 componentWillUnmount 的合并版")]),t._v(" "),a("li",[t._v("useLayoutEffect: 与 useEffect 作用相同，但它会同步调用 effect")]),t._v(" "),a("li",[t._v("useMemo: 缓存的是计算结果。")]),t._v(" "),a("li",[t._v("useCallback: 缓存的是函数。")]),t._v(" "),a("li",[t._v("useRef: 跟以前的ref，一样，只是更简洁了")])]),t._v(" "),a("h3",{attrs:{id:"usecallback和usememo的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usecallback和usememo的区别"}},[t._v("#")]),t._v(" useCallback和useMemo的区别")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("useMemo")]),t._v(" "),a("strong",[t._v("缓存的是计算结果(值)")]),t._v("。在"),a("strong",[t._v("组件发生更新重新渲染时，会采用已有的缓存结果，而不是重新进行计算")]),t._v("，从而达到性能优化的效果。")]),t._v(" "),a("li",[a("code",[t._v("useCallback")]),t._v(" "),a("strong",[t._v("缓存的是函数")]),t._v("。因为"),a("strong",[t._v("函数式组件每次任何一个state的变化 整个组件都会被重新刷新")]),t._v("，一些函数是没有必要重新刷新的，此时就应该缓存起来，提高性能和减少资源浪费。（利用缓存函数，使子组件不会重新渲染）")])]),t._v(" "),a("h3",{attrs:{id:"清除useeffect中的副作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#清除useeffect中的副作用"}},[t._v("#")]),t._v(" 清除useEffect中的副作用")]),t._v(" "),a("blockquote",[a("p",[t._v("在useEffect中 return 出一个函数，在函数中写清除副作用的内容")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useEffect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" timeId "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 清除函数副作用")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clearInterval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timeId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("h3",{attrs:{id:"hooks优势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hooks优势"}},[t._v("#")]),t._v(" hooks优势")]),t._v(" "),a("ol",[a("li",[t._v("函数组件无this问题")]),t._v(" "),a("li",[t._v("自定义Hooks方便状态复用")]),t._v(" "),a("li",[t._v("副作用关注点分离。")])]),t._v(" "),a("h2",{attrs:{id:"redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redux"}},[t._v("#")]),t._v(" redux")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("核心概念:")]),t._v(" "),a("ul",[a("li",[t._v("store、action、reducer")])])]),t._v(" "),a("li",[a("p",[t._v("关键函数:")]),t._v(" "),a("ul",[a("li",[t._v("getState() ：用于获取当前最新的状态")]),t._v(" "),a("li",[t._v("subscribe() ：用于订阅监听当前状态的变化，然后促使页面重新渲染")]),t._v(" "),a("li",[t._v("dispatch() ：用于发布最新的状态")])])]),t._v(" "),a("li",[a("p",[t._v("执行流程:")]),t._v(" "),a("ul",[a("li",[t._v("（1）用户通过事件触发ActionCreator制造action")]),t._v(" "),a("li",[t._v("（2）同时，用户触发的事件内调用dispatch来派发action")]),t._v(" "),a("li",[t._v("（3）reducer接收action，并处理state返回newState")]),t._v(" "),a("li",[t._v("（4）View层通过 getState() 来接收newState并重新渲染视图层")])])])])])}),[],!1,null,null,null);s.default=n.exports}}]);