---
title: tomcat使用
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [tomcat]
categories:
  - [tomcat]
date: 2021-01-13 23:25:34
author:
img:
coverImg:
summary:
---

## 安装即可使用

## FAQ常见问题

### 端口被占用
```sh
#查看进程占用端口号(pid)情况
netstat -ano
#关闭占用端口的进程
taskkill /f /pid 进程编号
```

### 重复启动
> 运行shutdown.bat文件关闭后启动.

### 修改不生效
> 修改了server.xml文件但是tomcat命令行还是显示的默认端口,检查电脑上是否有多个tomcat,可能默认启动了另一个tomcat!

## 文件介绍
+ tomcat文件夹
|文件夹|作用|
|--|--|
|bin|存放可执行文件,批处理程序|
|conf|存放配置tomcat的配置文件(server.xml)|
|lib|存放运行所需要的jar包,其他依赖|
|logs|存放异常出现时的信息|
|temp|存放临时数据|
|webapps|存放整个项目文件(包含前端,后端以及WEB-INF配置文件等其他虚拟站点资源文件)|
|work|存放tomcat运行时产生的文件|

```md
一个webaps中的web应用
    |--其他文件夹,可以直接访问
    |--WEB-INF文件夹,不可直访问
        |--classes动态web资源
        |--lib运行依赖
        |--web.xml配置文件
        
```

+ WEB-INF项目文件夹
|文件\|文件夹|作用|
|--|--|
|classes|存放编译好的java字节码程序,动态web资源(servlet\jsp)中的class文件|
|lib|运行所学要的依赖-->动态web资源(servlet\jsp)以来的一些jar包|
|web.xml|当前web应用的核心配置文件|

## 默认打开项目ROOT
> tomcat默认打开web应用文件夹名称是ROOT,在ROOT文件夹中的WIN-INF文件夹中的web.xml文件配置默认打开的文件.
```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<Welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</Welcome-file-list>
```
+ 在welcome-file中配置ROOT目录下的文件即可

## 打包发布
> 使用war打包可以减少带宽和体积,tomcat在webapps中存在war结尾,并且压缩包名称在路径中不存在时,可以自动解压发布web应用.
+ 注意在打包web应用时应该要在应用顶层选中所有文件一起压缩成一个压缩包,不要直接压缩应用根目录文件夹.

## http协议
> 规定浏览器发送请求的格式或规则.原则上一次发一个请求,收到服务器返回信息后处理信息.

+ http请求由三部分组成:请求行+请求头(若干行)+请求实体内容
+ http响应也有三部分组成:状态行+响应头(若干行)+响应实体内容
+ 常见http状态码
|状态码|释义|
|--|--|
|200|请求成功|
|301|重定向|
|302|重定向|
|304|使用浏览器缓存资源|
|404|请求资源不存在|
|500|服务器程序在处理请求时出现了异常|