---
title: HashMap简单梳理
date: 2020-10-09 00:05:21
author: Mr.H
img: https://i.loli.net/2020/10/25/x1SZ7AJ3BbYDCcU.jpg
tags:
- [collections]
- [HashMap]
categories:
- [java]
---

## 简介
第八天，决心改掉恶习，加油！
<!-- more -->

## HashMap常用api


|api|释义|返回值|
|---|---|---|
|get(key)|获取指定键值对应的值，key为未保存的值时返回null值|正常指定键对应的值，key不存在返回null值|
|put(key,value)|添加指定的键值对，key和value均可为null值，重复保存相同的键而值不同则会覆盖|正常null，覆盖保存返回被覆盖的值|
|remove(key)|删除指定键值对，key为未保存的值时返回null值|被删除的值|
|size()|获取map存储的键值对个数|-|

## Hash运算过程

HashMap特性：

+ 内部由table数组组成，而每个键值对都会被封装成一个entry对象进行存储
+ 初始化数组大小为16
+ 增长大小为length*2+2
+ 负载因子为0.75

HashMap的存储过程简单可以总结成一下几步

>1、调用一个要存储键值对的key.hashCode()方法获取hash值，结合数组的长度计算出存放的效标位置
 2、将要存储的键值对封装成entry对象，并放入对应下标位置
 3、如果下标位置有值则用key.equals()方法比较键是否相等，若相等则替换值，否则将新键值对用链表方式连接起来。
 4、如果链表的长度超过了8则将链表转换成红黑树存储（jdk1.8）
 5、当量表的长度减少到6则又将红黑树转化成链表
 6、当table的负载因子（加载率）达到了0.75则扩大table的容量（2*length+2）

 ## hash算法重写

 ```java
@Override
public int hashCode() {
    int p = 31;
    int r = 1;
    r = r * p + x;
    r = r * p + y;
    return r;
}
//尽量使hash值分散开

@Override
public boolean equals(Object obj) {
    if (obj instanceof Point) {
        Point p = (Point) obj;
        return x == p.x && y == p.y;
    }
    return false;
	}
```

## iterator迭代器
> 常用api

|名称|释义|
|---|---|
|next()|取出下一个数据元素|
|remove()|去除next方法取出的数据元素（要先取出数据元素，即调用next方法之后才能使用）|
|hasNext()|是否有下一个数据元素|

**注意**不能在使用iterator便利店时使用集合本身进行增删操作！！！

## 遍历map
由于HashMap本身没有提供遍历自身的方法，需要借助key的迭代器来遍历或者直接遍历key的Set来实现
```java
HashMap<Integer, String> map = new HashMap<Integer, String>();
map.put(123, "jack");
map.put(9527, "唐伯虎");
Iterator<Integer> it = map.keySet().iterator();
//遍历器实现
while (it.hasNext()) {
    System.out.println(map.get(it.next()));
}
//遍历Set实现
for (Integer in : map.keySet()) {
    System.out.println(map.get(in));
}
```