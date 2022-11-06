# vue面试题

## vue响应式原理

### vue2 响应式原理

- Object.defineProperty()来进行数据劫持，针对对象特定属性通过设置getter和setter方法来劫持数据，当读取属性时会触发 getter函数；当view视图层发生变化时，会触发Object.defineProperty()中的setter方法。

### vue3 响应式原理

- Proxy 是针对object类型数据的所有属性都添加get和set方法进行监听，在实现嵌套数据时，更简单，原生支持数组类的监听。

## vue优化方式

1. 减少v-if的活用v-show
2. v-for遍历添加key属性
3. 将组件进行切割(vue的更新是组件粒度的，将耗时任务单独拆分成一组件，父组件数据变化时只会重新渲染父组件，耗时组件并不会渲染，这样性能会更好)
4. 使用keep-alive缓存组件
5. 区分computed和watch
6. 图片资源懒加载
7. 动态加载组件，异步加载组件
8. 使用防抖和节流
9. 开启Gzip压缩
10. 使用cdn缓存

### 图片加载优化

- 减少文件体积大小，减少图片资源请求，
- 预加载

```js
var images = new Array();
function preload() {
  for (var i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
}
preload('1.png', '2.png', '3.png');
```

## MVC 和 MVVM 的区别

- 没有很大的区别，只是 MVC 是单项数据绑定，只绑定了数据，数据更改然后视图跟着渲染，而 MVVM 实现了双向数据绑定，在基础上多了一层视图更改，对应数据绑定也跟着更改。要从 MVC 到 MVVM 其实不难，一个 onchange 事件搞定，所以没有很大区别。

## 怎样理解单项数据流

- 这个概念出现在组件通讯。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收后，由父组件修改。

## vue 生命周期

- onErrorCapture 捕获后代组件传递的错误时调用。
- onActivated 激活时(适用于 keep-alive 缓存的组件)
- onDeactivated 解散时调用(适用于 keep-alive 缓存的组件)

## 父子组件生命周期执行顺序

- 父组件 beforeCreated
- 父组件 created
- 父组件 beforeMounted
- 子组件 beforeCreated
- 子组件 created
- 子组件 beforeMounted
- 子组件 mounted
- 父组件 mounted

### 当父组件引入了mixin之后

- mixin beforeCreated
- 父组件 beforeCreated
- mixin created
- 父组件 created
- mixin beforeMounted
- 父组件 beforeMounted
- 子组件 beforeCreated
- 子组件 created
- 子组件 beforeMounted
- 子组件 mounted
- mixin mounted
- 父组件 mounted

## vue的传值方式

- $emit
- 路由传参
  - query传参(地址栏显示参数)
    - name和path都能用
    - 地址栏会显示参数
  - params传参(地址栏不显示参数)
    - 跳转只能用name ，不能用path
    - 地址栏不显示参数
- vuex
- Eventbus
- localStore
- provide/inject
- $ref
  - this.$refs.children 、 this.$refs.parents

## 导航守卫

- 全局守卫
  - beforeEach (全局前置守卫，路由跳转前触发)
  - beforeResolve (全局解析守卫，在所有组件内守卫和异步组件被解析后触发)
  - afterEach (路由跳转完成后触发)
- 路由守卫
  - beforeEnter (路由独享守卫)
- 组件守卫
  - beforeRouteEnter
  - beforeRouteUpdate
  - beforeRouteLeave

- 参数
  - to 即将要进入的目标路由对象
  - from 即将要离开的路由对象
  - next 是否可以进入某个具体路由，或者是某个具体路由的路径

## 从A页面跳转B页面时的生命周期

- A: beforeRouteLeave (组件守卫)
- beforeEach （全局守卫）
- beforeEnter （路由独享守卫）
- B: beforeRouteEnter （组件守卫）
- beforeResolve （全局解析守卫）
- afterEach （全局守卫）
- B: beforeCreate
- B: created
- B: beforeMount
- A: beforeDestroy
- A: destroyed
- B: mounted

## 路由的两种模式

- hash 模式
- history 模式
- abstract 模式（用来在不支持浏览器API的环境中，充当fallback）

## vue的history和hash的实现原理

- hash是通过 `window.onHashChange()` 事件去监听的
- history 是通过 `window.history.pushState(null,null,path)`（新增历史记录）、`window.history.replaceState(null,null,path)` （替换历史记录）在不进行刷新的情况下，操作浏览器的历史记录

## keep-alive 原理（重要）

