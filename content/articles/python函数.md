---
title: python函数
date: 2020-10-11 11:12:06
author: Mr.H
img: https://i.loli.net/2020/10/25/F8xfzg74RKD16lp.jpg
tags:
- [python函数]
categories:
- [python]
---

## 简介
介绍
<!-- more -->

## 常用函数
+ 默认会返回值是None不是null

|api|释义|
|---|---|
|int(String)|将字符串转化成数字|
|abs(number)|将数字转换成绝对值|
|max(params1,params2....)|多个参数，返回最大值|
|instance(any)|返回字符的类型|

## 函数的参数
> 按照类型分为五类：必填参数、默认参数、可变参数、关键字参数、命名关键字参数，他们的**组合顺序也是如此**

+ 默认参数
    1、不可设置为可变变量（只能string/数字/None等），参数重加在不会重新赋值，会重复引用之前初始化定义的值（与es6区别）
    ```python
    #错误的写法
    def variable_paramter_func(l = []):
        l.append('end')
        print(l)

    #正确的写法
    def correct_variable_paramter_func(l=None):
        if not l:
            l = []
        l.append('end')
        print(l)

    variable_paramter_func()
    variable_paramter_func()
    #打印结果['end'] ['end''end']
    correct_variable_paramter_func()
    correct_variable_paramter_func()
    #打印结果['end'] ['end']
    ```

    2、可为普通位置参数和命名关键字参数赋值，赋值后即可不传（使用默认值）

+ 可变参数&关键字参数的赋值分别使用*()|*[]和\*\*{a:'a'}格式，且赋值会复制新的对象，不改变源数据

+ 命名关键字再参数列表前必须要有*分割（可变参数或单独加一个\*参数），命名关键字也是函数调用时的必传值

## 递归
+ 函数调用使用stack栈实现，调用一次栈增加一层，所以会有递归的栈溢出，使用尾递归优化方法（return时调用函数本身，将结算结果一并传入函数）**pythong没有优化，使用不使用没区别**
```python
#尾递归优化：求100到1之和
def recursion_factorial(num, res):
    if num == 0:
        return res
    return recursion_factorial(num-1, res+num)
print(recursion_factorial(100, 0))
#输出5050
```