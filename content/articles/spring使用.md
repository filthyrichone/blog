---
title: spring使用
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [spring]
categories:
  - [java]
date: 2021-02-21 13:58:03
author:
img:
coverImg:
summary:
---

## spring简介
Spring框架就像一个家族，有众多衍生产品例如boot、security、jpa等等。但他们的基础都是Spring的ioc和aop。ioc提供了依赖注入的容器，aop解决了面向横切面的编程；

![spring工作示意图](/images/spring/springWork.png)
![spring产品架构](/images/spring/springProduct.png)
![spring技术架构](/images/spring/springFramwork.png)
![springApi示意图](/images/spring/springApi.png)

## 添加项目依赖
+ 直接复制相应jar包
+ 通过maven修改pom.xml配置文件
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.noah</groupId>
	<artifactId>SpringDemo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<dependencies>
		<!-- 单元测试 -->
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.10</version>
		</dependency>
		<!-- 整合log4j -->
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
			<version>1.6.4</version>
		</dependency>
		<!-- Servlet/JSP/JSTL -->
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
		<dependency>
			<groupId>jstl</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
		<!-- 整合spring框架（包含springmvc） 这个jar文件包含springmvc开发时的核心类, 同时也会将依赖的相关jar文件引入进来(spring的核心jar文件也包含在内) -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>4.1.3.RELEASE</version>
		</dependency>
		<!--这个jar文件包含对Spring对JDBC数据访问进行封装的所有类 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>4.1.3.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aspects</artifactId>
			<version>4.1.3.RELEASE</version>
		</dependency>
		<!-- 整合mybatis框架 -->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.2.8</version>
		</dependency>
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>1.2.2</version>
		</dependency>
		<!-- mysql驱动 -->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.32</version>
		</dependency>
		<!-- druid连接池 -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.1.6</version>
		</dependency>
	</dependencies>
</project>
```

## IOC控制反转
> 将创建和销毁对象的控制权交给spring容器来完成，用户不必再自行创建和销毁对象，只要在对应的配置文件中配置好即可。
> 优点是可以解耦模块的依赖程度.
> 主要通过文件遍历读取和反射实现对象管理
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
	http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.0.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.0.xsd
	http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-4.0.xsd">
	<bean id="stu" scope="single" class="pojo.Stu" >
<!-- 	<bean id="stu" scope="prototype" class="pojo.Stu" > -->
		<property name="id" value="1005" ></property>
		<property name="name" value="张三" ></property>
		<property name="userInfo" ref="userInfo"  ></property>
	</bean>	
	<bean id="userInfo" scope="singleton" class="pojo.userInfo" >
		<property name="name" value="
" ></property>
	</bean>
</beans>
```
在maven工程的source下新建applicationContext.xml即可。
## DI依赖注入
> 在创建了对象之后要进行对象的属性的相关配置就用到了依赖注入，依赖注入属性的方式有两种。

+ 通过构造方法注入依赖
```xml
<bean id="userInfo" scope="singleton" class="pojo.userInfo" >
    <!-- <property name="name" value="" ></property> -->
    <constructor-arg name="name" value="捷克夹"></constructor-arg>
</bean>
```
+ 通过对象属性的getter/setter方法来实现
```xml
<bean id="stu" scope="singleton" class="pojo.Stu" >
<!-- 	<bean id="stu" scope="prototype" class="pojo.Stu" > -->
    <property name="id" value="1005" ></property>
    <property name="name" value="张三" ></property>
    <property name="userInfo" ref="userInfo"  ></property>
</bean>
```
1、bean标签的属性name对应要管理对象的属性名称，value对应要设置的属性名称，ref表示引用另一个管理的bean标签对象。
2、通过spring管理的javaBean对象标签上的scope属性代表了管理模式，singleton表示单例模式，即只创建一个对象，这样有线程安全的问题，对于公共数据要加锁。
3、通过设置bean标签的scope为prototype可以改变单例模式，变成引用一次创建一次对象，会有资源浪费的问题。

## 注解方式实现Ioc管理
> 由AnnotationConfigApplicationContext类创建对象，获取IOC容器管理的对象。

