# vue3 笔记

## 生命周期

| 生命周期 | 说明 |
| :------: | :----- |
| `onMounted()` | 注册一个回调函数，在组件挂载完成后执行。 |
| `onUpdated()` | 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。 |
| `onUnMounted()` | 注册一个回调函数，在组件实例被卸载之后调用。 |
| `onBeforeMount()` | 注册一个钩子，在组件被挂载之前被调用。 |
| `onBeforeUpdate()` | 注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。 |
| `onBeforeUnmount()` | 注册一个钩子，在组件实例被卸载之前调用。 |
| `onErrorCaptured()` | 注册一个钩子，在捕获了后代组件传递的错误时调用。 |
| `onRenderTracked()` | 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。(内测中，还不是正式版 这个钩子仅在开发模式下可用) |
| `onRenderTriggered()` | 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。(内测中，还不是正式版 这个钩子仅在开发模式下可用) |
| `onActivated()` | 注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被插入到 DOM 中时调用。 |
| `onDeactivated()` | 注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。 |
| `onServerPrefetch()` | 注册一个异步函数，在组件实例在服务器上被渲染之前调用。(只有在ssr时才有) |

## reactive

### 赋值方式

```js
let react = reactive({
  a:1
})

Object.assign(react, {b:2})
// {a:1,b:2}

// or

Object.assign(react, {a:3})
// {a:3}
```

### 删除属性

```js
const a = ref({})
a.value = {}
```

## ref

### 赋值方式

```js
let a = ref({})

a.value = {c:1}
```

### 删除属性

```js
const a = shallowRef({})
const b = reactive({})

b=reactive({}) // 报错

// 如果要清空的话则需要遍历

//假设b这个变量中有很多属性，则需要遍历
Object.keys(b).forEach(key=>delete b[key])
```

## style `v-bind` 形式

- style v-bind可能很多人不熟悉，我把这称之为vue对css变量的hack。

```html
<template>
  <p>123</p>
</template>
<script setup>
  const pcolor = ref('#000')
</script>
<style scoped>
  p {
  color:v-bind('pcolor')
  }
</style>
```

- 注意：在某些情况下的伪元素中的content属性似乎不生效。

```html
<template>
  <div>
    <p>123</p>
    <p>123</p>
    <p>123</p>
    <p>123</p>
  </div>
</template>
<script setup>
  const text = ref('hello')
</script>
<style scoped>
  /* 失效 */
  div p:first-of-type:before{
  content:v-bind('text')
  }
</style>
```

- 建议写法

```html
<template>
  <div>
    <p :data-text="text">123</p>
    <p>123</p>
    <p>123</p>
    <p>123</p>
  </div>
</template>
<script setup>
  const text = ref('hello')
</script>
<style scoped>
  div p:first-of-type:before{
  content:attr(data-text)
  }
</style>
```

## vue `script-setup`形式

- 全局编译器宏只能在 script-setup 模式下使用
- script-setup 模式下，使用宏时无需 `import`可以直接使用；
- script-setup 模式一共提供了 4 个宏，包括：`defineProps`、`defineEmits`、`defineExpose`、`withDefaults`。

### 为 props 提供默认值

- 使用 defineProps宏可以用来定义组件的入参，使用如下：

```html
<script setup lang="ts">
let props = defineProps<{
    schema: AttrsValueObject;
    modelValue: any;
}>();
</script>
```

- 这里只定义props属性中的 schema和 modelValue两个属性的类型， defineProps 的这种声明的不足之处在于，它没有提供设置 props 默认值的方式
- 其实我们可以通过 withDefaults 这个宏来实现：

```html
<script setup lang="ts">
let props = withDefaults(
  defineProps<{
    schema: AttrsValueObject;
    modelValue: any;
  }>(),
  {
    schema: [],
    modelValue: ''
  }
);
</script>
```

### 配置全局自定义参数

```js
// Vue2.x
Vue.prototype.$api = axios;
Vue.prototype.$eventBus = eventBus;

// Vue3.x
const app = createApp({})
app.config.globalProperties.$api = axios;
app.config.globalProperties.$eventBus = eventBus;
```

### v-model 变化

- 当我们在使用 v-model指令的时候，实际上 v-bind 和 v-on 组合的简写，Vue2.x 和 Vue3.x 又存在差异。

```html
<!-- vue2 -->

<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->
<ChildComponent :value="pageTitle" @input="pageTitle = $event" />




<!-- vue3 -->

<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :modelValue="pageTitle" @update:modelValue="pageTitle = $event"/>

```

- script-setup模式下就不能使用 this.$emit去派发更新事件。需要借用`defineProps`,`defineEmits`两个宏来实现

```html
// 子组件 child.vue
// 文档：https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-%E5%92%8C-defineemits
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const emit = defineEmits(['update:modelValue']); // 定义需要派发的事件名称

let curValue = ref('');
let props = withDefaults(defineProps<{
    modelValue: string;
}>(), {
    modelValue: '',
})

onMounted(() => {
  // 先将 v-model 传入的 modelValue 保存
  curValue.value = props.modelValue;
})

watch(curValue, (newVal, oldVal) => {
  // 当 curValue 变化，则通过 emit 派发更新
  emit('update:modelValue', newVal)
})

</script>

<template>
    <div></div>
</template>

<style lang="scss" scoped></style>
```

父组件使用的时候就很简单：

```html
// 父组件 father.vue

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
let curValue = ref('');

watch(curValue, (newVal, oldVal) => {
  console.log('[curValue 发生变化]', newVal)
})
</script>

<template>
    <Child v-model='curValue'></Child>
</template>

<style lang="scss" scoped></style>
```

### script-setup 模式下获取路由参数

当我们需要获取路由参数时，就可以使用 vue-router提供的 useRoute方法来获取，使用如下：

```html
// A.vue

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from "@/router";

import { useRoute } from 'vue-router'

let detailId = ref<string>('');

onMounted(() => {
    const route = useRoute();
    detailId.value = route.params.id as string; // 获取参数
})
</script>
```

如果要做路由跳转，就可以使用 `useRouter`方法的返回值去跳转：

```js
const router = useRouter();
router.push({
  name: 'search',
  query: {/**/},
})
```
