---
title: angular入门
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [入门]
categories:
  - [angular]
date: 2021-06-12 15:35:52
author:
img:
coverImg:
summary:
---

## 常用cli命令
|命令|释义|
|---|---|
|ng g module\| m modulename path [--routing]|新建module（普通module\|路由。。。）|
|ng g component \| c componentname path|新建component|
|ng g ||

## 项目结构

```md
├─e2e --端到端测试
├─node_modules --第三方依赖包
├─src --业务源代码
│  ├─app  --项目文件
│  ├─assets --静态资源
│  ├─environments --环境资源
│  ├─main.ts -- 入口文件
│  ├─polyfill.ts -- 额外资源
│  ├─styles.less -- 全局样式 
│  └─test.ts -- 测试入口
│ 
├─.editorconfig --编辑器代码风格设置
├─.angular-cli.json --angular脚手架配置文件
├─.gitignore --git仓库提交忽略配置
├─package.json --项目包说明文件
├─karma.config.js --karma的测试配置文件
├─protractor.config.js --端到端测试配置文件（与e2e文件夹相关）
├─tsconfig.json --ts配置文件
└─tslint.json --ts代码格式校验配置（类似eslint）
```

## angular指令

+ 按键修饰符keyup.enter
+ 双向绑定不默认提供==》》module种引入form
+ 实例：利用toggleAll的get、set切换列表状态（标签内""使用$event获取input值：get函数的值会因为依赖属性值的改变而变化）
+ 时间执行顺序：监听key事件 >> blur事件
+ window.onhashchange = function(){}
+ ngOnCheck：当组件数据改变时触发

### 表单校验
+ input绑定属性值:#name="ngModule"
+ 获取{{name.property（className）}}获取属性值
+ 添加error提示校验div，if或hidde属性动态判定显示
+ 阻止默认表单提交：form标签上：#form="ngForm"==>submit-button：[disabled]="!form.form.valid"

### 请求
+ 新建服务：ng g service service/serviceName
+ 在要使用的组件中注入serviceClass，并使用
+

## 路由
+ 安装路由模块：ng generate module app-routing --flat --module=app
+ 进入app-routing.module.ts配置路由模块的路由表
+ 首先从@angular/router包中引入RouterModule模块（forRoot方法：用于启动路由）和Routes对象（用于执行route类型）
+ 