|注解|作用对象|释义|
|---|---|---|
|@Controller|类|标记类为Controller类，业务bean对象，交给spring的Ioc容器管理|
|@Service[(String name)]|类|标记类为service类，数据操作bean对象爱国你，交给spring的Ioc容器管理|
|@Repository[(String name)]|类|标记类为Repository类，数据存储bean对象，交给spring的Ioc容器管理|
|@Component[(String name)]|类|标记类为Component类，普通bean对象，交给spring的Ioc容器管理|
|@Bean(valu = "name",init-method="",...property)|方法|将方法的返回值对象交给spring的Ioc容器管理|
|@Autowired|set方法、构造方法、成员变量、其他方法|自动将所需要的值从IOC容器中查找到并注入标记的对象中|
|@PostContruct|方法|表示将标记的方法放置在构造函数之后自动执行，相当于xml的init-method标记的方法|
|@ComponentScan|类|加载配置类上，默认的值表示要扫描的包路径（String []，可以是单个String）|
|@lazy|方法|与@Bean注解结合表示是否要懒加载，默认值是true|

+ 整合外部资源@Bean注解
```java
@ComponentScan("entries")
public class SpringConfig {
    @Lazy(false)
    @Bean(value="dataSource",initMethod = "init")//等效于@Controller\@Service等注解
    public DruidDataSource generateDataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql:///jt_db?characterEncoding=utf-8");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }
}
```
**注意：**可以不用与@ComponentScan结合使用

+ 自定义存储类@ComponentScan+@Component+@postConstruct，**存储类的读写要考虑线程安全的问题（单例模式，加锁）**
```java
@Component("cache")
public class LruCacheDemo implements Cache {
    private LinkedHashMap<String,Object> cache;
    private Integer maxCap = 3;
//    不能使用有参构造
//    public LruCacheDemo(int maxCap){
//        this.maxCap = maxCap;
//    }

    @PostConstruct
    private void init(){
        cache = new LinkedHashMap<String,Object>(maxCap, 0.75f, true){
            @Override
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return (size()>maxCap);
            }
        };
    }

    public synchronized void put(String key,Object obj){
        cache.put(key,obj);
    }

    public synchronized Object get(String key){
        return cache.get(key);
    }

    @Override
    public String toString() {
        return "LruCacheDemo{" +
                "cache=" + cache +
                '}';
    }
}
```

+ 自定义操作数据类@ComponentScan+@Repository+@Autowired
```java
@Repository("searchDao")
public class DefaultSearchDao {
    @Autowired
    private Cache cache;
    @Autowired
    private DataSource datasource;

    @Override
    public String toString() {
        return "DefaultSearchDao{" +
                "cache=" + cache +
                ", datasource=" + datasource +
                '}';
    }

    public void setCache(Cache cache) {
        this.cache = cache;
    }

    public void setDatasource(DataSource datasource) {
        this.datasource = datasource;
    }
}
```

## springIOC核心原理

+ Bean对象创建过程xml方式
> 通过ResourceLoader加载读取的流，与new SqlSessionFactory.Build()以及DocumentBuildFactory.newInstance().newDocumentBuilder().parse()类似。然后通过BeandefinitionReader,将封装定义信息至map<String key,Object BeanDefinition>，并将此map交给Beanfactory对象。

![spring初始化过程](/images/spring/Beanfactory.png)

+ IOC容器map两大map对象

![xml方式](/images/spring/xmlCreate.png)
![注解方式](/images/spring/annotationCreate.png)

+ Bean对象的创建方式：实现了FactoryBean接口的使用getObject方法创建，未实现FacotryBean接口则使用构造方法。

![Bean对象创建方式](/images/spring/beanCreatMethod.png)

**说明：**一般在创建一些相对复杂的工厂对象时，通常会写一个工厂bean对象，然后基于工厂bean对象创建具体的工厂对象，例如SqlSessionFactoryBean,ShiroFilterFactoryBean，ProxyFactoryBean等。

+ IOC依赖注入项目中的体现

![项目中的依赖注入体现](/images/spring/projectDIDiagram.png)

**注意：**在项目中为了解耦合，对象直接通过接口进行通信，即对象耦合于接口(@Autowired自动注入)

![对象和接口的耦合](/images/spring/ObjectInterfaceCommunication.png)