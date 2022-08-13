---
title: java变量（重点String）
date: 2020-09-13 23:44:39
tags:
- [fileOperation]
- [String]
- [Arrays]
categories:
- [java,javase]
---

## 简介
day4，主要讲了String类&局部/全局变量&Array常见方法使用&递归&BufferReader/FileReader/FileWriter&混合变量后的类加载顺序
<!-- more -->

## 混合变量类加载顺序

> Array.copyOf(original,newlength)
返回新数组，不改变原数组
新数组的长度可大于或小于原数组——>数组的切割/增大容量

> 类加载
1、将父类加载到方法区，并为其静态变量分配内存空间
2、将子类加载到方法区，并为其静态变量分配内存空间
3、为父类的静态变量赋值&执行父类静态代码块（无先后顺序）
4、为子类的静态变量赋值&执行子类静态代码块（无先后顺序）

> new新对象
5、在堆中创建父类对象，为父类成员变量分配内存
6、在堆中创建子类对象，为子类成员变量分配内存
7、为父类的成员变量赋值
8、执行父类的构造函数
9、为子类的成员变量赋值
10、执行子类的构造函数

binarySearch+ArrayList？？？