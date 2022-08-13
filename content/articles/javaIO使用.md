---
title: javaIO使用
top: false
cover: false
toc: true
mathjax: false
password: 
summary:
tags:
  - [IO]
categories:
  - [java]
date: 2020-12-19 10:52:56
author:
img: 
coverImg:
---

## File对象常用api
|名称|释义|返回值类型|返回值|
|--|--|--|--|
|exists()|是否存在文件文件对象|Boolean|存在返回true，其他为false|
|getAbsolutePath()|获取文件的完整路径|String|返回完整路径的字符串|
|getName()|获取当前文件的名称|String|返回文件的名称字符串|
|getParent/getParentFile()|获取文件的父节点路径|String|返回父节点的路径字符串|
|length()|获取文件包含的字节大小|long|返回包含字节量|
|isDirectory()|判定当前文件对象是否是文件夹|Boolean|是文件夹返回true，其他false|
|isFile()|判定是否是文件对象|Boolean|是true，无效/无权限等false|
|lastModified()|最后一次修改文件的时间|String|无效/无权限/不存在的文件返回0|

## 用File对象增删文件/文件夹
+ createNewFile()方法，创建一个新的文件，成功创建返回true
```java
File dir = new File("E:/code/java/oo/xx");
//new File()对象可以接收两个字符串一个父类路径，一个文件名称
File file = new File(dir, "test.txt");
file.createNewFile();
```

+ mkdir()/mkdirs()方法，创建一层/多层文件夹，创建成功返回true。
```java
//oo/xx路径不存在
File dir = new File("E:/code/java/oo/xx");
dir.mkdirs();
```
> mkdir()方法只能创建一层路径，如果创建的父路径不存在则报错

## list和listFiles方法的使用
> list对象返回所有子类的文件名字符串数组，listFiles返回的是子类文件对象的数组。
``` java 
//统计文件字节值
public static void main(String[] args) {
    System.out.println("请输入文件夹路径：");
    String inp = new Scanner(System.in).nextLine();
    long size = getFileSize(inp);
    System.out.println("文件夹大小为：" + size + "字节");
}

private static long getFileSize(String inp) {
    File dir = new File(inp);
    File[] list = dir.listFiles();
    if (null == list) {
        System.out.println("请输入正确的文件夹路径");
        return 0;
    }
    if (dir.isFile()) {
        return dir.length();
    }
    long sum = 0;
    for (File file : list) {
        if (file.isDirectory()) {
            sum += getFileSize(file.getAbsolutePath());
        } else {
            sum += file.length();
        }
    }
    return sum;
}
```



