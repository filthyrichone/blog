---
title: springMVC小结
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [springMVC]
categories:
  - [java]
date: 2021-02-21 13:58:29
author:
img:
coverImg:
summary:
---

## 简介
> springMVC是spring的一个基于servlet的一个web框架模块，用于开发web应用，主要由Dispatcher Servlet、ModelAndView、ViewRouter三部分组成，解决了多个接口对应多个servlet的问题，一个servlet对应所有接口访问。

## 配置依赖
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.noah</groupId>
	<artifactId>springMVCDemo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>
	<dependencies>
    <!-- 添加json依赖的依赖jackson，便于返回json数据 -->
		<dependency>
			<groupId>org.codehaus.jackson</groupId>
			<artifactId>jackson-core-asl</artifactId>
			<version>1.9.13</version>
		</dependency>
		<dependency>
			<groupId>org.codehaus.jackson</groupId>
			<artifactId>jackson-mapper-asl</artifactId>
			<version>1.9.13</version>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>2.8.0</version>
		</dependency>
	<!-- 单元测试 -->
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.10</version>
	</dependency>

	<!-- springMVC的jar包 -->
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-webmvc</artifactId>
		<version>4.1.3.RELEASE</version>
	</dependency>

	<!-- servlet 和 jsp的jar包 -->
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>servlet-api</artifactId>
		<version>2.5</version>
	</dependency>
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>jsp-api</artifactId>
		<version>2.0</version>
	</dependency>
</dependencies>
</project>
```

## 添加配置
> 在webapps下新建配置文件和文件夹：/WEB-INF/web.xml，并添加以下配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	version="2.5">
    <!-- 导航栏标题 -->
	<display-name>springMVCDemo</display-name>
    <!-- 首页 -->
	<welcome-file-list>
		<welcome-file>index.html</welcome-file>
		<welcome-file>index.htm</welcome-file>
		<welcome-file>index.jsp</welcome-file>
		<welcome-file>default.html</welcome-file>
		<welcome-file>default.htm</welcome-file>
		<welcome-file>default.jsp</welcome-file>
	</welcome-file-list>
    <!-- 配置DispatcherServlet和其他mvc相关配置位置 -->
	<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springmvc-config.xml</param-value>
		</init-param>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
    <!-- 配置CharacterEncodingFilter的编码格式，防止post提交的乱码 -->
	<filter>
		<filter-name>encodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
</web-app>
```
+ mvc配置,在source文件夹下创建即可
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/mvc
						http://www.springframework.org/schema/mvc/spring-mvc-4.0.xsd
						http://www.springframework.org/schema/beans
						http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
						http://www.springframework.org/schema/context
          				http://www.springframework.org/schema/context/spring-context-4.0.xsd">
    <!-- 1.配置前端控制器放行静态资源(html/css/js等，否则静态资源将无法访问) -->
    <mvc:default-servlet-handler/>
    <!-- 2.配置注解驱动，用于识别注解（比如@Controller） -->
    <mvc:annotation-driven></mvc:annotation-driven>
    <!-- 3.配置需要扫描的包：spring自动去扫描 base-package 下的类，
		如果扫描到的类上有 @Controller、@Service、@Component等注解，
		将会自动将类注册为bean 
	 -->
    <context:component-scan base-package="controller"></context:component-scan>
    <!-- 4.配置内部资源视图解析器
		prefix:配置路径前缀
		suffix:配置文件后缀
	 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" >
    	<property name="prefix" value="/WEB-INF/pages/"></property>
    	<property name="suffix" value=".jsp"></property>
    </bean>
</beans>
```

## 实例
> 通过@controller注解表名类在controller层，@RequestMapping("/路径名称")对应路径访问的处理方法。
```java
package controller;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.User;

@Controller
public class RequestDemo {
	@RequestMapping("/hello")
	public String detalHello(String name) {
		System.out.println(name+"spring-mvc request successfully!!!");
		ModelMap msp = new ModelMap();
		return "hello";
	}
	@RequestMapping("/entry")
	public String detalRequestEntry(User user) {
		System.out.println("user:"+user);
		return "forward:/hello";
	}
	@RequestMapping("/post")
	public String detalPostEncoding(String user,String like) {
		System.out.println("user:"+user+"like:"+like);
		return "redirect:/hello";
	}
	@RequestMapping("/date")
	public String detalDateFormat(Date date) {
		System.out.println("Date:"+date);
		return "hello";
	}
	@RequestMapping("/request")
	public String detalRequest(HttpServletRequest request) {
		request.setAttribute("request", "通过request添加属性值成功！！！");
		return "hello";
	}
	@RequestMapping("/model")
	public String detalModel(Model model) {
		model.addAttribute("model", "通过mvc的model传递属性值至jsp");
		return "hello";
	}
	
	@InitBinder
	public void InitBinder(ServletRequestDataBinder binder) {
		binder.registerCustomEditor(java.util.Date.class, 
				new CustomDateEditor(
						new SimpleDateFormat("yyyy-MM-dd"), true));
	}
	
