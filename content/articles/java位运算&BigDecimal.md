---
title: java位运算&BigDecimal
date: 2020-09-07 21:58:12
top: true
author: Mr.H
img: https://i.loli.net/2020/10/25/h45SL3KyPf8mBJu.jpg
tags:
- [BigDecimal]
- [BigInteger]
categories:
- [java]
---

## 常见位运算
| 符号 | 解释 |
|  --- | ---  |
| & |位与，上面是1并且下面是1，结果才是1|
| \| |位或，上面是1或者下面是1，结果才是1|
|^| 异或，不同是1|
|~|求反，1变成0，0变成1|
|>>|带符号的位右移|
|<<|大夫好的左位移|
|>>>|不带符号的右位移|
## java中的大数字运算

### BigDecimal

|常用api|参数|释义|
| --- | ---| --- |
|a.multiply(b)|BigDecimal类对象|加法|
|a.subtract(b)|BigDecimal类对象|减法|
|a.multiply(b)|BigDecimal类对象|乘法|
|a.divide(b)|BigDecimal类对象,保留位数,舍入方式)|除法|
|(BigDecimal a).setScale|(保留位数,舍入方式)|BigDecimal类方法|

> BigDecimal类的舍入方式

|类型|释义|
|--- | ---|
|BigDecimal.ROUND_HALF_EVEN|精确舍入|
|BigDecimal.ROUND_HALF_UP|四舍五入|
|BigDecimal.ROUND_HALF_DOWN|五舍六入|
|BigDecimal.ROUND_DOWN|向小数字取整|
|BigDecimal.ROUND_UP|向大数字取整|
|BigDecimal.ROUND_FLOOR|向下取整|
|BigDecimal.ROUND_CEILING|向上取整|

+ **使用BigDecimal和BigInteger运算的结果是一个新的此类对象，使用int/doulb/...+Value()方法转换成不同数字变量**

### BigInteger

|常用api|参数|释义|
| --- | ---| --- |
|a.multiply(b)|BigInteger类对象|加法|
|a.subtract(b)|BigInteger类对象|减法|
|a.multiply(b)|BigInteger类对象|乘法|
|a.divide(b)|BigInteger类对象|除法|

> 没有小数处理？暂不清楚其他api用法

运算符优先级
> java大体分6种运算符，按照优先级顺序为:单目、算数、移位运算符、关系运算符、逻辑运算符、赋值运算符

详见[Java运算符优先级](https://www.jianshu.com/p/9d2204712097) 