---
title: servlet踩坑日记
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [servlet]
  - [jsp]
  - [jsp标签技术]
categories:
  - [java]
date: 2021-01-24 19:20:43
author:
img:
coverImg:
summary:
---

## 介绍
> Servlet 为创建基于 web 的应用程序提供了基于组件、独立于平台的方法，可以不受 CGI 程序的性能限制。Servlet 有权限访问所有的 Java API，包括访问企业级数据库的 JDBC API。

## 使用
```java
package responsetest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jdk.nashorn.internal.runtime.regexp.joni.Config;

public class ResponseTestDemo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ResponseTestDemo() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
            String username = request.getParameter("username");
		    String[] password = request.getParameterValues("password");
			request.setAttribute("name", "张三");
			request.setAttribute("age", "23");
            request.setCharacterEncoding("utf-8");
			request.getRequestDispatcher("xixi.jsp").forward(request, response);
            ServletOutputStream os = response.getOutputStream();
//			response.setContentType("text/html;charset=utf-8");
//			PrintWriter writer = response.getWriter();
//			writer.print("3秒后跳转至百度...");
//			response.z`("refresh", "3;url=http://www.baidu.com");
//			response.sendRedirect("http://www.baidu.com");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
```
+ request方法

|方法|释义|
|--|--|
|setAttribute||
|getRequestDispatcher||
|setCharacterEncoding||
|getParameterValues||

+ response方法

|方法|释义|
|--|--|
|setContentType||
|setCharacterEncoding||
|setHeader||
|sendRedirect||
|getWriter||
|getOutputStream||

## 乱码问题

### request请求乱码
> 在使用tomcat服务器中的servlet时,在输入中文时,表单的请求数据在servlet中接收的编码格式可能不正确.而这可能和表单提交的属性enctype以及提交的方法method相关.

#### 表单的enctype属性
+ 在表单提交中,表单的enctype属性默认为application/x-www-form-urlencoded,会将表单数据中非字母数字的字符转换成转义字符，如"%HH"，然后组合成这种形式key1=value1&key2=value2；所以后端在取数据后，要进行解码。
+ enctype取值为text/plain时,按照键值对排列表单数据key1=value1\r\nkey2=value2，不进行转义。
+ enctype也可取值为multipart/form-data,该类型用于高效传输文件、非ASCII数据和二进制数据，将表单数据逐项地分成不同的部分，用指定的分割符分割每一部分。每一部分都拥有Content-Disposition头部，指定了该表单项的键名和一些其他信息；并且每一部分都有可选的Content-Type，不特殊指定就为text/plain。

#### get请求乱码解决
1.在tomcat的配置文件中(config/service.xml)中添加connector属性URIEncoding="utf-8".
2.在接收request对象时使用设置解码格式,即可以先使用错误码表 ISO-8859-1 将用户名重新编码，然后使用码表 UTF-8 进行解码。再次对 RequestParamsServlet 进行修改.
```java
name = new String(name.getBytes("iso8859-1"),"utf-8");
```
#### post请求乱码
```java
reqest.setCharacterEncoding("utf-8")
```

### response乱码
> 在控制打印的数据"中国"显示没有问题,但是返回到页面上的数据出现乱码,显示??,产生乱码的原因是 response 对象的字符输出流在编码时采用的字符码表是 ISO-8859-1，该码表不兼容中文，会将“中国”编码为 63 63（在 ISO-8859-1 的码表中查不到的字符就会显示 63）。当浏览器对接收到的数据进行解码时，会采用默认的码表 GB2312，将 63 解码为?，因此，浏览器将“中国”两个字符显示为“??”.

![servlet的response编码流程](/images/servletEncodeProcess.jpg)

解决方法:首先告知servlet使用utf-8将数据进行编码发送,然后通知浏览器使用utf-8编码格式接收
```java
response.setCharacterEncoding("utf-8");
response.setHeader("Content-type","text/html;charset=utf-8");
//或使用下面代码,两种方式一样效果
response.setContentType("text/html;charset=utf-8");
```

## servlet转发
> 转发是服务器中的操作,浏览器是不知道的.
> 转发的资源必须是同一个应用下的资源,资源由pageContent/httpsession/servletContent携带.
> 转发的资源是一致的(request携带的数据相同)

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
    request.setAttribute("name", "张三");
    request.setAttribute("age", "23");
    //转发到jsp
    request.getRequestDispatcher("xixi.jsp").forward(request, response);
}
```
+ 此处的jsp路径在WebContent路径下,是相对路径,若以/开头则是绝对路径.
+ 虽然在servlet程序的位置并不在WebContent根目录,但是在tomcat运行时的路径是根目录(包名/应用名称),因此可以直接写文件名.

