---
title: java异常
top: false
cover: false
toc: true
mathjax: false
password: 
summary: 
tags:
  - [Exception]
categories:
  - [java]
date: 2020-12-14 22:50:11
author: noah
img: https://i.loli.net/2020/12/16/9e3SuqwE1nRZXsQ.jpg
coverImg:
---

## 异常介绍
异常的特性：
+ java异常方法默认都有一个throws RuntimeException，所以当程序有这种类型的异常或者他的子类异常出现时，通常我们不必自己添加异常管道。
+ 如果不在程序中处理，异常将会一直抛出直到jvm，jvm会打印异常并退出程序。
+ 处理异常只有两种方式，try-catch捕获和throws抛出

## 异常的分类
```md
throwable顶级父类
    |--Error不可修复，多见于系统级的问题（例如递归栈/内存溢出），保证程序安全退出即可
    |--Exception
        |--其他Exception   
        |--runtimeException
           |--ArithmeticException
           |--ArrayListIndexOutOfBoundsException
           |--。。。等等异常
```
## try-catch方法
特性：
1、使用try-catch方法可以捕获多个异常，但要注意大的异常类要在后面捕获。
2、finally代码块内的代码一定会执行，无论try代码块中有无ruturn还是break及其他终止程序的关键字，都会执行。
```java
public static void main(String[] args) {
    System.out.println("输入两个数字：");
    String inp = new Scanner(System.in).nextLine();
    String[] sp = inp.split(",");
    try {
        System.out.println(Integer.valueOf(sp[0]) / Integer.valueOf(sp[1]));
        return;
    } catch (ArithmeticException e) {
        e.printStackTrace();
    } catch (ArrayIndexOutOfBoundsException e) {
        e.printStackTrace();
    } finally {
        System.out.println("finly");
    }
}
//无论是否有return等关键字都会执行finally内的代码
// 输出：
// 输入两个数字：
// 12
// java.lang.ArrayIndexOutOfBoundsException: 1
// finly
// 	at day1214.ExceptionTset.main(ExceptionTset.java:11)
```

## throws抛出异常
特性：
1、使用throws关键字加在方法后面可以抛出多个异常。
2、往往需要抛出异常的代码块是它内部引用的方法已经有异常抛出，所以要继续抛出异常。
```java
public static void main(String[] args) {
    System.out.println("请输入一个时间：");
    try {
        f();
    } catch (ParseException e) {
        System.out.println("时间格式错误");
        e.printStackTrace();
    } catch (IOException e) {
        System.out.println("文件路径错误");
        e.printStackTrace();
    }
}
//抛出多个异常
private static void f() throws ParseException, IOException {
    String inp = new Scanner(System.in).nextLine();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
    Date d = sdf.parse(inp);
    File f = new File("E://code/java/" + d.getTime() + ".txt");
    f.createNewFile();
}
//SimpleDateFarmat的parse方法抛出了ParseException异常，因此上面要跑出此异常
public Date parse(String source) throws ParseException
{
    ParsePosition pos = new ParsePosition(0);
    Date result = parse(source, pos);
    if (pos.index == 0)
        throw new ParseException("Unparseable date: \"" + source + "\"" ,
            pos.errorIndex);
    return result;
}
```


## throw手动抛出异常
特性：
1、处理自定义的特殊情况，使用系统类型，自己抛出和捕获。
2、抛出的信息要准确描述特殊情况，打印的交互可以人性化一点。
```java
public static void main(String[] args) {
    System.out.println("请输入两个浮点数：");
    double inp1 = new Scanner(System.in).nextDouble();
    double inp2 = new Scanner(System.in).nextDouble();
    try {
        f(inp1, inp2);
    } catch (ArithmeticException e) {
        //交互信息人性化
        System.out.println("不能除0是我们的错，请鞭笞我们吧！");
        e.printStackTrace();
    }
}

private static void f(double inp1, double inp2) {
    //自定义特殊情况异常抛出
    if (inp2 == 0) {
        ArithmeticException e = new ArithmeticException("/by zero");
        throw e;
    }
    System.out.println(inp1 / inp2);
}
```

## 异常的特殊处理
> 当重写父类方法时，可能遇到父类的异常管道除了默认的RuntimeException外没有其他管道的情况，而本方法使用了有其他类型的异常的方法，这时就需要封装异常为RuntimeException或其子类的异常来转换异常的类型，从而抛出异常。

```java
public static void main(String[] args) {
    LinkedList<String> list = new LinkedList<String>();
    Collections.addAll(list, "2020-12-12", "2020-12-18", "2020-12-14", "2020-12-16");
    Iterator<String> it = list.iterator();
    while (it.hasNext()) {
        String s = (String) it.next();
        System.out.println(s);
    }
    System.out.println("------------------------");
    list.sort(new Comparator<String>() {
        //重写的compare方法不支持parseException类型的管道的添加，封装抛出
        @Override
        public int compare(String o1, String o2) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");
            try {
                Date d1 = sdf.parse(o1);
                Date d2 = sdf.parse(o2);
                return d1.compareTo(d2);
            } catch (ParseException e) {
                throw new IllegalArgumentException(e);
            }
        }
    });
    for (String s : list) {
        System.out.println(s);
    }
}
```

## 自定义异常的使用
> 在有特殊的程序需要我们单独处理时，可以自定异常的类型从而抛出，以便我们在后面的程序中处理，这时可以使用自定义的异常来处理。

+ 创建自定义的异常的主要有三个部分即：1、继承的父类2、构造方法重写3、类名能表达异常的意义
```java
public static void main(String[] args) {
    System.out.println("请输入用户名密码：");
    String user = new Scanner(System.in).nextLine();
    String pwd = new Scanner(System.in).nextLine();
    try {
        login(user, pwd);
    } catch (UserErrorException e) {
        e.printStackTrace();
    } catch (PwdErrorException e) {
        e.printStackTrace();
    }
}
//PwdErrorException继承的是Exception不是RuntimeException或他的子类，所以需要自己加抛出异常管道
private static void login(String user, String pwd) throws PwdErrorException {
    if (!"abc".equals(user)) {
        throw new UserErrorException("用户名错误");
    }
    if (!"123".equals(pwd)) {
        throw new PwdErrorException("密码错误");
    }
    System.out.println("登陆成功");
}
```