- 通过缓存vnode实现，在渲染的时候对比组件的name（通过include和 exclude控制），命中缓存时就从缓存中读取。
- 问题： 使用keep-alive 的时候数据传递过去不会更新
- 会触发 activated deactivated
- 内存超限时通过LRU算法来管理

## nextTick 原理（重要）

- 在修改数据时，会开启一个异步队列，将watcher的update 更新操作缓存在同一事件循环中，同一个watcher只会被推入队列一次（通过watcherId去重），然后再下一事件循环中刷新队列，执行代码，这样做能减少频繁不必要的更新，提升更新渲染效率。
- 原理： nextTick 内部通过一系列异步api尝试将回调函数放在异步队列里， 包括 promise、mutationObserver、setImmediate、setTimeout。
- 所有的回调方法都会放在callbacks数组里，最后通过flushCallbacks 方法遍历 callbacks数组来依次执行回调。
- vue的dom更新是异步的，本身也是使用的 nextTick。

### nextTick 使用场景（重要）

- 获取数据更新后的dom
- 在created中进行dom操作
- 获取元素的宽高

## vue 模板编译过程（重要）

- 将模板编译为抽象语法树 AST(多叉树)，将AST转化为渲染函数，执行渲染函数生成VDOM,将VDOM映射为真实DOM。

## computed 和 watch 的区别

- 计算属性是自动监听依赖值得变化，而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。
- 所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，采用 watch，用反或混用虽然可行，但都是不正确的用法。

## mixins合并规则

合并规则：data数据和methods之类的对象类型的值会遍历合并，冲突时以组件内优先；钩子函数合并时都会执行，先执行mixins里的。

## Vue.extend()

- 用于拓展组件生成一个构造器，通过new构造函数生成一个新的组件实例，类似组件继承。（在vue3.0里废弃了）。

## Vue.use()

- 实际调用了该插件的install方法，当引入的插件有install时需要调用。

## Suspense 组件

- 作用： 可以在组件树上层等待下层的多个嵌套异步依赖项时，渲染一个加载状态 通过 #fallback 的形式。

## teleport

- 作用： 将组件内部的一部分模板“传送”到该组件dom结构的最外层。

### vue中的插槽

- 具名插槽

```html
// 组件
<slot name="default" />

<template v-slot:default> </template>
// 或者
<template #default> </template>

```

- 作用域插槽

```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>


<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

```

### $attrs 和 $listeners

- 透传 Attributes 是指由父组件传入，且没有被子组件声明为 props 或是组件自定义事件的 attributes 和事件处理函数。
- 你可以通过 inheritAttrs: false 来禁用这个默认行为。

### watch 和 watchEffect的区别

- watch 需要传入侦听的数据源。而watchEffect是自动收集数据源作为依赖
- watchEffect 在初始化时就会执行一次。而 watch的话，只有设置了 `immediate: true` 时，才会在初始化时监听。

## watchEffect

- 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
- 设置 flush: post 将会使侦听器延迟到组件渲染后执行。
- 返回值是一个用来停止该副作用的函数。

```js
// 副作用清除
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` 会在 `id` 更改时调用
  // 以便取消之前
  // 未完成的请求
  onCleanup(cancel)
  data.value = await response
})

// 停止侦听器
const stop = watchEffect(() => {})

//当不需要此侦听器时：
stop()

```
## 父组件可不可以监听子组件的生命周期

1. 使用$emit 去监听

```html

<!-- 父组件 -->
<template>
  <div>
    <child-component @mounted="handleDoSomething"></child-component>
  </div>
</template>
<script>
export default Vue.component("HelloWorld", {
 ...
  methods:{
    handleDoSomething(data){
      console.log('监听到子组件生命周期钩子函数mounted时，触发该回调',data)
    }
  },
  components:{
    "child-component":ChildComponent
  }
});
</script>

<!-- 子组件 -->
<script>
export default {
   ...
    mounted(){
        this.$emit('mounted','mounted 触发了')
    },
}
</script>
```

2. 使用@hook （原理：就是父子组件通信的基础上（方法1），添加@hook，形成了对应生命周期函数的自动发布，方法1每次都是手动执行发布）
	- @hook 使用场景：通过监听子组件的生命周期函数来处理业务，例如监听子组件loading，数据渲染到页面的之前让页面 loading。mounted 之后停止 loading。beforeUpdata 时开始 loading。updatad 之后停止 loading

```html
<!-- 父组件 -->
<template>
  <div>
    <child-component @hook:mounted="handleDoSomething"></child-component>
  </div>
