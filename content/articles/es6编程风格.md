---
title: es6编程风格
date: 2020-09-23 10:52:07
author: Mr.H
cover: true
img: https://i.loli.net/2020/10/25/4WIBAmYPD5vraVQ.jpg
tags:
- [代码规范]
- [编程风格]
categories:
- [es6]
---

## 简介
由于现行js的使用版本不一致，导致老版js和es6混用，以及es6本身的使用不规范，造成代码的格式不标准，不便于代码的维护和修改，故参考行业先进规范以改正。
<!-- more -->

## 变量定义关键字替换

1、使用let取代var
+ 没有了变量提升，更严谨（存在temporal dead zone暂时性死区）需要先定义再使用。

2、使用const声明全局常量

## 字符串
统一使用单引号，有变量的成分就是用反引号。

## 赋值
> 尽量使用结构赋值，保证简洁明了
```js
//常用于
//1、数组赋值
const arr = [1,2,3]
const [one,two] = arr
//2、获取函数参数
function everyfunc(params){
    const {one,two} = params
}
//3、函数返回值&&获取函数返回值（尽量使用对象返回结构，便于添加和修改顺序）
const {one,two} = getReturnFunc()
function getReturnFunc(){
    return {one,two}
}
```

## 对象
1、对象定义时，多行元素最后一个要加上‘,’，定义在一行上则不必
```js
const obj = {a:1,b:3}
const obj = {
    a:1,
    b:3,
}
```

2、尽量不要修改，静态化，修改使用Object.assign(target,...origin)（可以有多个源对象）修改。
```js
const target = {
    one:'one'
}
Object.assign(target,{two:'two'})===>target={one:'one',two:'two'}
```

3、如果定义时元素名称不确定，使用属性表达式，即‘[要运算的表达式]’作为元素名称。
```js
const obj = {
    [getName('key')]:'jack'
}
```

4、对象内部方法省略function关键字，同名键名称省略
```js
const obj = {
    one,
    get(){
        ...
    }
}
```

## 数组
1、复制数组使用扩展运算符
```js
let oldArr = [1,2]
let newArr = [...oldArr]
```

2、将类数组转换成数组使用Array.from(target)target需要是可迭代的对象（有length属性）
```js
Array.from(document.querySelector('li'))
```

## 函数
1、箭头函数
+ 简单的函数
```js
;[1, 2, 3].map(x => x * x)
```

+ 绑定this值，代替使用（_self/that/_this）表示this
```js
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}
// acceptable
const boundMethod = method.bind(this);
// best
const boundMethod = (...params) => method.apply(this, params);
```

2、参数
+ 不用argument关键字，获取参数使用（...params）直接获取参数数组
```js
function(...params){
    params.join('')
}
```

+ 在参数列表设置默认参数
```js
function(params={}){
    anything...
}
```

## 使用Map代替Object对象的使用
> Map有key:value结构，有自己的遍历方法，object使用在具体业务特殊对象。

```js
let map = new Map(可迭代对象)
let map = new Map([[1,'one'],[2,'two']])
//keys()便利key值
for key of map.keys(){} ;
//values()便利值

//entries()获取值和key值（为数组则是下标数值）
```

## class代替原有的直接操作Prototype属性，规范类定义使用
```js
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

## 使用es6的模块化代替CommonJS的模块化引用