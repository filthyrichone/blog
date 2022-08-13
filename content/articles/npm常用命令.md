---
title: npm常用命令
date: 2020-10-07 11:56:29
top: true
author: Mr.H
img: https://i.loli.net/2020/10/25/vPUL5afAXloweuH.jpg
tags:
- [npm]
categories:
- [node]
---

## 简介
npm包管理工具的命令较多，记录下常用的命令
<!-- more -->

### 原理
详见 **[npm使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)** 阮一峰先生写的npm原理很清楚，通俗易懂。总结起来就是在运行npm run+关键字的命令时，npm会自动创建一个shell，同时将/node_moudles/.bin文件加到Path路径下，从而执行.bin文件里面的脚本代码（支持所有shell脚本，不仅是node的脚本）

### 常用命令
|命令|释义|简写|
| --- | --- | --- |
|npm install|初始化项目/安装项目的依赖|-|
|npm install -y|初始化项目，创建package.json文件（执行默认选项）|-|
|npm install [包名@版本号] [-\-global]|安装指定名称的依赖（可指定以来的版本），首次安装会自动创建node_modules文件夹（所有依赖均安装至此），global关键字指定是否是全局安装|npm i -g [包名@版本号]|
|npm run [script] |执行package.json文件中指定的脚本|-|
|npm install --save-dev [包名@版本号]|安装依赖并只在开发阶段使用，会在packjson的devDependencies属性下做标识（不加-\-save会在dependencies属性下做标识）|npm i -D [包名@版本号]|
|npm help|查询所有的npm命令|-|
|npm uninstall --save [包名@版本号]|卸载依赖，并清除package.json中的文本中dependencies属性下记录的依赖信息|npm un -S [包名@版本号]|
|npm uninstall --save-dev [包名@版本号]|卸载node_moudles下的依赖文件，并清除devDependencies属性下记录的依赖信息|npm un -D [包名@版本号]|
|npm update [-g] [包名@版本号] |升级依赖包（可升级全局安装的依赖）|-|
|npm i -g cnpm|安装淘宝npm镜像|-|
|npm i -S [包名@版本号] --registry=https://registry.npm.taobao.org|从淘宝镜像源安装依赖|-|
|npm confit set registry https://registry.npm.taobao.org| 设置npm安装依赖的路径为淘宝镜像源|-|
|npm config list |显示npm配置列表|-|
|npm config ls -l |显示所有npm配置列表|-|

+ 关于npx可见**阮一峰先生的教程[npx使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)**
+ 安装多个依赖使用空格隔开依赖包名称即可
+ 使用&链接多个npm命令——不分先后同时执行，使用&&链接多个npm命令——依次执行npm命令

### 依赖包版本号中的特殊字符 
>依赖包的后面可接版本号，通常格式为；包名+特殊字符+版本号[major, minor, patch]

1、特殊字符^
详见**二不挂五先生的文章[npm install 版本号^的坑](https://zhuanlan.zhihu.com/p/66039729)**，简单点来说就是^标识的范围是版本号[major, minor, patch]中从左到右第一个非0位开始，小于此非零位+1的版本号
```bash
^1.2.3版本包括：>= 1.2.3 并且 < 2.0.0
^0.2.3版本包括：>= 0.2.3 并且 < 0.3.0
^0.0.3版本包括：>= 0.0.3 并且 < 0.0.4
```
2、特殊字符~
与^类似，~字符则指定匹配版本号[major, minor, patch]中最新的patch位包依赖（方便修复小bug后依然适用于代码）
```bash
~1.2.3版本包括：>= 1.2.3 并且 < 1.3.0
~0.2.3版本包括：>= 0.2.3 并且 < 0.3.0
~0.0.3版本包括：>= 0.0.3 并且 < 0.1.0
```
3、特殊字符@
在@后面可以添加具体的版本号，以指定依赖包的确切版本，@latest表示安装最新的依赖包