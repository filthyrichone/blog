---
title: babel使用介绍
date: 2020-09-21 15:08:19
top: true
author: Mr.H
img: https://i.loli.net/2020/10/25/GJNOxtbfM6inU4I.jpg
tags:
- [babel]
categories:
- [es6]
---

## 简介
babel+webpack作为es6必用的工具，配置和使用较为麻烦，小节了一下常见的使用和配置。
<!-- more -->

### 配置在项目中使用
> 可使用配置文件.babelrc将常见配置写入文件中（放置在项目的根目录下），再webpack打包的过程中，会自动读取这个文件的配置，常见的配置写法如下:
```js
{
    "presets":['es2015','env','stage-0'],
    "plugins":['transform-runtime']
}
```

+ .babelrc文件整个就是一个对象，在对象{}中配置相应的属性即可
+ 常用的presets规则以及转换插件需要自行下载（npm命令即可）
**babel配置也可以在webpack的配置文件中配置，即在module下的rules数组对象的规则对象的use属性中添加options属性中添加即可**
```js
module:{
    rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:['env'],
                    plugins:['transform-runtime']
                }
            }
        }
    ]
}
```
**关于转换规则stage-0/1/2...在新的webpack中不在推荐使用，避免过多使用**

### 命令行中直接转换
> 除了在项目中使用还可以直接在命令行转换es6的代码

1、安装@babel/cli
```bash
npm i -D @babel/cli
```
2、基本用法
```bash
//转换单个es6语法的文件到指定文件夹
npx babel es6.js --out-file out.js
//简写为
npx babel es6.js -o out.js

//转换文件夹至指定路径输出
npx babel es6dir -out-dir outdir
//简写为
npx babel es6dir -d outdir

//加上 -s参数生产source map文件
npx babel es6dir -d outdir -s
```
+ 转换文件到目标文件/文件夹时，没有会自动创建
+ 文件夹转换是将源文件夹中的文件依次转换到对应的输出，出错则停止转换
+ 关于npx可见
{% blockquote 阮一峰 https://www.ruanyifeng.com/blog/2019/02/npx.html npx使用教程 %}
常见的npx使用方式
{% endblockquote %}
+ 关于sourceMap可见{% blockquote 阮一峰 http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html JavaScript Source Map 详解 %}
sourceMap介绍
{% endblockquote %}

### @babel/node的使用
> 安装了这个包就可以在命令行直接执行es6命令，或者直接运行es6文件
```bash
//直接运行es6文件
npx node-node es6.js
```

### @babel/register
> 这个包的作用是在文件中对通过require加载的文件进行实时转换
```bash
//安装
npm i @babel/register -D
//使用（文件中）
require('@babel/register');
require('./es6.js')
//上述代码会自动将加载的es6文件转换
```

+ 此包仅在运行时有效（适用于开发时使用）
+ 使用时要先加载此包，放在文件的顶部
+ 当前文件不会自动转换，只会转换require加载的文件（加一个钩子）

### polyfill
> babel默认不会转换es6新的api，只会转换语法（syntax）例如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promies等全局对象，及部分全局对象的工具方法例如Array.from()方法。使用polyfill可解决这个问题

```bash
//安装(regenerator是转换generator的包)
npm i core-js regenerator-runtime -D
//使用（文件中）导入即可（require/import）
import 'core-js'
import 'regenerator-runtime/runtime'
```

