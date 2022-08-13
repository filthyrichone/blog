---
title: webpack和babel在项目中的应用
date: 2020-10-13 14:58:25
author: Mr.H
cover: true
img: https://i.loli.net/2020/10/31/S7rgGC4bAW2Ry8s.jpg
tags:
- [wepack]
- [babel]
categories:
- [node]
---

## 简介
使用vue-cli简单不少，但要是单纯想使用es6的打包工具webpack和转换代码工具的babel进行项目的打包转换，麻烦不少
<!-- more -->

## 初始化项目
```bash
//如果项目文件夹存在，可以省略项目名称
npm init -y [项目名称]
```
使用上述命令生成package.json文件，此文件主要记录了项目的依赖，版本号等信息。当项目丢失部分依赖时可使用npm install依照此记录重新安装依赖。

## 安装依赖
webpack和babel的依赖包较多，且版本问题不兼容，很坑。直接使用固定版本命令安装
+ 安装babel的相关依赖

```bash
npm i -D babel-core@6.26.x babel-loader@7.0.0 babel-plugin-transform-runtime@6.23.x babel-preset-env@1.7.x babel-polyfill
```

+ 安装webpack相关的依赖

```bash
npm i -D webpack@4.43.x webpack-cli@3.3.x webpack-dev-server@3.11.x html-webpack-plugin@4.3.x
```

+ 安装css和字体文件相关的依赖

```bash
$ npm i -D node-sass@4.14.x sass-loader@8.0.x css-loader@3.5.x file-loader@6.0.x style-loader@1.2.x url-loader@4.1.x
```

## 配置wepack
配置需要使用的babel转换环境和wepack打包配置，项目入口生成文件存放路径等

1、在项目的根目录下创建webpack.config.js文件

2、在文件中写如下配置即可，项目运行时会自动读取此文件的配置
```js
//commonjs 导入文件格式
const htmlwebpackplugin = require('html-webpack-plugin')
const path = require('path')

const htmlwebplugin = new htmlwebpackplugin({
    filename:'index.html',
    template:path.join(__dirname,'./src/index.html')
})

//安装node-sass特殊命令npm install node-sass -D --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
module.exports = {
    mode:'development',
    plugins:[htmlwebplugin],
    entry:'./src/main.js',
    module:{
        rules:[
            { 
                test: /.js$/, 
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env','babel-polyfill'],
                        plugins:['transform-runtime'],
                    }
                },
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.scss$/, use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[path][name]-[local]-[hash:5]'
                        }
                    }
                }, 'sass-loader']
            },
            { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' },
            // {test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]']}
        ],
    },
    resolve:{
        alias:{
            '@':path.join(__dirname,'./src'),
            '$':__dirname
        },
        extensions:['.js','.jsx','.json']
    },
}
```

## 附上完整的package.json文件
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack-dev-server --open --port 8080 --hot --host 127.0.0.1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.0.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "bootstrap": "^4.5.0",
    "create-react-class": "^15.6.3",
    "css-loader": "^3.5.3",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "jquery": "^3.5.1",
    "prop-types": "^15.7.2",
    "sass-loader": "^8.0.2",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "node-sass": "^4.14.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}

```

