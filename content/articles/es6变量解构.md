---
title: es6变量解构
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [变量解构]
categories:
  - [es6]
date: 2021-03-15 10:06:21
author:
img:
coverImg:
summary:
---

## 数组机构赋值
> 匹配赋值，即只要等号右边的结构与左边相同或包含左侧结构，且右侧有iterator接口，即可成功，复制失败则左侧值为undefined。

+ 左侧结构小于右侧
```js
var [a,b] = [1,2,3];//a=1,b=2
```
+ 右侧结构小于左侧
```js
var [a,b] = [1];//a=1,b=undefined
```
+ 函数惰性赋值,即当有对应的解构赋值时是不会触发函数求值的。
```js
var f = function(){
    console.log('run function ...')
}
var [a,b=f()] = [1]//a=1,b=undefined
```

+ 特殊情况set和generator函数也是可以正常解构赋值的。
```js
//set赋值
var [a,b] = new Set([1,2,4])//a=1,b=2
//generator赋值
function* fibs(){
    let [a,b] = [0,1];
    while(true){
        //加分号
        yield a;
        [a,b] = [b,a+b]
    }
}
let [one,two,three,four,five,six] = fibs()
//six 5
``

`
