---
title: generic泛型
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [泛型]
categories:
  - [java]
date: 2021-02-27 18:28:45
author:
img:
coverImg:
summary:
---

## 特点

+ 泛型没有以下继承结构
```java
ArrayList<Number> list = new ArrayList<Integer>
//错误
List<Integer> list = new ArrayList<Integer>
//正确
```

+ 不包含基本类型int/short/byte...
+ 不能获取泛型类Customer<String>.class，因为类型擦除，获取到的都是Object.class
+ 因为类型擦除的缘故，泛型的类对象都是object，然后由编译器进行强转来完成的类型转换。
+ 不能实例化泛型对象==>>都是new Object()
```java
new T();
//等同于
new Object();
//正确写法是：
<T> T getInstance(Class<T> t){
    return t.newInstance();
}
```
+ 不能覆盖object类原有的方法
```java
//这样写是错误的❌
public Boolean equals(T t){
    return this == t;
}
//避免和object类的方法冲突
public Boolean same(T t){
    return this == t;
}
```
+ 不能进行泛型间的转型，只能是类之间的转型——没有泛型的直接继承，可以用？进行继承或**super**关键字进行继承转换
```java
//正确
List<Integer> list = new ArrayList<Integer>();
//错误,没有这种写法
ArrayList<Number> list = new ArrayList<Integer>();
//正确
ArrayList<? super Integer> list1 = new ArrayList<Integer>();
		ArrayList<? extends Number> list2 = new ArrayList<Integer>();
```
+ 泛型的PECS原则：Produce Extends Consumer Super(就是只能把子类（包含类型范围小）的值获取赋给父类（类型给范围大）)
```java
package test;
class PairFactory<T>{
	private T one;
	
	public PairFactory() {
		super();
	}
	public PairFactory(T t) {
		this.one = t;
	}

	public T getName() {
		return one;
	}

	public void setName(T t) {
		this.one = t;
	}
	@Override
	public String toString() {
		return "one:"+one;
	}
}
public class PECSDemo {
	static <E> void copy(PairFactory<? extends E> p1,PairFactory<? super E> p2){
		E n = p1.getName();
		p2.setName(n);
	}
	public static void main(String[] args) {
		PairFactory<Integer> p1 = new PairFactory<Integer>(100);
		PairFactory<Number> p2 = new PairFactory<Number>();
		copy(p1, p2);
		System.out.println(p1);
		System.out.println(p2);
	}
}
```
+ 不能直接创建泛型数组，要通过反射新建，然后强制转型(FIFO算法实例)
```java
// FIFO-->>first input first output
// array数组存储
import java.lang.reflect.Array;
import java.util.Arrays;
public class FIFODemo<E> {
	private E[] arr;
	private int index = 0;
	private int capcity = 2;
	@SuppressWarnings("unchecked")
    // 通过反射新建数组，然后强制转型成对应数组
	public FIFODemo(Class<E> e,int len) {
		if (len == 0) {
			try {
				throw new Exception("the lenth of container must > 0");
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
		arr = (E[]) Array.newInstance(e, len);
	}
	void add(E e) {
		if (index == capcity) {
			capcity *= 2;
			arr = Arrays.copyOf(arr, capcity);
		}
		arr[index] = e;
		index++;
	}
	E get() {
		E e = arr[0];
		System.arraycopy(arr, 1, arr, 0, arr.length-1);
		return e;
	}
	@Override
	public String toString() {
		return arr.toString();
	}
	public static void main(String[] args) {
		FIFODemo<String> fd = new FIFODemo<String>(String.class,20);
		fd.add("one");
		fd.add("two");
		fd.add("three");
		System.out.println(fd.get());
		System.out.println(fd.get());
		System.out.println(fd.get());
	}
}
```
## 泛型与可变参数
+ 字节码对象获取方法、执行方法及相关应用
```java
@CallerSensitive
public Object invoke(Object obj, Object... args)
    throws IllegalAccessException, IllegalArgumentException,
        InvocationTargetException
{
    if (!override) {
        if (!Reflection.quickCheckMemberAccess(clazz, modifiers)) {
            Class<?> caller = Reflection.getCallerClass();
            checkAccess(caller, clazz, obj, modifiers);
        }
    }
    MethodAccessor ma = methodAccessor;             // read volatile
    if (ma == null) {
        ma = acquireMethodAccessor();
    }
    return ma.invoke(obj, args);
}
@CallerSensitive
public Method getDeclaredMethod(String name, Class<?>... parameterTypes)
    throws NoSuchMethodException, SecurityException {
    checkMemberAccess(Member.DECLARED, Reflection.getCallerClass(), true);
    Method method = searchMethods(privateGetDeclaredMethods(false), name, parameterTypes);
    if (method == null) {
        throw new NoSuchMethodException(getName() + "." + name + argumentTypesToString(parameterTypes));
    }
    return method;
}
public static void main(String[] args) throws Exception{
    ArrayList<String> list = new ArrayList<String>();
    list.add("one");
    list.add("two");
    list.add("three");
//	list.add(100);//直接添加100不行，要在运行时通过反射调用方法添加
    Class<?> c = list.getClass();
    Method m = c.getDeclaredMethod("add",int.class,Object.class);
    m.invoke(list, 0,100);
    System.out.println(list);
}
```
+ 不能直接通过instanceof判定父类的泛型类型
```java
m1 instanceof person<String>//错误❌
m1 instanceof person//正确✔
```
+ 如果在方法内部创建了泛型数组，最好不要将它返回给外部使用
```java
static <K> K[] pickTwo(K k1, K k2, K k3) {
    return asArray(k1, k2);
}
static <T> T[] asArray(T... objs) {
    return objs;
}
```
因为擦拭法，在pickTwo()方法内部，编译器无法检测K[]的正确类型，因此返回了Object[]。

