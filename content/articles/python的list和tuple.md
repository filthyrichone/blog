---
title: python的list和tuple
date: 2020-10-11 00:29:18
author: Mr.H
img: https://i.loli.net/2020/10/25/edvhBXTlIHZux7g.jpg
tags:
- [list]
- [tuple]
categories:
- [python]
---

## 简介
python中的list和tuple对象的基本用法，及常用api
<!-- more -->
## list
+ 下标取/存值
+ pop([index])删除值（默认最后一位）
+ append(ele)添加元素至list末尾
+ insert(index,object)插入元素至指定位置

## tuple
+ 定义了就不可修改（类似es6的const关键字定义变量？）
+ 在函数中应用：返回值是省略了小括号的元组，因此可以返回多个值
```python
def return_multi_params():
    return 1,'jack'
age,name = return_multi_params()
#name = 'jack',age=1
```

## 条件判断
+ if x:简写，判定不为空值|空字符串|**空的list** 
+ elif 是else if简写
+ input(['输出string'])函数，接收用户输入信息
+ int(string)&str(num)字符转整数&整数转字符函数

## 循环
+ 遍历每一个list，for variable in list:
+ while 条件:
+ break/continue

## map
+ 初始化就是写一个json对
+ 和list对比查找速度快，浪费空间（空间换时间）
+ pop([index])同list
+ get(key)==map[key]获取键对应值
+ key不可变（不能为list，可为string、整数）
+ 储存的元素无序

## set
+ 储存的元素无序
+ 创建:set([ele]),元组里面放一个list
+ 元素不可变（可变对象难以比较是否相等，无法保证元素唯一性）
+ remove(key)
+ add(key)