---
title: java数据结构
date: 2020-09-22 22:40:05
tags:
categories:
---

## 简介
主要是集合内容，linklist以及ArrayList对比，应用场景的区分。
<!-- more -->

+ Java中没有引用传递都是值传递

#### LinkedList使用
+ 双向链表，头部和尾部相互引用
+ 操作头/尾数据效率高，中间效率低 

1、常用api

|api|释义|返回值|
|---|---|---|
|add(elem)|添加list元素|返回Boolean值，成功true|
|get(num)|通过下标来获取数组元素|对应元素|
|remove(num)|删除指定位置元素|删除的元素|
|remove(elem)|删除重载方法|返回Boolean值，删除了为true|
|size()|list大小|数字|
|iterator()|生成iterator对象|一个Iterator对象|

2、特性

+ 头/尾部两端效率高，中间效率低，由于内部结构是双向链表，可当作栈或队列stac/queue使用
    1、当普通双向链表时

    |api|释义|
    |---|---|
    |addFirst(elem)|添加到头部|
    |getFirst()|获取第一个元素|
    |removeFirst()|删除第一个元素|
    |addLast(elem)|添加到尾部|
    |getLast()|获取最后一个元素|
    |removeLast()|删除最后一个元素|

    2、当成queue队列时

    |api|释义|
    |---|---|
    |offer(elem)|添加到头部|
    |peek()|获取第一个元素|
    |poll()|删除第一个元素|

    3、当成stack栈时

    |api|释义|
    |---|---|
    |posh(elem)|添加到头部|
    |pop()|删除第一个元素|

+ 下标遍历效率低，使用iterator()方法生成迭代器对象，用迭代器的hasNext+next()方法遍历效率相对高。
+ iterator迭代器对象中存了list元素的引用，调用next方法自动引用元素值，同时将保存的引用换成下一个元素的。

### 和ArrayList对比
+ LinkedList适用于频繁的修改、添加头尾数据（丑数），获取数据较之慢
+ ArrayList适用于海量数据的查询（可直接由内存大小算出存储元素的地址，因此快），数据添加（添加至末尾）