## 实例

### 获取父类的泛型类型
> java类型图
```seq
                      ┌────┐
                      │Type│
                      └────┘
                         ▲
                         │
   ┌────────────┬────────┴─────────┬───────────────┐
   │            │                  │               │
┌─────┐┌─────────────────┐┌────────────────┐┌────────────┐
│Class││ParameterizedType││GenericArrayType││WildcardType│
└─────┘└─────────────────┘└────────────────┘└────────────┘
```
```java
Class<Man> c = Man.class;
Type genericSuperclass = c.getGenericSuperclass();
if (genericSuperclass instanceof ParameterizedType) {
    Type[] actualTypeArguments = ((ParameterizedType) genericSuperclass).getActualTypeArguments();
    Class<?> classType = (Class<?>) actualTypeArguments[0];
    System.out.println(classType);
}
```
具体的操作步骤：获取对象的字节码对象===>>>获取父类泛型类型，并判定是否是ParameterizedType类型===>>>获取正式的参数类型数组===>>>获取对应字节码对象。

### 类、方法、接口的泛型应用
```java
package generic;
import java.lang.reflect.Constructor;
class ClsDemo<T>{
	T getInstance(T t) {
		return null;
	}
	static <E>E getIns(E e){
		return null;
	}
}
interface ObjFactory<I,R>{
	R getInstance(Class<I> i);
	R getInstance(Class<I> i,String s);
}
class CreateInstance implements ObjFactory<String,Object>{

	public Object getInstance(Class<String> i) {
		String is = null;
		try {
			is = i.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return is;
	}

	public Object getInstance(Class<String> i, String s) {
		return null;
	}
	
}
public class ClsMthIntCompareDemo {
	public static void main(String[] args) {
		String i = (String) new CreateInstance().getInstance(String.class);
		System.out.println(i);
		String is2 = (String) new ObjFactory<String, Object>() {
			public Object getInstance(Class<String> i,String s) {
				String is = null;
				try {
					Constructor<String> constructor = i.getConstructor(String.class);
					is = constructor.newInstance(s);
				} catch (Exception e) {
					e.printStackTrace();
				}
				return is;
			}
			public Object getInstance(Class<String> i) {
				return null;
			}
		}.getInstance(String.class,"xixi");
		System.out.println(is2);
	}
}
```

### 线程安全的ArrayList
```java
class Sync<E> extends ArrayList<E> {
	/**
	 * version 1
	 */
	private static final long serialVersionUID = 1L;
	@Override
	public synchronized E get(int index) {
		return super.get(index);
	}
	@Override
	public boolean add(E e) {
		return super.add(e);
	}
}
```

### 基于LinkedList实现的Lru算法存储
```java
class LruCache extends LinkedHashMap<String, Object>{
	/**
	 * version 1
	 */
	private static final long serialVersionUID = 1L;
	private int maxCap;
	public LruCache(int maxCap) {
		super(maxCap,0.75f ,true);
		this.maxCap = maxCap;
	}
	@Override
	protected boolean removeEldestEntry(java.util.Map.Entry<String, Object> eldest) {
		if (maxCap < size() ) {
			return true;
		}
		return false;
	}
}
```