## servlet重定向和定时刷新
> 使用servlet重定向就是告知浏览器去重新请求给定路径.
> 重定向的资源不是共用的,因此无法携带首次请求的信息给新请求对象.
+ 重定向的资源来源没有限制,既可以为本服务器上的其他应用(**相对路径**)也可以是别的服务器上的应用,例如重定向到百度.
```java
PrintWriter writer = response.getWriter();
response.sendRedirect("http://www.baidu.com");
```
+ 定时刷新
```java
//设置编码格式防止response乱码
response.setContentType("text/html;charset=utf-8");
PrintWriter writer = response.getWriter();
writer.print("3秒后跳转至百度...");
response.setHeader("refresh", "3;url=http://www.baidu.com");
```

## jsp技术
> 应用场景:在长篇的html中嵌入合适的java代码逻辑

### 原理
> jsp首次执行会将其编译成servlet程序:==>>.java结尾的servlet程序==>>.class结尾的可执行字节码文件==>>输出完成编译转换的html文件给浏览器解析.

### 语法

+ <% Java可执行代码逻辑块; %>可嵌套html,解析时主动联系上下文解析.
```java
<%for(int i=0;i<5;i++){ %>
    <p>loop jsp <%= i %>...</p>
<% }%>
```

+ <%= java常量/变量值(**没有分号**) %>
```java
<P>姓名:<%= request.getParameter("username") %></P>
<P>密码:<%= request.getParameter("password") %></P>
<p>--------------------------------------------</p>
<P>查询姓名:<%= request.getParameter("name") %></P>
<P>查询密码:<%= request.getParameter("pwd") %></P>
```

+ 标签指令
> 常见指令例如@page/jstl等放入<%指令 %>就可以被解析执行了,@page声明的模块中可以声明代码块的语言(默认java)/导包/设定编码格式
```java
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
//注释
<%-- <%@page import="java.util.ArrayList"%> --%>
```
**在@page指令中一定要设定pagaEncoding="UTF-8",否则文件保存为默认编码格式,有可能出现乱码**

+ 标签技术EL,主要用来获取存储域中的数据(**map获取数据类似于js**)
```java
<% 
    HashMap<String,String> map = new HashMap<>();
    map.put("name","jack");
    map.put("gender","man");
    String[] list = {"杨超","张建明","朱远超"};
    request.setAttribute("map", map);
    request.setAttribute("list", list);
%>
${map.name }
${map.gender }
${list[1] }
```
### el标签
> 形式：${取值的名称}，若未指定则按照page>request>session>application的顺序依次查找最进的属性值。
> 作用：用来进行读取域中数据。
+ 常见el作用域与jstl作用域比较。
|jstl标签中的名称（scope属性值）|el取值的对象名称|jstl应用实例|e应用l实例|
|---|---|---|---|
|page|pageScope|	<c:set var="name" value="jackson" scope="page" />|${pageScope.xxx}|
|request|requestScope|	<c:set var="name" value="summer" scope="request" />|${requestScope.xxx}|
|session|sessionScope|	<c:set var="name" value="peter" scope="session" />|${sessionScope.xxx}|
|application|applicationScope|	<c:set var="name" value="lucy" scope="application" />|${applicationScope.xxx}|