</template>
<script>
export default Vue.component("HelloWorld", {
 ...
  methods:{
    handleDoSomething(data){
      console.log('监听到子组件生命周期钩子函数mounted时，触发该回调',data)
    }
  },
  components:{
    "child-component":ChildComponent
  }
});
</script>

<!-- 子组件 -->
<script>
  export default {
    mounted() {
      const timer = setInterval(() => { ... }, 1000);
      this.$once('hook:beforeDestroy', () => clearInterval(timer);)
    }
  };
</script>
```

## vue 中的自定义指令

### 指令的生命周期

- created （在绑定元素的 attribute 前  或事件监听器应用前调用）
- beforeMount （在元素被插入到 DOM 前调用）
- mounted [vue3常用]（在绑定元素的父组件及他自己的所有子节点都挂载完成后调用）
- beforeUpdate （绑定元素的父组件更新前调用）
- updated （在绑定元素的父组件，及他自己的所有子节点都更新后调用）
- beforeUnmount （绑定元素的父组件卸载前调用）
- unmounted（绑定元素的父组件卸载后调用）

### mounted或inserted参数
- el （指令绑定到的元素。这可以用于直接操作 DOM）
- binding 值
	- value （传递给指令的值）
	- oldValue （之前的值）
	- arg（传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。）
- vnode （代表绑定元素的底层 VNode）

### vue.directive('指令', {}) 使用场景
- 输入框自动聚焦
- 下拉菜单(点击下拉菜单区域外时，隐藏菜单)
- 相对时间转换
- 按钮级权限授权

### 输入框自动聚焦

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
<input v-focus>

```

### 下拉菜单

> 点击下拉菜单本身不会隐藏菜单
> 点击下拉菜单以外的区域隐藏菜单

```js
Vue.directive('clickoutside', {
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
       return false
      }

      if (binding.expression) {
        binding.value(e)
      }
    }

    el.__vueMenuHandler__ = documentHandler
    document.addEventListener('click', el.__vueMenuHandler__)
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueMenuHandler__)
    delete el.__vueMenuHandler__
  }
})

new Vue({
  el: '#app',
  data: {
    show: false
  },
  methods: {
    handleHide() {
      this.show = false
    }
  }
})
<div class="main" v-menu="handleHide">
  <button @click="show = !show">点击显示下拉菜单</button>
  <div class="dropdown" v-show="show">
    <div class="item"><a href="#">选项 1</a></div>
    <div class="item"><a href="#">选项 2</a></div>
    <div class="item"><a href="#">选项 3</a></div>
  </div>
</div>

```

### 相对时间转换

> 类似微博、朋友圈发布动态后的相对时间，比如刚刚、两分钟前等等

```js
<span v-relativeTime="time"></span>
new Vue({
  el: '#app',
  data: {
    time: 1565753400000
  }
})

Vue.directive('relativeTime', {
  bind(el, binding) {
    // Time.getFormatTime() 方法，自行补充
    el.innerHTML = Time.getFormatTime(binding.value)
    el.__timeout__ = setInterval(() => {
      el.innerHTML = Time.getFormatTime(binding.value)
    }, 6000)
  },
  unbind(el) {
    clearInterval(el.innerHTML)
    delete el.__timeout__
  }
})

```
### vue按钮级权限怎么去做？

- 可以使用 vue的自定义指令去做。

>  封装 permissions.js 文件，设置全局的自定义指令
```js
// 封装 permissions.js 文件，设置全局的自定义指令
import Vue from 'vue';
// 检测是否有权限
// 使用Vue.directive声明自定义指令btn-key
export const buttonPermissions = Vue.directive('btn-key',{
    /**
     * inserted：被绑定元素插入父节点时调用
     * el：指令所绑定的元素，可以用来直接操作 DOM
     * binding.value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
     */
    inserted(el,binding){
        let buttonKey = binding.value;
        // 代表某个元素需要通过权限验证
        if(buttonKey){
            let key = checkKey(buttonKey)
            if(!key){//没有权限
                el.remove()  //删除按钮
            }
        }else{
            throw new Error('缺少唯一指令')
        }
    },
})

// 检测传入的元素key是否可以显示
function checkKey(key) {
    // 获取权限数组
    let permissionData = sessionStorage.getItem("permissionData") ? sessionStorage.getItem("permissionData") : [] ;
    //如果传入的元素key不在权限数组里，则不可显示
    let index = permissionData.indexOf(key)
    if(index > -1) {
        return true;
    }else{
        return false;
    }
}

```

