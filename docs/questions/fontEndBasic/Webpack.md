# webpack

## less是怎么编译成css的

- 通过less和less-loader
- less 使用less语言的特性，嵌套语法，变量，函数，常量，map
- less-loader 将 less 编译成css文件
- css-loader 解析css文件里面的css代码（默认webpack只解析js代码的）
- style-loader 将css-loader解析的内容挂载到html页面中

## webpack的优化

- 开启 gzip 压缩 ( compression-webpack-plugin)
- 通过 splitchunk 切割大文件
- js 文件最小化处理
- 图片资源压缩 (image-webpack-loader)

### 开启 gzip 压缩 ( compression-webpack-plugin)

```js
 configureWebpack: (config) => {
   if (process.env.NODE_ENV === 'production') {
     // 配置webpack 压缩
     config.plugins.push(
       new CompressionWebpackPlugin({
         test: /\.js$|\.html$|\.css$/,
         // 超过4kb压缩
         threshold: 4096
       })
     )
   }
 },
```

- 然后在 devServer 加入如下配置即可看到 gzip 压缩效果

```js
devServer: {
    //在本地服务器开启gzip，线上服务器都支持gzip不需要设置
    before(app) {
        app.get(/.*.(js)$/, (req, res, next) => {
            req.url = req.url + '.gz';
            res.set('Content-Encoding', 'gzip');
            next();
        })
    }
}
```

### 通过 splitchunk 切割大文件

```js
chainWebpack: (config) => {
  // chunk分离优化
  config.optimization.splitChunks({
    chunks: 'all',
    cacheGroups: {
      echarts: {
        name: 'chunk-echarts',
        test: /[\\/]node_modules[\\/]_?echarts(.*)/,
        priority: 30,
      },
      zrender: {
        name: 'chunk-zrender',
        test: /[\\/]node_modules[\\/]_?zrender(.*)/,
        priority: 25,
      },
      betterScroll: {
        name: 'chunk-betterScroll',
        test: /[\\/]node_modules[\\/]_?better-scroll(.*)/,
        priority: 20,
      },
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial',
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true,
      },
    },
  });
};
```

### js 文件最小化处理

- 代码的最优化, 通过 chainWebpak 来处理. 这里使用的是 webpack 配置中的 optimization 来处理的

```js
module.exports = {
  chainWebpack: (config) => {
    config.optimization.minimize(true);
  },
};
```

### 图片资源压缩 (image-webpack-loader)

```js
chainWebpack: (config) => {
  //最小化代码
  config.optimization.minimize(true);
  //分割代码
  config.optimization.splitChunks({
    chunks: 'all',
  });
  // //压缩图片
  config.module
    .rule('images')
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({
      bypassOnDebug: true,
    })
    .end();
};
```


## 前端工程化

### require.context(string,Boolean, RegExp)【属于前端工程化】

- 参数 1: 读取文件的路径
- 参数 2: 是否遍历文件的子目录
- 参数 3: 匹配文件的正则

```js
const files = require.context('@/components/', true, /index.vue$/);

function registerComponent(fileData) {
  // fileData 是一个工厂函数
  // fileData.keys() 拿到的是每个可以匹配到的相对路径
  if (fileData) {
    let _mVant = {};
    fileData.keys().map((key) => {
      console.log(fileData(key)); //可以拿到当前模块， fileData(key).default: 可以拿到当前模块内的内容
      _mVant[fileData(key).default.name] = fileData(key).default;
    });
    return _mVant;
  }
}

const components = registerComponent(files);

export default components;
```

## webpack 配置多入口

```js
module.exports = {
  entry: {
    'index': './src/view/index/index.js',
    'login': './src/view/login/login.js',
  },
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/view/index/index.html',
    inject: true,
    chunks: ['index']
   }),
  new HtmlWebpackPlugin({
    filename: 'login/login.html', //http访问路径
    template: './src/view/login/login.html', //实际文件路径
    inject: true,
    chunks: ['login']
  }),
  output: {},
  loader: {},
  plugins: {}
}
```

## webpack的执行流程

[webpack执行流程](https://zhuanlan.zhihu.com/p/364310644)

### 构建流程

1. 初始化阶段
   1. 解析 config 与 shell 中的配置项，合并参数
   2. 创建Compiler
   3. 初始化内置插件及Options配置
   4. run
2. 编译阶段
   1. Compilation
   2. make编译从入口文件开始，构建模块，知道所有模块创建结束
   3. 生成modules
   4. buildModule,执行module.build(),对应的是 NormalModule.build()，执行doBuild()方法，里面有个runLoaders方法，调用相应的Loaders,把我们的模块转成标准的JS模块。还会生成this._source对象，有name和value两个字段，name就是我们的文件路径，value就是编译后的JS代码；经过doBuild之后，我们的任何模块都被转成了标准的JS模块，接下来就是调用 Paeser.parse方法，将JS解析为AST，解析成AST最大作用就是收集模块依赖关系，webpack会遍历AST对象，遇到不同类型的节点执行对应的函数。webpack会记录下这些依赖项，并记录在module.dependencies数组中
   5. make阶段结束后，会触发compliation.seal方法。compilation.seal，主要生成chunks，对chunks进行一系列的优化操作，并生成输出的代码。webpack中的chunk，可以理解为配置在entry中的模块，或者是动态引入的模块。
3. 生成文件阶段
   1. 生成 chunks，首先需要生成最终的代码，主要在compilation.seal中调用compilation.createChunkAssets方法
   2. 生成文件，在 Compiler 开始生成文件前，钩子emit会被执行，这是我们修改最终文件的最后一个机会，生成的在此之后，我们的文件就不能改动了。
   3. 生成所有文件，然后触发任务点done,结束构建流程

## 有没有自己写过webpack 的插件或者loader？

### 什么是loader？

- loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。
  - 处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。
  - 第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码