+ 标签内计算，自动转换数据类型
```java
${param.count + 20}
//等价于
String str_count = request.getParameter("count");
int count = Integer.parseInt(str_count);
count = count + 20;
//加减乘除以及求余
${40+61-1*2 div 2 mod 2}===>>100.0
```

+ 隐含对象取值
```java
//取url上的参数值
${param.xxx}
//取url上同名的多个参数值
${paramValues.xxx}
//取cookie里面的值
<% 
    Cookie c = new Cookie("name","jack");
    response.addCookie(c);
%>
${cookie.name.value}
```
**cookie是el固定的名称**

+ 关系运算
|符号|说明|范例|结果|
|---|---|---|---|
|== 或 eq|等于|${5==5}或${5eq5}|true|
|!= 或 ne|不等于|${5!=5}或${5ne5}|false|
|< 或 lt|小于|${3或${3lt5}|true|
|> 或 gt|大于|${3>5}或{3gt5}|false|
|<= 或 le|小于等于|${3<=5}或${3le5}|true|
|>= 或 ge|大于等于|5}或${3ge5}|false|

### jstl技术
> 作用对域中数据遍历、赋值、修改、添加、判定显示等操作。
> 使用方法：1、引入standard.jar和jstl.jar两个jar包至WEB-INF/lib目录下。2、在要使用的jsp文件上声明，并规定标签使用前缀（一般使用c开头，表示core核心的意思。
```java
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

+ set添加和修改属性，添加/重新赋值普通的属性：var定义修改的名称，scope定义域范围，value赋值
+ set修改map等集合属性，target目标值，property目标值的属性名称，value想要赋的值
```java
<% 
    HashMap<String,String> map = new HashMap<>();
    map.put("name","阿凡达");
    map.put("nickname","小达达");
    request.setAttribute("map", map);
%>
<h2>set设置、修改域中的属性</h2>
<h3>添加域中属性</h3>
<c:set var="name" value="jackson" scope="page" />
<c:set var="name" value="peter" scope="session" />
<c:set var="name" value="lucy" scope="application" />
<c:set var="name" value="summer" scope="request" />
//修改request域中的name属性
<c:set var="name" value="peter" scope="request" />
<p>pageContent(default set into this scope)--------${name}</p>
<p>pageContent--------${pageScope.name}</p>
<p>request------------${requestScope.name}</p>
<p>session------------${sessionScope.name}</p>
<p>application--------${applicationScope.name}</p>
<h3>修改map属性值</h3>
<p>origin data</p>
${map.name}
${map.nickname}
<p>update data</p>
//修改map中的属性
<c:set target="${map}" property="name" value="阿凡提"  />
<c:set target="${map}" property="nickname" value="小提提"  />
<c:set target="${map }" property="nick" value="喜喜"/>
${map.name}
${map.nickname}
```

+ if条件判断,**注意没有else标签，只能结合el做条件取反代替else**
```java
<h2>if判定是否显示</h2>
	<c:if test="${213+843>1000}">yes</c:if>
	<c:if test="${!(213+843>1000)}">no</c:if>
```

+ forEach遍历
items==>>要遍历的集合对象， var==>>遍历的每一个对象， beging==>>遍历开始的数值， varStatus==>>遍历时的状态对象， step==>>遍历的步长（仅和begin结合有效）， end==>>结束的数值（和begin结合使用）
```java
<h2>forEach循环数组、集合等</h2>
<c:forEach items="${map}" var="item">
    ${item.key }
    ${item.getKey() }
    ${item.value }
    ${item.getValue() }
</c:forEach>
//遍历0~100，最后一位不要逗号。
<p>
<c:forEach begin="0" end="100" var="item" varStatus="status" step="2" >
    <c:if test="${item%2==0}">${item }</c:if>
    <c:if test="${!status.last }">,</c:if>
</c:forEach>
</p>
```
varStatus在遍历体里面有四个属性：
|属性名|释义|类型|
|--|--|--|
|index|元素下标，起始数值由**循环开始值**决定|数值|
|count|元素计数，从1开始|数值|
|first|是否第一个元素|Boolean|
|last|是否最后一个元素|Boolean|