> 在main.js 中去挂载

```js
import {buttonPermissions} from './common/permissions'

```

## 在 Vue 中怎么检测数组变化？

- vue 重写了这几个方法， push pop shift unshift sort reserve splice
- this.$set

## 在什么场景下会用到 slot

- 频繁的替换或更新时，可以使用 slot
- slot 相当于传递了一个组件给子组件

## Vue 的缺点

- 首页白屏的情况
- 为什么会有这种情况？
  - Vue 在启动应用时，Vue 会对组件中的 data 和 computed 中状态值通过 Object.defineProperty 方法转化成 set,get 访问属性， 以便对数据变化进行监听。这一过程都是在启动应用时完成的，这也势必导致页面启动阶段比非 JS 驱动（如 jQuery 应用）的页面要慢一些

## Vue 怎么封装一个复用性比较高的组件

> 封装：求同存异

- 相同部分, 封装在一起
- 不同部分
  - 有两种方式:
    - 当不同部分变化的种类比较多时： 1.由外部来处理，可以通过插槽的方式，将不同的部分插入进去。
    - 当种类只有固定的几种时： 2.由内部来处理；写一个方法，将种类传进来 ，通过 v-if 的形式判断，渲染其中的一种，

## vue2中为什么 Vue.use 要在 new Vue()之前调用

- 在new Vue(options)时首先会执行this._init进行初始化，将Vue上的属性和options进行合并，然后在进行事件、生命周期等的初始化。beforeCreate,created生命周期的hook函数也是在这里进行调用

- 如果Vue.use在new Vue()之后执行，this._init()时你使用的插件的内容还没有添加到Vue.options.components、Vue.options.directives、Vue.options.filters等属性中。所以新初始化的Vue实例中也就没有插件内容 Vue.prototype._init 中合并 options

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
    let startTag, endTag
    ...
    vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
     ...
     // 挂载到dom上
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}

//如果Vue.use在new Vue()之后执行，this._init()时你使用的插件的内容还没有添加到Vue.options.components、Vue.options.directives、Vue.options.filters等属性中。所以新初始化的Vue实例中也就没有插件内容
```

### 封装的公共样式 Less

- 将变量提取为 variable.less 文件。将通用颜色挂载写入， 并通过 webpack 挂载到全局 `style-resources-loader`
- 封装 单行溢出，多行溢出，1px 问题
- 设置一些通用的东西，去掉浏览器默认样式等

## 为什么 vue3 的打包体积比 vue2.x 的小了很多？

- 有一部分原因是 tree shaking,删除了一部分全局的方法
- vue 将功能进行模块化， 在需要的时候去引入它

- 全局的 API tree shaking
  - 受到影响的 API
    - nextTick
    - observable(用 Vue.reactive 替换)
    - version
    - compile
    - set
    - delete
  - vue3 中所有的组件都是按需加载的，你想用某个组件 比如 nextTick,ref,toRefs, watch, computed 等 , 都是可以按需加载的。
- composition api
  - ref 接受一个内布置并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值得单个 property `value`
  - reactive 返回的是一个对象的响应式副本，直接就可以读取。
  - toRefs 可以将解构的数据转化成响应式
  - reactive + toRefs 形式，可以转化为跟 vue2.x 相似的写法
  - isRef 判断当前值是否是一个 Ref 对象
- proxy

## 在升级过程中 vue ，有的第三方库有没有遇到过什么问题？

- vue-count-to 这个第三方库不支持 ，需要将插件下载下来，手动更改一下 将 beforeDestory 修改为 beforeUnmount


## Vue3 和 vue2.62 的区别有哪些？

- 数据响应式的区别：vue3 使用 proxy，vue2 使用的是 Object.defaineProperty()
- 全局的 API 重构为 可以按需引入的实例
- 插件的安装方式不太一样，vue3 是要 createApp(App) 之后才可以 use 插件。而 vue2.x 通过 Vue.use() 就可以安装插件了。
- 一些普通的更改和一些不兼容语法的更改。
  - 比如生命周期的重命名
  - router 中写法的更改
  - v-model 的更改
  - composition API 的新增 setup()
  - style 标签中 vars 的添加

> 数据绑定的区别， vue2 使用的是 Object.defineProperty() ,Vue3 使用的是 Proxy 代理

### 样式中的 /deep/ 变成了 ::deep

- 样式中增加了 vars

```html
<script>
export default {
  data() {
    return {
      color: 'red'
    };
  }
};
</script>

