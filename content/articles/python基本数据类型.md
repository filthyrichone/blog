---
title: python基本数据类型
date: 2020-10-10 23:02:42
top: true
author: Mr.H
img: https://i.loli.net/2020/10/25/BKQqHjZdrIl4aix.jpg
tags:
- [基本数据类型]
categories:
- [python]
---

## 简介
决心开始认真系统学习python，基本数据类型开始，记录自己感觉重要的知识点。
<!-- more -->
## 整数
+ 十六进制ox开头
+ 允许使用_下划线分割多个0的大数据
```python
#等效写法
100_000_000 == 100000000
```

+ 整数运算永远是精确计算（除法也是），浮点数计算会有四舍五入误差

## 字符串

+ 定义：使用单引号''和双引号""包裹起来的数据

+ 字符串和整数不可变，任何操作不会改变源数据，而是创建新的数据

+ 使用'''multi-line-string'''包裹，表示多行字符串

+ 默认会对包含\符号的字符转义转义，在字符串前加上r则不会转义

+ **字符串中的格式化处理**
    1、使用%占位符处理
    规则：字符串里面使用上述字符占位，在结尾使用%(replacement1,replacement2...)替换
    |字符|释义|
    |---|---|
    |%s|普通字符|
    |%f|浮点数|
    |%d|整数|
    |%x|十六进制数|

    示例：
    ```python
    print('%s is %d year\'s old,he have $%f' %('jack',23,3456345643.234))
    #使用%%转义%
    print('%%%d'%25)
    ```
    **在字符串中可加入整数/浮点数在%和特定字符间对数据输出位数处理**
    ```python
    #整数数字表示占位
    print('%3d'%23)
    #浮点数对浮点数的位数处理
    print('%.2f'%12.23453)
    ```

    2、使用string类型的format函数配合{}
    ```python
    print('{} is {} year\'s old,he have ${}'.format('jack',23,3456345643.234))
    ```

    3、在字符串前加上f，然后使用{变量名}，自动替换字符串（类似es6中的反引号字符串）
    ```python
    name = 'jack'
    age = 23
    money = 3456345643.234
    print(f'{name} is {age} year\'s old,he have ${money}')
    ```

## 布尔值Boolean
+ 值表示是首字符大写
```python
1==2--->False
1==1--->True
```

## 空置None
+ 与js的null区别开

## 变量&&常量
+ 变量不必声明，常量的变量名称全部大写（说是常量其实随时可变）

## 注释
+ 使用#做标志

+ 通用注释
```python
#告诉python解释器（cpython用的最多）以utf-8格式读取文件
#-*- coding:utf-8 -*-

#告诉Linux和mac是一个可执行的python文件（win不支持） 
#!user/bin/env python3
```