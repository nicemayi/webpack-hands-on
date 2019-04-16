##### Chapter 01
```
npm install --save-dev webpack-cli webpack
```
安装的是cli-3和webpack-4

```
npx webpack index.js
```

##### Chapter 02

webpack定义是一个module bundler tool

webpack最好局部安装

```
npx webpack -v
npx webpack-cli -v
```

```
npm info webpack
```

```
const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

```
npx webpack --config youfilename.js
```

module -> rules -> test & use -> loader

```
    module: {
        rules: [
            {
                test: /\.jpg$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                    },
                },
            },
        ],
    },
```

loader就是一个打包的方案

如果同样的rules，前面的会被采用，后面的会被忽略

url-loader会把图片变成base64

loader执行从下到上，从右到左

postcss-loader是自己做css浏览器自适应

importLoaders 2意思是通过import进来的scss也会从头走一遍

font文件也用file-loader打包

用HtmlWebpackPlugin就不用自己写html了

HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中

用 template: 'src/index.html' 来配置HtmlWebpackPlugin

plugin可以再webpack在运行到某个时刻的时候，帮你做一些事情

CleanWebpackPlugin是在打包之前运行的，去删除在output中指定的文件夹（注意要去找文档，确定生命周期）

sourceMap是一个映射关系，对应的是打包出来的code的某一行对应的源文件里的那一行

```
  "scripts": {
    "watch": "webpack --watch"
  },
```

webpack-dev-server需要安装

自己写蛮麻烦的

webpack-dev-middleware可以用来监听文件是否发生变化

Hot Module Replacement (HMR)

webpack-dev-server不会生成dist，会存在内存中，提升打包速度

有的时候我们不需要重新刷新浏览器，因为测试的时候需要重复操作一遍，很不方便，所以需要HMR

```
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        proxy: {
            '/api': 'localhost:3000',
        },
        hot: true,
        hotOnly: true,
    },
```

module.hot.accept('file', cb)监听file并执行cb，这就是HMR的基本原理

要安装babel-loader和@babel/core，还要安装@babel/preset-env(具备了es6到es5的语法)

有些变量或者函数仍然不全，所以还要使用polyfill @babel/polyfill

然后在所有代码运行之前运行 `import '@babel/polyfill'` 但是打包出来的太大了

还要安装@babel/plugin-transform-runtime @babel/runtime  @babel/runtime-corejs2

babelrc从下往上转化

TreeShaking就是把不需要的函数代码去掉。在2.0以上提供

TreeShaking只支持ES module (import模块)

import底层是静态  require是动态

package.json "sideEffects": ["@babel/poly-fill", "*.css"] // 是对polyfill来说的

生产环境 压缩 source map

可以通过写两组webpack config来解决开发和生产的问题

使用webpack-merge来合并