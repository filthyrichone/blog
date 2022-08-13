---
title: Stream流操作
top: false
cover: false
toc: true
mathjax: false
password: 
summary: 
tags:
  - [Stream]
categories:
  - [java]
date: 2020-12-20 16:14:12
author:
img:
coverImg:
---

## FileInputStream和FileOutputStream
> 读写文件必要的工具类，只有有了这两个类的实例才可操作文件内容。
+ 创建对象既可以是文件路径String也可以是文件对象（File类型对象）
+ 如果文件不存在/没有权限访问/无法创建返回FileNotFoundException

### 写入文件
> read(int)/(byte[],from,length)
```java
FileOutputStream fos = new FileOutputStream(filepath);
fos.write(99);//0x00000063
fos.write(355);//0x00000163
fos.write(0x00d6);
fos.write(0x00d0);
byte[] b = { 102, 103, 104, 105 };
fos.write(b, 0, b.length - 1);
//随手关门
fos.close();
```
### 读取文件
> write(int)/(byte[],from,length)
```java
FileInputStream fis = new FileInputStream(filepath);
int temp;
while ((temp = fis.read()) != -1) {
    System.out.println(temp);
}
//随手关门
fis.close();
```

> 一定要记得**关闭资源**，避免浪费系统资源

## 文件复制
> 使用byte数组来进行文件的操作速率会大幅的提升
```java
private static void copy(File from, File to) throws IOException {
    FileInputStream fis = new FileInputStream(from);
    FileOutputStream fos = new FileOutputStream(to);
    // 单字节读写
    int temp;
    while ((temp = fis.read()) != -1) {
        fos.write(temp);
    }
    // byte数组读写,8k是读写的经验值，能效最大化
    byte[] b = new byte[8192];
    // 数组中读取的个数，防止最后一次多处理数值
    int num;
    while ((num = fis.read(b)) != -1) {
        fos.write(b, 0, num);
    }
    // 随手关门
    fis.close();
    fos.close();
}
```

## ObjectInputStream和ObjctOutputStream文件序列化
> 此方法用于保存对象的内容和状态，便于以后的读取复用。
+ 需要实现标识类Serializable，并添加序列化版本ID，反序列化时版本不一致会有异常
+ static类变量和transient临时变量不会被序列化

```java
class Student implements Serializable {
    // 编译器根据类的定义信息自动生成的serialVersoinID
    private static final long serialVersionUID = 12l;

    int age;

    @Override
    public String toString() {
        return "Student [age=" + age + ", name=" + name + ", Score=" + Score + ", gender=" + gender + "]";
    }

    String name;
    int Score;
    transient String gender;

    public Student(int age, String name, int score) {
        super();
        this.age = age;
        this.name = name;
        Score = score;
    }

}
```

### writeObject(obj)序列化
```java
private static void serializObj(Student s) throws IOException {
    ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("E:/code/java/obj.txt"));
    oos.writeObject(s);
    oos.close();
}
```

### readObject(obj)反序列化
```java
private static void reverseSerializObj() throws Exception {
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("E:/code/java/obj.txt"));
    Student s = (Student) ois.readObject();
    System.out.println(s);
    ois.close();
}
```

## Reader和Writer类的字符编码转换
+ 多用于对字符串进行编码转换，若不指定转换编码，则默认转换为系统的编码（win：gbk，ios/linux：utf-8）
+ write()方法有三个重载的方法分别为String/byte[]/int（只写入char，即后两位的数值，前面补零）
+ java的编码转换都是用的char的字符转换（char使用unicode编码）
+ gbk和utf-8的中文编码字节量分别是2和3个字节

### 一般的字符串编码
> 使用String类型的getBytes([charset])和构造方法new String(byte[],[charset])完成编码转换
```java
public static void main(String[] args) {
    String s = "abc中";
    try {
        byte[] df = encodeStr(s, null);
        byte[] utf8 = encodeStr(s, "utf-8");
        byte[] gbk = encodeStr(s, "gbk");
        decodeStr(df, null);
        decodeStr(utf8, "utf8");
        decodeStr(gbk, "gbk");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

private static void decodeStr(byte[] b, String charset) throws IOException {
    String s;
    if (null == charset) {
        s = new String(b);
    } else {
        s = new String(b, charset);
    }
    System.out.println(s);
}

private static byte[] encodeStr(String s, String charset) throws IOException {
    byte[] b;
    if (null == charset) {
        b = s.getBytes();
    } else {
        b = s.getBytes(charset);
    }
    System.out.println(charset + "转换后的字符：" + Arrays.toString(b));
    return b;
}
```

### InputStreamReader和OutpuStreamWriter
> 主要使用构造方法定义转换字符串的类型
```java
private static void transferCN(String path, String charset) throws Exception {
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(path), charset);
    int count = 0;
    for (char c = '\u4e00'; c < '\u9fa5'; c++) {
        if (count == 30) {
            count = 0;
            osw.write('\n');
        }
        count++;
        osw.write(c);
    }
    osw.close();
}

private static void encodeStr(String path, String charset, String str) throws Exception {
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(path), charset);
    osw.write(str);
    osw.close();
}
```

### BufferReader和BufferWriter
> 使用BufferReader的readLine()方法可以整行读取，前面必须有InputStreamReader转换编码。
```java
private static void bufferReadCN(String path, String charset) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), charset));
    String tempStr;
    while ((tempStr = br.readLine()) != null) {
        System.out.println(tempStr + "\n");
    }
    br.close();
}
```