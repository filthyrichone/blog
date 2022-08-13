---
title: java特殊问题记录
top: false
cover: true
toc: true
mathjax: false
password: 
summary: 
tags:
  - [特殊问题]
categories:
  - [java]
date: 2020-12-16 23:07:55
author:
img: https://i.loli.net/2020/10/30/QBtyYLJdEGzHmNV.jpg
coverImg: https://i.loli.net/2020/10/30/QBtyYLJdEGzHmNV.jpg
---

## 在类中this的省略问题
```java
class Student{
	int age;
	String name;
    //变量名不同，可以省略this
	public Student(int ag) {
		super();
		age = ag;
	}
    //此时如果省略this，那么对象的age就会赋不上值
	public Student(int age, String name) {
		super();
		this.age = age;
		this.name = name;
	}
}
```
> java中的变量采取就近原则，如果没有this特殊指定，它会自动寻找最近出现的变量作为他的值。

## final关键字的编译器优化
> 上代码
```java
public static void main(String[] args) {
    final byte a = 1;
    final byte b = 2;
    byte c = a + b;
    System.out.println(c);
}
```
> 上面代码中a和b如果不加final关键字，在运算时java会自动转换成int类型，那么这个表达式就是错误的，可是加了final关键字之后，c的值编译器就会自动优化成3，而不会有运算了，所以是正确的。
