---
title: mybatis小结
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [mybatis]
categories:
  - [java]
date: 2021-02-16 10:43:34
author:
img:
coverImg:
summary:
---

## 简介
> MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以对配置和原生Map使用简单的 XML 或注解，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。

## 使用
> mybatis的使用主要分为两种两种方式：1、xml+java逻辑2、在java文件里面使用注解。
> 这两种方式各有好坏，xml的好处是可以实现代码和sql分离，避免重新编译发布。注解则相对简单，坏处是注解在代码内部,如需要修改则要修改java源码，需要重新编译发布到服务器上。

+ xml文件方式使用mybatis
### 添加对应的依赖包
> maven项目直接在pom.xml里的dependencies==>>dependency添加对应依赖选项
```java
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.noah</groupId>
	<artifactId>MybatisTest</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<dependencies>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.32</version>
		</dependency>
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.2.8</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.10</version>
		</dependency>
		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>1.2.17</version>
		</dependency>

	</dependencies>
</project>
```
### 在项目根目录添加sqlMapConfig.xml文件
>java项目在src下，maven项目在src/main/resources下
```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<properties resource="jdbc.properties" ></properties>
	<environments default="develop">
		<environment id="develop">
			<transactionManager type="JDBC"></transactionManager>
			<dataSource type="Pooled">
				<property name="driver" value="${jdbc.driver}"/>
				<property name="url" value="${jdbc.url}"/>
				<property name="username" value="${jdbc.username}"/>
				<property name="password" value="${jdbc.password}"/>
				<!-- <property name="driver" value="com.mysql.jdbc.Driver"/>
				<property name="url" value="jdbc:mysql:///jt_db?characterEncoding=utf-8&amp;serverTimezone=GMT"/>
				<property name="username" value="root"/>
				<property name="password" value="root"/> -->
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="Mapper/StuMapper.xml" />
	</mappers>
</configuration>
```
### 创建要操作的表的对应实体类
> 类的成员变量要和表的列名相同（尽量使用**包装类**声明，避免未赋值时0默认作为默认值），maven项目放置到java目录下
### 创建实体对应的xml文件
> 文件名称为：实体+Mapper.xml（maven项目放置到resources目录下，java项目和对应实体在同一个包下）
```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="dao.StuMapper">
	<sql id="cols">
		id,name,gender,addr,score
	</sql>
	<select id="findSome" resultType="entries.Stu">
		select <include refid="cols"></include> from stu
		<where>
			<if test="null != target">
				name like concat("%",#{target},"%")
			</if>
		</where>
	</select>
	<select id="findAll"  resultType="entries.Stu" >
		select 
		<include refid="cols"></include>
		from stu
	</select>
	<update id="addRecords">
		insert into stu values(null,#{name},#{gender},#{addr},#{score})
	</update>
	<update id="modifyRecords">
		update stu set name=#{name},gender=#{gender} where id=#{id}
	</update>
	<delete id="deleteRecords">
		delete from stu where id=#{id}
	</delete>
		<!-- select ${search} from stu where name like "%"#{orderType}"%" -->
 		select ${search} from stu where score between #{start} and #{end} order by ${order} ${orderType} 
<!-- 		select ${search} from stu where score between #{start} and #{end} order by concat(#{order}," " ,#{orderType}) -->
	</select>
	<select id="findScore" resultType="entries.Stu">
		select * from stu 
		<where>
			<if test="null != minScore">
				score <![CDATA[>]]> #{minScore}
			</if>
			<if test="null != maxScore">
				and score <![CDATA[<]]> #{maxScore}
			</if>
		</where>
	</select>
	<select id="updateRecords" resultType="entries.Stu" >
		update stu 
		<set>
			<if test="null != name">
				name=#{name},
			</if>
			<if test="null != gender">
				gender=#{gender},
			</if>
		</set>
		where id=#{id}
	</select>
	<delete id="deleteMultiRecords">
		delete from stu 
		<where>
			id in
			<foreach collection="array" item="item"  open="(" close=")" separator="," >
				#{item}
			</foreach>
		</where>
	</delete>
</mapper>
```
### 添加java逻辑程序
+ 获取sqlSessionFactory对象
+ 通过SqlSessionFactory对象获取sqlSession对象
+ 通过sqlSession对象的update、select等方法执行sql
+ 如果是修改了表的内容需要使用sqlSession对象提交修改内容
```java
InputStream is = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
SqlSession ss = factory.openSession();
List<Stu> list = ss.selectList("dao.StuMapper.findAll");
for (Stu stu : list) {
    System.out.println(stu);
}
```

