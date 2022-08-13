---
title: vue3入门
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [vue3入门]
categories:
  - [vue]
date: 2021-08-14 18:08:38
author:
img:
coverImg:
summary:
---


### 开始

相近文档☞[vue3&ts入门文档详解](https://24kcs.github.io/vue3_study/chapter3/01_%E8%AE%A4%E8%AF%86Vue3.html#_1-%E4%BA%86%E8%A7%A3%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF)

### 关于setup

#### 执行的时机
> 在beforeCreate之前执行，此时组件还没有被创建，即**setup中的this是undefined，不可使用this**

#### 返回值
+ 会将setup和data函数的返回值以及method对象中的数据合并，并覆盖掉同名属性。
+ 不可以使用async修饰setup函数（async关键字修饰的方法返回promise对象）
+ 模板中可以直接使用setup返回对象中的属性值

### ref和reactive对比
+ 同：ref和reactive都可以转换普通对象为proxy代理对象，
+ 异：ref的转换的代理对象取值时，要以proxyObj.value的形式取值，ref也可以代理对象，内部自动调用reactive来实现转换。

### watch&&watchEffect

### computed
+ getter&setter

### toRefs&toRef

### toRaw&&markRaw

+ toRaw：临时返回proxy代理的普通对象，临时读取，写入不会同步更新到页面，操作不会被同步到
+ markRaw：标记一个对象，使其永远不会转换为代理。返回对象本身。

### customRef
> 自定义ref代理操作：customRef(callback: (track: () => void, trigger: () => void) => {get: () => any}, set: () => void) => any

### 生命周期

### readonly&shallowReadonly

### provide&&inject

### isProxy&&isRef&&isReactive

