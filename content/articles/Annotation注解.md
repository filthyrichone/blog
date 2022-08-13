---
title: Annotation注解
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [Annotation]
  - [注解]
categories:
  - [java]
date: 2021-01-03 00:32:55
author:
img:
coverImg:
summary:
---

## 1、定义
> 注解是用来给类/方法/变量添加额外的信息或处理的方法的工具，通常通过配合使用java的反射来实现具体的功能。

## 2、自定义注解及使用

### 2、1自定义注解
> 使用关键字@interface（类似class或interface）即可自定义一个注解，通常在自定义个的注解上需要添加@Target注解和@Retation注解来指定自定义注解的适用范围和保留层级。
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomerAnnotation {
	int id() default 0;

	String title() default "";

	String value() default "";
}
```
|注解|作用|参数|
|--|--|--|
|@Target|限定注解适用的范围|ElementType.METHOD\|FIELD\|Constructor...|
|@Retation|指定注解保留的层级|RetentionPolicy.RUNTIME（保存至运行期）\|SOURCE（字节文件，不会保存到运行期）\|CLASS（保存到编译阶段）...|
+ 定义注解不设置默认值会要求使用时必须写，否则报错

### 2、2自定义注解使用
> 在指定类型上加上@+自定义注解名称，赋值使用=（变量的赋值方法）
```java
@CustomerAnnotation("测试方法a")
private void a() {
    System.out.println("测试方法a");
}

@CustomerAnnotation()
private void b() {
    System.out.println("测试方法b");
}

@CustomerAnnotation(id = 1)
private void c() {
    System.out.println("测试方法c");
}

@CustomerAnnotation(id = 2, title = "测试方法d")
private void d() {
    System.out.println("测试方法d");
}
```
### 2、3自定义注解运行
> 自定义的注解要运行要自定义执行，通过反射实现特定功能
```java
private static void launch(Class<TestCustomerAnnotation> c) {
    try {
        TestCustomerAnnotation isc = c.newInstance();
        Method[] ml = c.getDeclaredMethods();
        for (Method method : ml) {
            method.setAccessible(true);
            if (method.isAnnotationPresent(CustomerAnnotation.class)) {
                CustomerAnnotation annotation = method.getAnnotation(CustomerAnnotation.class);
                System.out.println(
                        "id:" + annotation.id() + " title:" + annotation.title() + " value:" + annotation.value());
                method.invoke(isc);
            }
            System.out.println("---------------------------------");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```
|api|释义|返回值|
|--|--|--|
|mehodObj/FieldObj/ClassObj.isAnnotationPresent(Class<?> Annotation.class)|判定指定对象上是否出现指定注解|出现指定注解返回true，否则false|
|mehodObj/FieldObj/ClassObj.getAnnotation(Class<?> Annotation.class)|获取指定对象上的指定注解|指定注解的类对象|
|AnnotationObj.paramName()|获取标注在对象上的指定param属性名的注解值|注解值|
+ 获取注解的属性值采用方法调用
**注解默认的赋值（不写属性值名称会赋给注解的value值）**

### 应用
+ 通过自定义注解和反射以及文件操作完成加载指定路径的类文件。
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface MyComponentScan{
	String value();
}
@MyComponentScan("annotatonTest")
public class AnnotationFileloader {
	public static void main(String[] args) {
		Class<?> c = AnnotationFileloader.class;
		MyComponentScan an = c.getAnnotation(MyComponentScan.class);
		String packageName = an.value();
		String url = ClassLoader.getSystemResource(packageName).getPath();
		File f = new File(url);
		File[] lf = f.listFiles();
		for (File file : lf) {
			System.out.println(file.getName());
		}
	}
}
```
|方法|释义|返回值|
|---|---|---|
|ClassLoader.getSystemResource(String packageName)|通过ClassLoader加载类对象，获取对应的资源路径|Url类型的类的对象|
|UrlObj.getPath()|获取Url对象的路径|String类型的类绝对路径|

+ 通过**注解**和**反射**以及**泛型**模拟创建一个工厂类容器对象，存贮指定注解标注的类对象。
```java
public class MyBeansFactory {
	private HashMap<String, Object> map = new HashMap<String, Object>();
	private void newInstance(Class<?> cls) throws Exception{
		MyService an = cls.getAnnotation(MyService.class);
		if (null == an) {
			return;
		}
		Constructor<?> constructor = cls.getConstructor();
		Object ins = constructor.newInstance();
		map.put(an.value(), ins);
	}
	public <T>T getInstance(String clsName,Class<T> cls) throws Exception{
		Object obj = map.get(clsName);
		if (null == obj) {
			newInstance(cls);
			obj = map.get(clsName);
		}
		return (T)obj;
	}
}
```

+ 使用注解替代spring的xml配置文件做对象池的使用
```java
//1、声明类使用service注解
@Service("Students")
public class Students {
	private Integer id;
	private String name;
}
//2、声明扫描注解的类，并在注解中给出包路径
@ComponentScan("beans")
public final class SpringConfig {
}
//3、新建AnnotationConfigApplicationContext对象（beans容器）
AnnotationConfigApplicationContext acac = new AnnotationConfigApplicationContext(SpringConfig.class);
Students bean = acac.getBean("Students",Students.class);
Students bean1 = acac.getBean("Students",Students.class);
System.out.println(bean==bean1);//true
```
|方法|释义|返回值|
|---|---|---|
|new AnnotationConfigApplicationContext(String/Class<?>...)|根据配置文件路径或配置对象的字节码文件创建beans池|bean的工厂对象|
|AnnotationConfigApplicationContextObj.getBeans(String ObjName,Class<Obj>)|从bean池中获取对应对象，没有就创建在获取|传入字节码对象类型的对象|

## 3、Junit单元测试
> Junit是第三方的开发工具注解，需要引入他的jar包和它的运行解释器，eclipse继承了这些因此可以在项目-buildpath-addlibrary-Junit-选择需要的Junit版本，添加后即可使用
```java
//@Test注解用于测试方法功能完整性
@Test()
public void a() {
    System.out.println("a测试方法");
}
```     
+ @Test注解有两个个属性值long timeout和Exception Class<? extends java.lang.Throwable>用于限制测试的时间和异常处理类
+ 光标位置在类上测试类，在方法上测试方法
+ 必须是**public** **void**修饰的方法才能使用单元测试，否则报错。


新增客户      客户新增
客户认领      客户认领
销售立项      销售立项
销售项目报价  销售报价
销售项目变更  竞争对手新增
投标结果反馈  项目丢失
              销售中标/弃标/丢标结果上报

销售立项 拒绝✔ 同意✔
投标结果反馈申请 拒绝✔ 同意✔
销售标价申请 拒绝✔
新增客户 同意✔

竞争对手 ❌
变更竞争对手 ❌
新增竞争对手 ❌
项目丢失 ❌
