---
title: reflect反射
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [reflect]
  - [反射]
categories:
  - [java]
date: 2021-01-01 20:21:57
author:
img:
coverImg:
summary:
---

## 1、通过字符串获取类及其方法属性
> 通过字符串获得**类**对象的三种方法

|api|释义|返回值|
|--|--|--|
|ClassName.class|类的class属性|所属类的类对象|
|对象实例.getClass()|对象实例的方法|所属类的对象|
|Class.fromName(String className)|Class类的方法，传入类的名称，在方法区中找（没有就加载到方法区）|所属类的对象|

```java
String str = "";
str.getClass()
String.Class
Class.fromName("java.lang.String")
//必须是完整的类名
```
|api|释义|返回值|
|--|--|--|
|ClassObj.getSimpleName()|获取类对象的名称（不包含路径）|String的类对象名|
|ClassObj.getName()|获取类对象的名称（包含路径）|String的类对象名|
|ClassObj.getPackage().getName()|获取类的包路径的名称|String的类对象名|

```java
System.out.println(c.getPackage().getName());
System.out.println(c.getName());
System.out.println(c.getSimpleName());
```

## 2、获取类的成员变量/构造方法/普通方法
> 从上面的类对象获取类成员变量/构造方法/普通方法

|api|释义|返回值|
|--|--|--|
|getFields()|获取在本类中声明的所有成员变量（包含父类的）|成员变量|
|getDeclaredFields()|获取在本类中声明的所有成员变量（不包含父类的）|成员变量|
|getMethods()|获取在本类中声明的所有普通方法（包含继承的方法）|所有普通方法|
|getDeclaredMethods()|获取在本类中声明的所有普通方法（不包含继承的方法）|所有普通方法|
|getConstructors()|获取在本类中的所有构造方法|所有构造方法|
|getDeclaredConstructors()|获取在本类中的所有构造方法（包含继承的构造方法）|所有构造方法|

### 2、1获取类的成员变量
|api|释义|返回值|
|--|--|--|
|classObj.getFields()|获取封装成员变量的Filed数组|Fields类型的数组|
|FeilObj.getType()|获取标识当前成员变量的类对象|当前Field对象的类对象|
|FeilObj.getName()|获取Field对象的名称|Field对象名称|
```java
private static void getFields(Class<?> c) {
    Field[] fl = c.getFields();
    for (Field field : fl) {
        String name = field.getType().getSimpleName();
        String fn = field.getName();
        System.out.println(name + " " + fn);
    }
    System.out.println("----------------------");
    Field[] df = c.getDeclaredFields();
    for (Field field : df) {
        String sn = field.getType().getSimpleName();
        String fn = field.getName();
        System.out.println(sn + " " + fn);
    }
    System.out.println("***************************");
}
```

### 2、2获取类的构造方法
|api|释义|返回值|
|--|--|--|
|classObj.getconstructors()|获取封装成员变量的Constructor类型的数组|Constructor类型的数组|
|ConstructorObj.getParameterTypes()|获取构造函数的参数类型列表|类对象的类型的String类型数组|
```java
private static void getConstructors(Class<?> c) {
    Constructor<?>[] ct = c.getConstructors();
    for (Constructor<?> constructor : ct) {
        String sn = c.getSimpleName();
        Class<?>[] p = constructor.getParameterTypes();
        System.out.println(sn + "(" + Arrays.toString(p) + ")");
    }
    System.out.println("-----------------------------------");
    Constructor<?>[] dc = c.getDeclaredConstructors();
    for (Constructor<?> constructor : dc) {
        String sn = c.getSimpleName();
        Class<?>[] p = constructor.getParameterTypes();
        System.out.println(sn + "(" + Arrays.toString(p) + ")");
    }
    System.out.println("***************************");
}
```