### 添加junit和log4j以及jdbc配置文件
+ 在pom.xml中添加对应的包文件，见上方pom文件
+ 在项目上右键buildpath==>>add library==>>junit4（5容易出问题）
+ 在项目的resources文件夹下新建log4j.properties和jdbc.properties文件，添加以下配置文件
```xml
# jdbc配置文件
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql:///jt_db?characterEncoding=utf-8&serverTimezone=GMT
jdbc.username=root
jdbc.password=root
# log4j配置文件
# Global logging configuration
log4j.rootLogger=DEBUG, stdout
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t]  %m%n
```
+ 修改sqlMapConfig.xml文件，使用${}（非el也非占位符）添加properties标签，修改dateSource标签值标签
```java
<property name="driver" value="${jdbc.driver}"/>
<property name="url" value="${jdbc.url}"/>
<property name="username" value="${jdbc.username}"/>
<property name="password" value="${jdbc.password}"/>
```
### FAQ常见问题
+ xml配置文件不出现提示
1、找对应的dtd文件下载地址，并下载dtd文件。

![获取dtd文件下载路径](/images/dtdUrl.png)

2、添加到xml catalog：window==>>properties==>>xml catalog==>>add==>>catalog entry将下载的对应dtd文件添加
3、然后将key type选为url，key值为之前下载dtd文件的路径不要http或https头，保存并应用即可。
![eclipse添加dtd文件提示](/images/dtdSetting.png)
+ <和>、&等符号在xml文件中辨识失败。
|符号|替换的符号|
|---|---|
|&|\&amp;|
|<\|>|<![ADATA[<\|>]>]|


## ${}和\#{}
> 都可以实现sql内容变量的替换，${}是直接替换占位内容，#{}是替换成'替换内容'的形式
> #{}较${}安全，使用jdbc的preparedStatement对象进行预编译，防止sql注入，尽量使用#{},用concat函数or""连接实现替换${}。
> ${}常见用于不可预编译的sql对象，例如动态表名、排序规则等。
```xml
select ${search} from stu where name like "%"#{orderType}"%"
select ${search} from stu where score between #{start} and #{end} order by ${order} ${orderType}
select ${search} from stu where score between #{start} and #{end} order by concat(#{order}," " ,#{orderType})
```
### 传入参数
> \#{}/${}参数可以接受三种形式，即字符串（不推荐，有时失效），map以及实体类对象（有getter和setter方法）
```java
//字符串方式
int rows = ss.delete(mapperLocationStr+"deleteRecords","1002");
//map方式
StuMapper mapper = ss.getMapper(StuMapper.class);
map.put("target", "刘");
List<Stu> list = mapper.findSome(map);
//实体类方式
Stu stu = new Stu("刘能",1004, "男", 86d, "广州");
int rows = ss.update(mapperLocationStr+"addRecords",stu);
```

## 动态sql
> 可以根据传入参收动态改变sql的内容的标签方法。

### if标签
> test属性内可以使用条件判定
```xml
<if test="null != minScore">
    score <![CDATA[>]]> #{minScore}
</if>
```

### where标签
> 代替sql关键字where，可以自动添加，删除连接条件关键字
```xml
select * from stu 
<where>
    <if test="null != minScore">
        score <![CDATA[>]]> #{minScore}
    </if>
    <if test="null != maxScore">
        and score <![CDATA[<]]> #{maxScore}
    </if>
</where>
```
### set标签
> 代替sql关键字set，自动判定连接符,**连接符要西在列名称后面**
```xml
<select id="updateRecords" resultType="entries.Stu" >
    update stu 
    <set>
        <if test="null != name">
            name=#{name},
        </if>
        <if test="null != gender">
            gender=#{gender},
        </if>
    </set>
    where id=#{id}
</select>
```

### sql及其他标签应用
> 提供一些公共的可重复引用的sql片段,id在此文件中唯一不可重复，与include标签配合使用，替换sql片段。
```xml
<sql id="cols">
    id,name,gender,addr,score
</sql>
<select id="findSome" resultType="entries.Stu">
    select <include refid="cols"></include> from stu
    <where>
        <if test="null != target">
            name like concat("%",#{target},"%")
        </if>
    </where>
</select>
```

## 添加mapper对应接口
> 实际上在用mybatis操作sql进行数据库操作时，很多操作都是重复的，比如获取facotry和查找执行xml对应sql等
> 可以使用spring矿建代替我们进行sqlSessionFactory对象获取以及使用mapper接口代替我们进行查找sql并执行的操作。

### 创建mapper对应接口
> maven项目中在java文件夹目录下创建对应接口文件，java项目在src下即可,文件名要和对应的maper.xml文件相同。

### 修改对应xml文件
> 将对应xml文件的mapper标签的namespace属性为接口的全路径名称（maven项目到java根目录，java项目到src根目录）

