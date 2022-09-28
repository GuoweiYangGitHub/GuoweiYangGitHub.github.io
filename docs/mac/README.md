# 快来记笔记咯~

## 快捷键

```js
// command+shift+.  显示隐藏文件
```

## 使用 mac 的前端常见问题

### node_modules 依赖 包下载不下来

- 清除一下 npm 缓存

```js
// npm cache clean --force
```

### 拷贝别人的 node_modules 的时候代码提交不了

`报错`

```js
// git commit 时一直报 .git/hooks/pre-commit: No such file or directory
```

- 执行下面命令即可解决

```js
// npx husky install
```

### 报 node-sass 问题

```js
// 开始的时候node-sass版本 v4.14 当前版本因为不支持 mac amd 芯片问题，需要升级 sass 版本，
//详情 ：
// https://github.com/sass/node-sass/issues/3033

//解决办法:
//使用 dart-sass 代替 node-sass
// 1. 删除原来 node-sass 版本  `npm uninstall node-sass`
// 2. 下载 dart-sass  `npm install sass`
// 在启动的时候，sass变量 可能会报错`$--变量名` 全局修改为 `$变量名`; `/deep/` 会报错 全局修改为 `::v-deep` 重新启动即可
```

### 使用的 vue-cli 版本太低，使用 vue 官方推荐桥接工具

- [vue-cli 官网](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui)

```sh
npm install -g @vue/cli-init
# vue init now works exactly the same as vue-cli@2.x
```

### 别人已经删除的远程分支，还能在本地看到

```js
// git remote prune origin
```

### Mac 全局命令

```js
// sudo npm -g vue/cli
```

### vuejs Mac 环境下 `npm run serve` 时报错 `Permission denied`

- 在`项目目录`中找到`node_modules/.bin/vue-cli-service`

```js
// 执行下面命令
chmod 777 /User/yangguowei/文件名/node_modules/.bin/vue-cli-service
// 文件目录路径是根据文件所放的位置来的，所放位置不同，文件路径也不一样
```

```js
npm install babel-eslint --save-dev
```

### 证书无效的问题

```js
// Apple Worldwide Developer Relations Certification Authority
```

### Mac下载`gh`命令

- `gh`是命令行上的 GitHub，现在可以在 beta 版中使用。它将拉取请求、问题和其他 GitHub 概念带到您已经使用的终端`git`和您的代码旁边。

```js
// 如果安装出错，多安装几次就好了。有时候会报404，它会转到另一个地址继续下载gh
// brew install github/gh/gh
```

### 查看所有node版本

```js
 // npm view node versions 
```