### 2、3获取类的普通方法
|api|释义|返回值|
|--|--|--|
|classObj.getMethods()|获取封装成员变量的Method类型数组|Method类型的数组|
|MethodObj.getName()|获取当前对象的方法名称|方法名称String|
|MethodObj.getParameterTypes()|获取普通函数的参数类型列表|类对象的类型的String类型数组|
```java
private static void getMethods(Class<?> c) {
    Method[] m = c.getMethods();
    for (Method method : m) {
        String mn = method.getName();
        Class<?>[] p = method.getParameterTypes();
        System.out.println(mn + "(" + Arrays.toString(p) + ")");
    }
    System.out.println("------------------------");
    Method[] dm = c.getDeclaredMethods();
    for (Method method : dm) {
        String mn = method.getName();
        Class<?>[] p = method.getParameterTypes();
        System.out.println(mn + "(" + Arrays.toString(p) + ")");
    }
    System.out.println("***************************");
}
```
### 2、4 创建对象实例
> 通过得到的构造方法或类对象创建对应类的实例
```java
public static void main(String[] args) {
    System.out.println("请输入一个完整的类名：");
    String name = new Scanner(System.in).nextLine();
    try {
        Class<?> classObj = Class.forName(name);
        createInstanceNoParams(classObj);
        createInstance(classObj);
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }
}
//通过类对象封装的newInstance方法创建实例
private static void createInstanceNoParams(Class<?> classObj) {
    try {
        Object its = classObj.newInstance();
        System.out.println(its);
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("执行无参构造失败");
    }

}
//使用constructor对象封装的newInstance方法创建实例
private static void createInstance(Class<?> classObj) {
    try {
        Constructor<?> constructor = classObj.getConstructor(int.class);
        Object isc = constructor.newInstance(12);
        System.out.println(isc);
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("执行有参构造失败");
    }
}
```
|api|释义|返回值|
|--|--|--|
|classObj.newInstance()|利用类对象对应的类的无参构造函数创建一个类对象|对应类对象|
|constuctorObj.newInstance()|利用constructor对象封装的对应的类的指定造函数创建一个类对象|对应类对象|

### 2、5修改创建对象的成员变量
> 使用Field类对象的set/get方法修改查询类对象成员变量
```java
Cat cat = new Cat("tom");
Class<Cat> c = Cat.class;
Field f = c.getDeclaredField("age");
f.setAccessible(true);
int originAge = (int) f.get(cat);
f.set(cat, 88);
//实际调用了int类型的自动拆箱IntegerObj.intValue()
int changeAge = (int) f.get(cat);
System.out.println("originAge:" + originAge);
System.out.println("changeAge:" + changeAge);
```
|api|释义|返回值|
|--|--|--|
|fieldObj.get(instance/null)|获取对应实例的指定成员变量值|成员变量值|
|fieldObj.set(instance/null,value)|设置对应实例的指定成员变量值|--|
|fieldObj.setAccessible(Boolean)|设置对应实例的指定成员私有变量可访问|--|

### 2、6获取/使用创建对象的方法
> 使用Method对象封装的invoke方法可以获取/启用对象方法
```java
Method ga = c.getDeclaredMethod("getAge");
ga.setAccessible(true);
Method sa = c.getDeclaredMethod("setAge", int.class);
sa.setAccessible(true);
int getAge = (int) ga.invoke(cat);
sa.invoke(cat, 66);
int setAge = (int) ga.invoke(cat);
System.out.println("getAge:" + getAge);
System.out.println("setAge:" + setAge);
```
|api|释义|返回值|
|--|--|--|
|methodObj.invoke(instance/null)|获取指定实例的方法|指定对象的方法|
|methodObj.invoke(instance/null,value)|启用对应实例的指定方法|--|
|methodObj.setAccessible(Boolean)|设置对应实例的指定成员私有方法可访问|--|
**当使用null作为方法的实例时，指定的是类的方法或变量**

## 3、简单反射实例

### 从配置文件中读取信息，创建类，并调用其方法
```java
public class ReflectRunner {
	private static ArrayList<String> list = new ArrayList<>();
	static {
		try {
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(new FileInputStream("E:/code/java/config.txt")));
			String line;
			while (null != (line = reader.readLine())) {
				line = line.replaceAll("\\s+", "");
				if (0 == line.length())
					continue;
				list.add(line);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static void main(String[] args) {
		launch();
	}

	private static void launch() {
		for (String str : list) {
			try {
				String[] sl = str.split(";");
				Class<?> c = Class.forName(sl[0]);
				Object nic = c.newInstance();
				Method method = c.getDeclaredMethod(sl[1]);
				method.setAccessible(true);
				method.invoke(nic);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
```
### 简单spring工厂
> 使用dom操作api读取xml文件，封装成bean信息对象，由工厂创建、保存对象信息。
步骤：
    一、获取dom信息并封装到指定对象，保存对象到map中
    1、使用dom操作api读取xml文件，获取document对象
    2、获取指定标签的NodeList对象
    3、遍历NodeList对象，通过对象.item(index)属性获取标签Node对象
    4、通过getNameItem(String)获取标签属性的Node对象
    5、通过getNodeValue()获取属性值
    6、使用获取到的属性新建定义信息对象，保存至map中
    二、通过factory的实例获取bean
    1、新建创建对象的getInstance方法，设置constructor方法可访问。
    2、新建获取对象方法，判定key和包名（equls比较配置文件和传入值）