	@RequestMapping("/json")
	@ResponseBody
	public List<User> detalResponseBodyJson(){
		ArrayList<User> list = new ArrayList();
//		User u = new User(1002, "张三");
		User user = new User();
		user.setId(1002);
		user.setName("张三");
		list.add(user);
		return list;
}
```

## 转发到jsp的四种方式

### 默认方式
> return String默认就是查找对应String名称的jsp来进行数据的处理
```java
@RequestMapping("/hello")
public String detalHello(String name) {
    System.out.println(name+"spring-mvc request successfully!!!");
    ModelMap msp = new ModelMap();
    return "hello";
}
```
### redirect:/+路径名
```java
@RequestMapping("/post")
public String detalPostEncoding(String user,String like) {
    System.out.println("user:"+user+"like:"+like);
    return "redirect:/hello";
}
```
post乱码问题可通过配置web.xml的CharacterEncodingFilter类解决

### forward:/+路径名
```java
@RequestMapping("/entry")
public String detalRequestEntry(User user) {
    System.out.println("user:"+user);
    return "forward:/hello";
}
```

### 转发到对应方法
> 可以return对应方法。
```java
@RequestMapping("/doorList")
public String doorList(Model model) {
    List<Door> list = doorService.findAll();
    model.addAttribute("list",list);
    for (Door door : list) {
        System.out.println(door);
    }
    return "door_list";
}
@RequestMapping("/doorAdd")
public String doorAdd(String name,String addr,String tel,Model model) {
    Door doorItem = new Door(null, name, tel, addr);
    Integer rows = doorService.add(doorItem);
    //转发到对应方法
    return doorList(model);
}
```

## 注解方式使用mvc
> springmvc的加载方式有两种，一种是通过配置文件xml，另一种注解方式，利用了mvc的文件加载在配置了没有web.xml时，默认读取spring-web依赖文件下的META-INF/services/javax.servlet.ServletContainerInitializer类的特性。

![ServletContainerInitializer文件位置](/images/springMVC/ServletContainerInitializer.png)
![springmvc的两种加载配置方式](/images/springMVC/twoLoadType.png)

+ xml配置文件：WEB-INF下web.xml配置DispatcherServlet和对应的映射路径，读取配置文件springmvc-config中的配置，例如：controller包管理、静态资源访问控制、视图解析器ViewResolver、mvc自动注册注解配置等。

![mvc的解析大体过程](/images/springMVC/springmvcRunDetail.png)

+ 注解加载的方式，利用了mvc的文件加载在配置了没有web.xml时，默认读取spring-web依赖文件下的META-INF/services/javax.servlet.ServletContainerInitializer类，此类会自动加载Spring框架的SpringServletContainerInitializer类，而这个initializer又会自动加载WebApplicationInitializer以及它的实现类的特性，我们只需要继承WebApplicationInitializer类即可完成替代web.xml文件。

![注解方式使用mvc大致过程](/images/springMVC/springmvcAnnotationTypeRun.png)

1、首先在pom.xml文件中设置忽略web.xml文件的检查（可以为空）,即设置buil标签（与dependencies平级）。
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <filteringDeploymentDescriptors>false</filteringDeploymentDescriptors>
            </configuration>
        </plugin>
    </plugins>
</build>
```
2、添加容器类，以此类来替代sprigmvc-config.xml文件的作用。
```java
@ComponentScan("controller")
@EnableWebMvc
@Configuration
public class springmvcConfig implements WebMvcConfigurer {
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/pages/", ".html");
    }
}
```
3、添加自定义WebApplicationInitializer实现类（因为AbstractAnnotationConfigDispathcherServletInitializer类实现了大部分的WebAplicationInitializer类的方法，所以继承它），重写url-handler处理，springmvc-config文件配置，以及spring上下文的配置方法。
```java
public class AppWebApplicationInitalizer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{springmvcConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"*.do"};
    }
}
```

## FAQ

### Date类型的-连接符传值报错
> 添加@InitBinder，创建自定义时间解析日期
```java
@InitBinder
public void InitBinder(ServletRequestDateBinder binder){
    binder.registerCustomEditor(java.util.Date.calss,
    new CustomDateEditor(
        new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),true))
}
```
**注意**
1、日期格式的设定要和传入的格式相同，否则报错，例如只穿年月日，就只要设定年月日的格式，否则报错。
2、默认的时间间隔标识符为/

### 返回json数据报错
> 未添加json转换数据====>>添加jackson转换jar包即可
```xml
<dependency>
    <groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-core-asl</artifactId>
    <version>1.9.13</version>
</dependency>
<dependency>
    <groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-mapper-asl</artifactId>
    <version>1.9.13</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.8.0</version>
</dependency>
```
```java
@RequestMapping("/json")
@ResponseBody
public List<User> detalResponseBodyJson(){
    ArrayList<User> list = new ArrayList();
	User u1 = new User(1002, "张三");
    User user = new User();
    user.setId(1002);
    user.setName("张三");
    list.add(user);
    list.add(u1);
    return list;
} 
```