### 替换sqlSeesion指定sql方法
> 使用接口调用代替sqlSession直接执行sql方法。
```java
@Test
public void findSome() {
    SqlSession ss = factory.openSession();
    HashMap<String,String> map = new HashMap<String, String>(); 
    //获取对应接口类对象的实现，返回mapper对象（实现了接口的对象实例）
    StuMapper mapper = ss.getMapper(StuMapper.class);
    map.put("target", "刘");
    List<Stu> list = mapper.findSome(map);
//		List<Stu> list = ss.selectList(mapperLocationStr+"findSome", map);
    for (Stu stu : list) {
        System.out.println(stu);
    }
}

@Before
public void bef() throws IOException {
    if (null == factory) {
        InputStream is = Resources.getResourceAsStream("sqlMapConfig.xml");
        this.factory = new SqlSessionFactoryBuilder().build(is);
    }
}
```
+ @Before注解：在@Test方法执行前先执行

## mybatis架构
> 从不同角度分为三个架构，即应用架构，产品架构，及技术架构

### 应用架构
> 有啥作用？简化了jdbc的繁琐操作，封装了连接创建、分离了sql与代码、并且自动封装参数和sql查询结构到对应的对象中。
> 怎样实现的？
    1、通过缓存、线程池、日志等提高了数据库操作效率
    2、常用api较单一、学习成本较低、易上手
    3、自动读取xml（动态sql），解耦sql，可复用性强。

![应用简图](/images/mybatis/mybatisApplicationDiagram.png)
![产品简图](/images/mybatis/mybatisProductDiagram.png)

### 技术架构
> mybatis就是封装jdbc的创建数据库连接，statement对象创建、sql执行结构返回等操作。

![总体结构图](/images/mybatis/processDiagram.png)

![配置资源转换图](/images/mybatis/resouceConfig.png)
![sqlSessionFactory创建](/images/mybatis/factoryCreate.png)
![sqlSession创建](/images/mybatis/sqlSessionCreate.png)
![sqlSession应用方式](/images/mybatis/sqlSessionUseType.png)

注意：mybatis的设计模式使用的都是**接口耦合**，即实现由具体类实现，但是返回的参数类型都是接口，这样便于后期实现类的变化。

### 原理分析
> 主要分析mybatis的会话工厂创建、会话对象底层实现、缓存的应用配置。

+ 工厂对象的创建主要使用了xmlConifigBuilder和xmlMapperBuilder将mybatis的配置信息和sql分别封装到Environment对象和MappedStatement对象，最终将这两类信息封装到configuration对象传给sqlSession对象，用以配置缓存，创建sql连接，封装sql和Statement等操作。
![sqlSessionFactory创建过程](/images/mybatis/sqlSessionFactoryCreate.png)
当然，我们可以不适用xml配置的方式自己创建sqlSessionFactory对象,并将创建好的对象通过抽象方法传递。
```js
public class MybatisConfig {
    private static SqlSession getSqlSession(){
        ComboPooledDataSource pooledDataSource = new ComboPooledDataSource();
        JdbcTransactionFactory transactionFactory = new JdbcTransactionFactory();
        Environment development = new Environment("development", transactionFactory, pooledDataSource);
        Configuration configuration = new Configuration(development);
        configuration.addMapper(UserMapper.class);
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(configuration);
        SqlSession sqlSession = factory.openSession();
        return sqlSession;
    }
    public static SqlSession getInstance() {
        return getSqlSession();
    }
}
```

+ sqlSession 对象运行主要由executor接口的实现类simpleExecutor、batExecutor等具体实现，executor会执行创建缓存、sql连接、封装sql和statement对象并交由statementHandler处理sql操作的任务。
![sqlSession对象运行原理](/images/mybatis/sqlSessionRunDetail.png)

+ 基于Mapper接口的应用方式比直接调用操作数据库方法的过程（上面）多了一个创建代理对象的过程，这个代理对象会调用exector执行相应操作。
![mapper应用方式](/images/mybatis/mapperRunDetail.png)

+ 缓存分为一级缓存，二级缓存。一级缓存默认会跟随sqlSession创建、关闭而创建、关闭，且不能共享。二级缓存则可以多个sqlSession之间共享。mybatis默认将一级、二级缓存打开，但是使用需要再config和对应mappper的xml文件中配置。

![mybatis一级缓存应用](/images/mybatis/level1Cache.png)

+ 只有当上一个相同的sql操作的sqlSession关闭之后，才会把结果存入二级缓存。
![二级缓存使用详情](/images/mybatis/level2Cache.png)

+ 关于缓存配置，一般使用二级缓存可在对应的mapper.xml文件中配置,指定缓存大小和更新方法等。
```xml
<mapper namespace="dao.UserMapper">
    <sql id="cols">id,username,password</sql>
    <cache
            eviction="FIFO"
            flushInterval="60000"
            size="512"
            readOnly="true"/>
    <select id="findAll" resultType="entries.User">
        select <include refid="cols"></include> from user
        <where>
            <if test="null != #{target}">
                id = #{target}
            </if>
        </where>
    </select>
</mapper>
```
其中readOnly只读的要求**被缓存的对象实现序列化接口**（Serializable），因为只读操作实际上就是通过序列化复制元数据。