<style vars="{ color }">
.text {
  color: var(--color);
}
</style>
```

### main.js 中的区别

```js
import App from './App.vue';
const app = createApp(App);
/**
 * 1.不能通过 vue.prototype 挂载全局属性
 *  如果想要在vue3中挂载全局属性，可以通过 app.config.globalProperties.$axios = axios 进行挂载全局属性， 官方不推荐挂载全局的属性
 *
 * 2. 创建方式不一样
 *  vue2中创建实例的方式： new Vue({}), vue 2可以在实例化之前去 .use() 使用vue插件
 *  在vue3中创建实例 const app = createApp(App),  vue3中 你必须先 createApp() 之后 ，才可以去.use() vue 的插件
 */
```

### router 中的差别

```js
// ========= 区别 1 ==========
// vue 2中的router
import Vue from  'vue'
import Router from 'vue-router'
export const constantRoutes = []
const createRouter = () =>
  new Router({
    mode: 'history'
    routes: constantRoutes
  })
export default createRouter

// vue3中的router
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = []
const router = new createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router

// ========= 区别 2 ==========
// *匹配所有页面的微小差别
// vue2中匹配所以页面的写法
const routes = [
  {
    path:'*',
    redirect: '/404',
    hidden: true
  }
]

// vue3中匹配所有页面的写法
const routes = [
  {
    path:'/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

```

### 异步组件的使用(defineAsyncComponent)新增

```js
// vue2中的异步组件
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    });
  }, 1000);
});
// 一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve);
});

// 可以在工厂函数中返回一个promise
Vue.component('async-webpack-example', () => import('./my-async-component'));

// 组件局部使用的时候
new Vue({
  components: {
    'my-component': () => import('./my-async-component')
  }
});

// vue3的异步组件
// defineAsyncComponent 方法可以接收一个对象，加载成功的时候的组件，正在加载时的组件和加载失败时候的组件，还有一些配置
import { defineAsyncComponent } from 'vue';
export default {
  components: {
    toolBox: defineAsyncComponent(() => import('./components/toolbox'))
  }
};
```

### 新增 Suspense 组件

```html
<template>
  <Suspense>
    // 正常结果的组件
    <template #default>
      <async-comp />
    </template>

    // 还没有请求完成时显示的组件
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import { onErrorCaptrued } from 'vue';
export default {
  name: 'App',
  setup() {
    // 可以捕获异常的钩子函数
    onErrorCaptured((error) => {
      console.log(error);
    });
  }
};
</script>

// 异步组件
<template>
  <div>
    这是个异步组件,结果为
    {{ result }}
  </div>
</template>

<script>
export default {
  async setup() {
    const resData = await getData();
    console.log(res);

    return { result: resData.data };
  }
};
</script>
```



### 新增 Teleport 组件

> 可以将组件挂载在 DOM 的任何地方

```js
// index.html
<div id="model"></div>


// 在组件中使用 有一个to属性
<teleport to="#model">
  <model-component />
</teleport>
```

### 插槽的区别

> vue3 中只保留了两种插槽，修改了 slot-scoped, 一种是具名插槽， 一种是带作用域的插槽

- 注意点
  - 默认插槽的缩写语法不能和具名插槽混用，这样会导致作用域不明确。

```html

// =========== 方式一 (具名插槽) ============
// 设置具名插槽
<template>
  <slot name="header">
</template>

// 使用插槽
<template>
  //  使用 v-slot:header 或使用简写 #header
  <template #header>
  </template>
</template>

// =========== 方式二 (作用域插槽) ============
// 设置作用域插槽(可以拿到插槽内的数据去渲染)
<template>
  <div v-for="item in items">
    <slot name="header" :item="item">
  </div>
</template>

// 使用插槽, 点后面的属性跟的是自定义属性
<template>
  <template #header="slotProps">
    {{ slotProps.item }}
  </template>
</template>

// =========== 如果只有一个默认插槽的时候 ============


// 使用
<template>
  <div v-slot="slotProps">
    // 要插入的内容
  </div>
</template>

```

### Proxy 和 Object.defineProperty()的区别

- Proxy 代理的是整个对象，Object.defineProperty 只代理对象中的某一个属性
- 对象上定义新属性时，Proxy 可以监听到，Object.defineProperty 监听不到
- 数组上新增删除修改时，Proxy 可以监听到， Object.defineProperty 监听不到
- Proxy 不兼容 IE， Object.defineProperty 不兼容 IE8 及以下