![自定义springFrame流程](/images/customerSpringFrameProcess.png)

```java
public class DefaultBeansFactory {
	private ConcurrentHashMap<String, BeansDefinition> beansDefinitionMap
	= new ConcurrentHashMap<String, BeansDefinition>();
	private ConcurrentHashMap<String, Object> beansInstanceMap =
			new ConcurrentHashMap<String, Object>();
	
	public DefaultBeansFactory() {
		configXmlHandler("spring-config.xml");
		
	}
	
	public <T>T getInstance(String key,Class<?> cls){
		try {
			if (!beansDefinitionMap.containsKey(key)) {
				throw new Exception("no such key in beans factory");
			}
			BeansDefinition db = beansDefinitionMap.get(key);
			if (!db.getTargetClass().equals(cls.getName())) {
				throw new Exception("no such class  in beans factory");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Object obj = beansInstanceMap.get(key);
		if (null == obj) {
			obj = newInstance(cls);
			beansInstanceMap.put(key, obj);
		}
		return (T) obj;
	}

	private Object newInstance(Class<?> cls){
		try {
			System.out.println(cls.getSimpleName());
			Constructor<?> constructor = cls.getDeclaredConstructor();
			constructor.setAccessible(true);
			return constructor.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private void configXmlHandler(String path) {
		InputStream in = ClassLoader.getSystemResourceAsStream(path);
		try {
			DocumentBuilder docBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			Document doc = docBuilder.parse(in);
			NodeList eles = doc.getElementsByTagName("bean");
			for (int i = 0; i < eles.getLength(); i++) {
				Node beanTag = eles.item(i);
				NamedNodeMap attributes = beanTag.getAttributes();
				String id = attributes.getNamedItem("id").getNodeValue();
				String targetClass = attributes.getNamedItem("class").getNodeValue();
				String lazy = attributes.getNamedItem("lazy").getNodeValue();
				BeansDefinition db = new BeansDefinition(id, targetClass, lazy);
				beansDefinitionMap.put(id, db);
				if (!Boolean.valueOf(lazy)) {
					if (null != beansInstanceMap.get(id)) {
						return;
					}
					Class<?> cls = Thread.currentThread().getContextClassLoader().loadClass(targetClass);
//					ClassLoader cs = ClassLoader.getSystemClassLoader();
//					Class<?> cls = Class.forName(targetClass, false, cs);
					beansInstanceMap.put(id,newInstance(cls));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		DefaultBeansFactory factory = new DefaultBeansFactory();
//		Object instance = factory.getInstance("Object", Object.class);
//		System.out.println(instance);
	}
}
```
+ 新添加的dom文档操作api

|api|释义|返回值|
|---|---|---|
|DocumentBuilderFactory.newInstance.newDocumentBuilder()|通过DocumentBuilderFactory抽象类的newInstance方法返回一个Builder工厂对象，调用这个工厂对象的newDoucumentBuilder方法返回一个DocumentBuilder对象|DocumentBuilder对象|
|DocumentBuilderObj.parse(String InputStream)|通过DocumentBuilder对象的parse方法将输入流转化成Document对象|Document对象|
|DocumentObj.getElementByTagName(String elementName)|通过标签名称获取元素Nodelist数组|NodeList数组|
|NodeObj.getAttributes()|获取Node对象上的所有属性|NameNodeMap对象|
|NameNodeMapObj.getNameItem(String attrName)|获取具体属性对象|Node对象|
|NodeObj.getNodeValue()|获取Node对象值|Node对象存储的值|