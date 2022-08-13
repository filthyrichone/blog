---
title: 双向链表和ArrayList
date: 2020-09-22 22:40:05
author: Mr.H
img: https://i.loli.net/2020/10/25/Ewnpaq4WiBuDs8z.jpg
tags:
- [ArrayList]
- [LinkedList]
categories:
- [java]
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

### 手写简要双向链表增删功能
> 主要是明确双向链表封装一个对象，对象包含了前一个和后一个对象的引用，增删就是对封装对象进行操作。
```java
package day1215;

public class DoubleLinkedListTest<T> {
	Node last;
	Node first;
	Integer size = 0;
    //链表状态判定：两种情况为空和不为空
	public void add(T t) {
        //使用匿名内部类，省略了this
		Node n = new Node();
        //相当于Node n = this.new Node();
		n.value = t;
		if (size == 0) {
			n.prev = n;
			n.next = n;
			first = n;
			last = n;
		} else {
			last.next = n;
			n.prev = last;
			n.next = first;
			first.prev = n;
			last = n;
		}
		size++;
	}

	public T get(int i) {
		Node n = getNode(i);
		return n.value;
	}
    
	private DoubleLinkedListTest<T>.Node getNode(int i) {
        //三种情况，越界，头尾部对象以及中间对象,分别处理即可
		if (i < 0 || i > size - 1) {
			throw new IndexOutOfBoundsException("" + i);
		}
		if (i == 0) {
			return first;
		} else if (i == size - 1) {
			return last;
		}
		Node n = null;
		if (i < size / 2) {
			n = first;
			for (int j = 1; j <= i; j++) {
				n = n.next;
			}
		} else {
			n = last;
			for (int j = size - 2; j >= i; j--) {
				n = n.prev;
			}
		}
		return n;
	}

	class Node {
		T value;
		Node prev;
		Node next;
	}
}
```

## LinkedList实例
> 利用linkedlist保存文件，循环遍历list得到数组文件的大小
```java
private static long getDocLength(String inp) {
    File f = new File(inp);
    LinkedList<File> list = new LinkedList<File>();
    list.add(f);
    long sum = 0;
    while (0 != list.size()) {
        File ff = list.pop();
        if (ff.isFile()) {
            sum += ff.length();
        } else {
            File[] fff = ff.listFiles();
            if (null == fff)
                continue;
            for (File ffff : fff) {
                list.push(ffff);
            }
        }
    }
    return sum;
}
```