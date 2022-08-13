---
title: SSM框架整合
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [SSM框架整合]
categories:
  - [java]
date: 2021-02-21 13:59:04
author:
img:
coverImg:
summary:
---

## 配置
> 配置路径：添加WEB-INF/web.xml文件，配置springmvc-config.xml和applicationContext.xml配置mybatis-config.xml,配置对应Mapper.xml文件

### web.xml配置
> 主要配置四个地方：tomcat的默认servlet匹配静态资源、资源编码CharacterEncodingFilter、DispatcherServlet以及默认错误页面
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	version="2.5">
	<display-name>yonghe-ssm</display-name>
	<welcome-file-list>
		<welcome-file>index.html</welcome-file>
		<welcome-file>index.htm</welcome-file>
		<welcome-file>index.jsp</welcome-file>
		<welcome-file>default.html</welcome-file>
		<welcome-file>default.htm</welcome-file>
		<welcome-file>default.jsp</welcome-file>
	</welcome-file-list>
    <!-- 默认错误处理页面 -->
	<error-page>
		<error-code>404</error-code>
		<location>/WEB-INF/pages/error.jsp</location>
	</error-page>
	<error-page>
		<error-code>500</error-code>
		<location>/WEB-INF/pages/error.jsp</location>
	</error-page>
    <!-- DispatcherServlet配置 -->
	<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
            <!-- 配置对应mvc其他配置的位置，整合spring的配置文件 -->
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:spring/*.xml</param-value>
		</init-param>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
    <!-- 默认servlet配置静态资源访问 -->
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.jpg</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.png</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.gif</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.svg</url-pattern>
	</servlet-mapping>
    <!-- 字符编码CharacterEncodingFilter配置 -->
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

### 配置spring文件
> 主要有两个文件spring的配置文件applicatoinContext和springMVC的配置文件springMVC-config的文件
```xml
+ springmvc-config.xml
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
	<!-- 2.启用默认配置, 配置注解驱动，用于识别注解（比如@Controller） -->
	<mvc:annotation-driven></mvc:annotation-driven>
	<!-- 3.配置需要扫描的包：spring自动去扫描 base-package 下的类，
		如果扫描到的类上有 @Controller、@Service、@Component等注解，
		将会自动将类注册为bean 
	 -->
	<context:component-scan base-package="com.tedu.controller">
	</context:component-scan>
	<!-- 4.配置内部资源视图解析器
		prefix:配置路径前缀
		suffix:配置文件后缀
	 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/WEB-INF/pages/"/>
		<property name="suffix" value=".jsp"/>
	</bean>
</beans>        			
```
+ applicationContext.xml
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
	http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.3.xsd 
	http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
	http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-4.3.xsd">
    <!-- 引入jdbc的属性文件 -->
	<context:property-placeholder location="classpath:jdbc.properties" />
    <!-- 将SqlSessionFactory的创建交给spring完成 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean" >
		<property name="configLocation" value="classpath:mybatis/mybatis-config.xml" ></property>
		<property name="dataSource" ref="dataSource"></property>
		<property name="mapperLocations" value="classpath:mybatis/Mapper/*.xml" ></property>
	</bean>
    <!-- druid连接池对象配置 -->
	<bean id="dataSource"  class="com.alibaba.druid.pool.DruidDataSource" >
		<property name="driverClassName" value="${driverClassName}"></property>		
		<property name="url" value="${url}"></property>		
		<property name="username" value="${jdbc.username}"></property>		
		<property name="password" value="${password}"></property>		
	</bean>
	<!-- 定义mapper接口扫描器
		如果bean标签上没有id,默认id值是当前类的类名,首字母小写
		扫描 com.tedu.dao包下的所有接口,由框架负责提供接口的子类
		由spring容器负责创建接口的子类实例(spring会将创建好的接口子类实例存到map中)
	 -->
	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
		<!-- 扫描所有XxxMapper接口，将接口实例的创建交给spring容器 -->
		<property name="basePackage" 
			value="com.tedu.dao"/>
	</bean>
    <!-- 同上，service接口扫描器 -->
	<context:component-scan base-package="service"></context:component-scan>
</beans>
```

### 配置mybatis
+ mybatis-config.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- MyBatis的全局配置文件 -->
<configuration >
	<!-- 将开发环境配置和导入mapper文件的配置移除,在spring的配置文件中进行配置 -->
</configuration>
```

+ mapper配置模板
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 门店表的映射文件	namespace值为对应接口的全路径 -->
<mapper namespace="com.tedu.dao.DoorMapper">
	<!-- 1.查询所有门店信息，id值为对应接口中方法的名字
		resultType指定将查询的结果封装到哪个pojo对象中
	 -->
	<select id="findAll" resultType="com.tedu.pojo.Door">
		select * from tb_door
	</select>
	<!-- 2.根据id删除门店信息 -->
	<delete id="deleteById">
		delete from tb_door where id=#{id}
	</delete>
	<!-- 3.新增门店信息 -->
	<insert id="add">
		insert into tb_door value
		(null,#{name},#{tel},#{addr})
	</insert>
	<!-- 4.根据id查询门店信息 -->
	<select id="findById" resultType="com.tedu.pojo.Door">
		select * from tb_door where id=#{id}
	</select>
	<!-- 5.根据id修改门店信息 -->
	<update id="updateById">
		update tb_door set name=#{name},
		tel=#{tel},addr=#{addr}
		where id=#{id}
	</update>
</mapper>
```
## 使用
> 使用要新建pojo下的实例和mapper对应的sql文件dao下的对应文件，然后新建service对应接口以及实现类，最后在controller类中调用对应的service实现类的方法即可。

### contoller类
```java
package controller;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import pojo.Door;
import pojo.Order;
import service.DoorServiceImpl;
import service.OrderServiceImpl;

@Controller
public class OrderController {
	@Autowired
	private OrderServiceImpl orderServ;
	@Autowired
	private DoorServiceImpl doorServ;
	
	@RequestMapping("/orderList")
	public String orderList(Model model) {
		List<Order> ol = orderServ.orderFindAll();
		List<Door> dl = doorServ.findAll();
		model.addAttribute("order",ol);
		model.addAttribute("dl",dl);
		return "order_list";
	}
	@RequestMapping("/orderUpdate")
	public String orderUpdate(Order order) {
		orderServ.orderUpdateById(order);
		return "forward:/orderList";
	}
	@RequestMapping("/toOrderAdd")
	public String toOrderAdd(Model model) {
		List<Door> list = doorServ.findAll();
		model.addAttribute("door",list);
		return "order_add";
	}
	
	@RequestMapping("/orderInfo")
	public String orderInfo(Integer id,Model model) {
		Order ol = orderServ.orderFindById(id);
		List<Door> dl = doorServ.findAll();
		model.addAttribute("ol",ol);
		model.addAttribute("dl",dl);
		return "order_update";
	}
	
	@RequestMapping("/orderDelete")
	public String orderDelete(Integer id,Model model) {
		orderServ.orderDeleteById(id);
		return "redirect:/orderList";
	}
	
	@RequestMapping("/orderAdd")
	public String orderAdd(Order order,Model model) {
		Integer rows = orderServ.orderAdd(order);
		return orderList(model);
	}
	@InitBinder
	public void InitBinder(ServletRequestDataBinder binder) {
		binder.registerCustomEditor(java.util.Date.class,
				new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
	}
}
```
### service类
+ 接口
```java
package service;
import java.util.List;
import pojo.Order;
public interface OrderService {
	public List<Order> orderFindAll();
	public Order orderFindById(Integer id);
	public Integer orderDeleteById(Integer id);
	public Integer orderUpdateById(Order order);
	public Integer orderAdd(Order order);
}
```
+ 实现类
```java
package service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dao.OrderMapper;
import pojo.Order;
@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderMapper dao;
	
	public List<Order> orderFindAll() {
		List<Order> list = dao.orderFindById();
		return list;
	}

	public Order orderFindById(Integer id) {
		Order list = dao.orderFindById(id);
		return list;
	}

	public Integer orderDeleteById(Integer id) {
		Integer rows = dao.orderDeleteById(id);
		return rows;
	}

	public Integer orderUpdateById(Order order) {
		Integer rows = dao.orderUpdateById(order);
		return rows;
	}

	public Integer orderAdd(Order order) {
		Integer rows = dao.orderAdd(order);
		return rows;
	}
}
```
### dao对应接口
```java
package controller;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import pojo.Door;
import pojo.Order;
import service.DoorServiceImpl;
import service.OrderServiceImpl;
@Controller
public class OrderController {
	@Autowired
	private OrderServiceImpl orderServ;
	@Autowired
	private DoorServiceImpl doorServ;
	
	@RequestMapping("/orderList")
	public String orderList(Model model) {
		List<Order> ol = orderServ.orderFindAll();
		List<Door> dl = doorServ.findAll();
		model.addAttribute("order",ol);
		model.addAttribute("dl",dl);
		return "order_list";
	}
	@RequestMapping("/orderUpdate")
	public String orderUpdate(Order order) {
		orderServ.orderUpdateById(order);
		return "forward:/orderList";
	}
	@RequestMapping("/toOrderAdd")
	public String toOrderAdd(Model model) {
		List<Door> list = doorServ.findAll();
		model.addAttribute("door",list);
		return "order_add";
	}
	
	@RequestMapping("/orderInfo")
	public String orderInfo(Integer id,Model model) {
		Order ol = orderServ.orderFindById(id);
		List<Door> dl = doorServ.findAll();
		model.addAttribute("ol",ol);
		model.addAttribute("dl",dl);
		return "order_update";
	}
	
	@RequestMapping("/orderDelete")
	public String orderDelete(Integer id,Model model) {
		orderServ.orderDeleteById(id);
		return "redirect:/orderList";
	}
	
	@RequestMapping("/orderAdd")
	public String orderAdd(Order order,Model model) {
		Integer rows = orderServ.orderAdd(order);
		return orderList(model);
	}
	@InitBinder
	public void InitBinder(ServletRequestDataBinder binder) {
		binder.registerCustomEditor(java.util.Date.class,
				new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
	}
}
```

### mapper对应xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="dao.OrderMapper" >
	<sql id="cols">o.id,door_id doorId,order_no orderNo,order_type orderType,pnum,cashier,order_time orderTime,pay_time payTime,pay_type payType,price</sql>
	<select id="orderFindById" resultType="pojo.Order">
		select <include refid="cols"></include> from tb_order o left join tb_door d on o.door_id=d.id
		<if test="null != id">
			 having o.id=#{id}
		</if>
	</select>
	<delete id="orderDeleteById">
		delete from tb_order 
		<where>
			<if test="null != id">
				id=#{id}
			</if>
		</where>
	</delete>
	<update id="orderUpdateById">
		update tb_order 
		<set>
			<if test="null != doorId">
				door_id=#{doorId},
			</if>
			<if test="null != orderNo">
				order_no=#{orderNo},
			</if>
			<if test="null != orderType">
				order_type=#{orderType},
			</if>
			<if test="null != pnum">
				pnum=#{pnum},
			</if>
			<if test="null != cashier">
				cashier=#{cashier},
			</if>
			<if test="null != orderTime">
				order_time=#{orderTime},
			</if>
			<if test="null != payType">
				pay_type=#{payType},
			</if>
			<if test="null != payTime">
				pay_time=#{payTime},
			</if>
			<if test="null != price">
				price=#{price},
			</if>
		</set>
		<where>
			<if test="null != id">
				id=#{id}
			</if>
		</where>
	</update>
	<insert id="orderAdd">
		insert into tb_order values(null,#{doorId},#{orderNo},#{orderType},
		#{pnum},#{cashier},#{orderTime},#{payTime},#{payType},#{price});
	</insert>
</mapper>
```

## 框架整合
> 个人理解整合spring和springmvc以及mybatis主要就是将mybatis的SqlSessionFactory的创建，springmvc的视图解析器internalResourceViewResolver交给spring来管理。并且要配置相关包注册扫描：

+ spring配置的头文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true"
       xmlns="http://www.springframework.org/schema/beans"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd
       http://www.springframework.org/schema/util
       http://www.springframework.org/schema/util/spring-util.xsd
       http://www.springframework.org/schema/context
      http://www.springframework.org/schema/context/spring-context.xsd">
</beans>
```

+ 数据存储相关：
    1、包扫描配合@Repository注解（对dao的实现类要手动添加，MapperScannerConfigurer不会自动添加）
    2、mapper自动扫描器MapperScannerConfigurer
    3、SqlSessionFactory创建（依靠SqlSessionFactoryBean类）
    4、数据库线程池druid
    5、线程池相关配置property对象的引入
```xml
<util:properties id="cfg" location="classpath:db.properties"></util:properties>
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="#{cfg.jdbcDriver}"></property>
    <property name="url" value="#{cfg.jdbcUrl}"></property>
    <property name="username" value="#{cfg.jdbcUser}"></property>
    <property name="password" value="#{cfg.jdbcPassword}"></property>
</bean>
<bean id="SqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <property name="mapperLocations" value="classpath*:mapper/sys/*.xml"></property>
</bean>
<bean id="daoScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.db.sys.**.dao"></property>
    <property name="sqlSessionFactoryBeanName" value="SqlSessionFactory"></property>
</bean>
<context:component-scan base-package="com.db.sys.dao.Impl" />
```
+ 业务层相关：服务层包扫描配合@Service注解
```xml
<context:component-scan base-package="com.db.sys.service"></context:component-scan>
```

+ web访问相关：
    1、包扫描==》Controller类
    2、视图解析器InternalResourceViewResolver配置
    3、静态资源访问mvc:default-servlet-handler==》》tomcat默认配置原因，对html文件的转发问题，需要添加此配置。
    4、访问返回资源格式转发及mvc请求转发mvc:annotation-driven，会自动注册jackson格式转换，RequestMappingHandlerMapping以及RequestMappingHandlerAdapter便于DispatcherServlet前端控制器的资源转发。
```xml
<mvc:default-servlet-handler></mvc:default-servlet-handler>
<context:component-scan base-package="com.db.sys.controller"></context:component-scan>
<mvc:annotation-driven></mvc:annotation-driven>
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/pages/"></property>
    <property name="suffix" value=".html"></property>
</bean>
```

![springmvc控制示意图](/images/ssm/springmvcRunDiagram.png)
![spring配置总体流程](/images/ssm/allConfiguration.png)
**注意：**框架总体来讲就是接口耦合，然后由spring来注入默认的实现类

+ 最后将配置导入一个总体的spring配置文件spring-config，由此文件将spring配置交给web.xml，由前端控制器来控制资源的配套使用。
```xml
<import resource="spring-web.xml"></import>
<import resource="spring-service.xml"></import>
<import resource="spring-reporitory.xml"></import>
```
### 常见注解
|注解|作用|作用域|
|---|---|---|
|@RequestMapping(String path)|注册@Controller类的handler类映射key|类——父路径，方法都会加上此path，方法|
|@PostMapping|注册Post方式的请求mapper映射key|方法|
|@GetMapping|注册get方式的请求key|方法|
|@ResponseBody|方法返回值作为服务返回值，不转发到视图解析器|方法|
|@ResController|@Controller+@ResponseBody结合，类下所有方法都不转发到视图解析器，方法返回值作为结果|类|
|@Qualifier(Sting beanKey)|与@Autowired结合使用，指定同一个接口多个实现类的情况下，具体注入的实体类|类、方法、成员变量|
|@RequestParam(String ParamName)|自动解析请求带的同名参数至对应类型的方法形参上|方法形参|
|@ControllerAdvice|处理整个Controller类上的异常（理解为拦截器？），配合@ExceptionHandler使用|类|
|@ExceptiontionHandler(Class<Exception> cls)|统一处理某种类型的异常（根据cls来）|方法|
|@Param(String mapkey)|将此形参的值封装至mapkey为key的参数map中|方法形参前|

**总结：**
1、框架接口耦合，spring自动DI实现类
2、业务层接口自定义，可调用多个dao接口实现业务
3、定义业务实体类，封装业务查询到的结果
4、定义返回值实体类，封装查询业务值（包含状态码，massage，数据等信息）
5、定义Contoller类的全局异常处理类，统一处理异常
6、根据业务自定义异常，便于捕获自定义特殊异常

## FAQ

### 报错找不到bean
> 1、可能是注册的类名与获取的不一致
  2、可能是做接口依赖，实现DI时注入的实现类不是申明的实现类===》没有继承声明类。

### mybatis报没有getter错误
> 检查对应实体类entity中的属性名称是否和xml配置文件的列名称相同

### mybatis报Parameter过多。
> Parameter index out of range (11 > number of parameters, which is 10).===》》》检查xml的sql语句中是否有注释，去掉即可。

### 对象的getter、setter 
序列化对象和json转换时，需要用到getter、setter，因此需要提前设定好，不能为空。

### dao和xml文件
> mapper.xml文件的名称和dao接口名称可以不一致，（要根据xml的namespace来），但是获取bean对象必须的名称首字母要小写===》》设定的mapperScannerConfigurer自动将首字母小写注册成管理的bean对象。

### 单个参数提示没有getter/setter
> 添加@Param(参数名称)
```java
public Order orderFindById(@Param("id")Integer id);
public Integer orderDeleteById(@Param("id")Integer id);
```

### sql的下划线变量名和java的驼峰
> 修改对应mapper:读取和存储使用别名取值。
```xml
<!-- 读取 -->
<sql id="cols">o.id,door_id doorId,order_no orderNo,order_type orderType,pnum,cashier,order_time orderTime,pay_time payTime,pay_type payType,price</sql>
<select id="orderFindById" resultType="pojo.Order">
    select <include refid="cols"></include> from tb_order o left join tb_door d on o.door_id=d.id
    <if test="null != id">
            having o.id=#{id}
    </if>
</select>
<!-- 存贮 -->
<update id="orderUpdateById">
    update tb_order 
    <set>
        <if test="null != doorId">
            door_id=#{doorId},
        </if>
        <if test="null != orderNo">
            order_no=#{orderNo},
        </if>
        <if test="null != orderType">
            order_type=#{orderType},
        </if>
        <if test="null != pnum">
            pnum=#{pnum},
        </if>
        <if test="null != cashier">
            cashier=#{cashier},
        </if>
        <if test="null != orderTime">
            order_time=#{orderTime},
        </if>
        <if test="null != payType">
            pay_type=#{payType},
        </if>
        <if test="null != payTime">
            pay_time=#{payTime},
        </if>
        <if test="null != price">
            price=#{price},
        </if>
    </set>
    <where>
        <if test="null != id">
            id=#{id}
        </if>
    </where>
</update>
```

### 通用（默认）路径设置
```java
@RequestMapping("{page}")
public String page(@PathVariable String page) {
    return page;
}
```

### sql错误access denied for user 'root'@'localhost'
> 多半是数据库的连接时用户名或密码错误，检查jdbc的配置文件中**username、password关键词**，修改名称即可

### no such bean inXXX，not Availa。。。
> 检查名称是否注册正确（第一个字母小写），检查是否配置了扫描该包。
