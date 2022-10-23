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
