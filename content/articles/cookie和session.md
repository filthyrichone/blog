---
title: cookie和session
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [cookie]
  - [session]
categories:
  - [cookie]
  - [session]
date: 2021-02-14 10:17:33
author:
img:
coverImg:
summary:
---

## cookie
> 特点：存储在客户端本地，最大不能超过4k大小，同一个域下最好不能超过20/30/50个cookie
> 安全性比session差一些，存储时间可以手动调节，存储对服务器的影响不大。

### 创建cookie
```java
Cookie c = new Cookie("name","value");
```
### 修改cookie属性
```java
c.setValue("newValue");
```
### 添加cookie到浏览器存储
```java
response.addCookie(c);
```
### 删除cookie
+ 方法一（推荐）覆盖并设置过期时间为0
```java
Cookie c = new Cookie("name","");
c.setMaxAge(0);
```
+ 方法二，遍历request.cookies得到的cookie数组，找到指定cookie并设置其时间为0
```java
Cookie[] cs = request.getCookies();
for(Cookie c: cs){
    if("name".equals(c.getName())){
        c.setMaxAge(0);
    }
}
```
### cookie存储中文问题
> cookie本身只支持存储Ascii字符编码类型的，所用要用到URLEncoder和URLDecoder两个类的方法。
```java
//存储
c.setValue(URLEncoder.encode("杨超","utf-8"));
//展示
System.out.println(URLDecoder.decode(c.getValue(),"utf-8"));
```

## session
> 特点：保存在服务器端，安全性比cookie高，影响服务器性能，不能做大规模存储。
> 首次使用用会创建一个session对象，默认30分钟没有再次使用则关闭session，正常关闭服务器且session没有超过设定时间会将session序列化转存到硬盘上。再次打开服务器还是可以读取到原来的session。
> 首次创建成功会生产唯一的sessionId，并通过响应头set-cookie返回给浏览器存储，以后浏览器访问服务器都会自动携带cookie，即有sessionId，服务器就能通过sessionId找到对应session内容。

### 创建/获取sesssion
```java
//服务器已经有session返回存在的，没有就创建一个。
HttpSession hs = request.getSession();
//服务存在session则返回session，否则返回null
HttpSession hs = request.getSession(false);
```
### 获取/设置/修改session属性
```java
//获取属性值（没有对应属性返回null)
hs.getAttribute("attri");
//添加新值
hs.setAttribute("attri","value");
//修改原有值
hs.setAttribute("attri");
//删除属性值
hs.removeAttribute("attri")
```

### 删除session
+ 使用invalidate方法
```java
request.getSession().invalidate();
```
+ 配置web.xml,设定超时时间（不能使用算术运算赋值）
```xml
<session-config>
    <session-timeout>3600000</session-timeout>
</session-config>
```
+ 关闭服务器，正常关闭序列化存储到磁盘，否则丢失session