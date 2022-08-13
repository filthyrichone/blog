---
title: js基本数据类型
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [基本数据类型]
categories:
  - [js]
date: 2021-02-13 12:50:58
author:
img:
coverImg:
summary:
---

## 简介
> 基本类型（基本数值、基本数据类型）是一种既非对象也无方法的数据。在 JavaScript 中，共有7种基本类型：string，number，bigint，boolean，null，undefined，symbol (ECMAScript 2016新增)。

## 暂存死区
> 与通过  var 声明的有初始化值 undefined 的变量不同，通过 let 声明的变量直到它们的定义被执行时才初始化。在变量初始化前访问该变量会导致 ReferenceError。该变量处在一个自块顶部到初始化处理的“暂存死区”中。
```js
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}
```

## instanceOf和typeOf
> 常用比较数据类型的判定方式有两种，一种是使用typeof判定数据类型，一种是使用instanceof判定数据类型。
```js
typeof 'string'==>>'string'
typeof 12==>>'number'
typeof true==>>'boolean'
typeof Symbol('any')==>>'symbol
typeof null==>>'object'
typeof undefined==>>'undefined'
typeof 12234124123412n==>'bigint'
//bigint类型用于表示大于number类型所能表示的最大数值（253 - 1）
typeof {} ==>> 'object'
typeof [] ==>> 'object'
```
+ 使用typeof判定数值类型容易遇上[暂存死区](#暂存死区)问题
```js
typeof a==>> referenceError
let a 
```
而使用instance的判定规则是
```js
A instance of B
//等价于
instanceof (A,B) = {
    var L = A.__proto__;
    var R = B.prototype;
    if(L === R) {
        //A的内部属性__proto__指向B的原型对象
        return true;
    }
    return false;
}
```
即只要A的__proto__属性指向B的protorype原型对象，则认为A是B的实例对象。
```js
[] instanceof Array; //true
({}) instanceof Object;//true
new Date() instanceof Date;//true
```
