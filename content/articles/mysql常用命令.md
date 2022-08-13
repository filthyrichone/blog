---
title: mysql常用命令
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [常用命令]
categories:
  - [mysql]
date: 2021-01-03 21:36:00
author:
img:
coverImg:
summary:
---

## 1、常用命令
### 1、1数据库命令
|命令|释义|
|--|--|
|set names utf8|设置编码格式为utf8|
|source path|导入sql文件，不要用复制执行的方式，这种方式要先cd到sql对应的文件否则error:2|
|show databases;|显示所有创建的数据库|
|use dbName;|选中具体的数据库|
|select database();|查看当前选中的数据库|
|create database if not exit dbName charset utf8;|创建数据库，并设置其编码为utf-8（mysql不识别-，不用写）|
|drop database if exit dbName;|删除已存在的数据库|
|show create database dbName;|显示之前创建具体数据库的命令设置|
### 1、2表操作
|命令|释义|
|--|--|
|create table if not exists stu(id int,name varchar(20),gender varchar(20),birthday date,score double);|创建stu表|
|drop table if exists tbName;|删除表|
|show create table tbName;|查看表的创建命令信息|
|desc tbName;|查看表结构|

## 2、基本类型
|类型|释义|
|--|--|
|int|整数类型|
|char(num)|字符（0~255字符)|
|varchar(num)|可变长字符（0~65535字节）|
|text|文本（0~65535字节）|
|bigtext|大数据（4G）|
|date|年月日|
|time|时分秒|
|datetime|年月日时分秒|
|timestmap|同datetime但存储的是时间戳，可自动增删时间|

**时间类型只有**timestamp可以用**函数**设置定义默认值（now/current_date函数表示），字符设定的，取值范围要在'1970-01-01 00:00:00' 到 '2037-12-31 23:59:59'之间。

## 3、约束
+ 主键约束——作为表记录的唯一标识不可为空不能为空——primary key
+ 唯一约束——列不能重复——unique
+ 非空约束——列不能为空——not null
+ 外键约束——和别的表的约束关系——foreign key(外键) references 表名(关联外键)
+ 主键自增——表的主键才可设置——auto_increment
```sql
drop table if exists stu;
create table if not exists stu(id int primary key auto_increment,name varchar(20) unique,gender varchar(20) not null,birthday date,score double);
```

## 4、插入数据
```sql
insert into stu(id,name,gender,birthday,score) values(1,'王海涛','男','1999-09-18',99.5);
insert into stu values(2,'张慎政','男','1988-09-18',89.5);
set names gbk;#通知服务器用gbk接收数据
mysql --default-character-set=gbk -uroot -proot#设置当前库接收的数据编码是gbk，mysql会自动转换gbk为utf8然后存储下来
alter table stu modify id int auto_increment;#修改主键，添加自增
```
+ 可以省略表字段，但插入值必须要按顺序依次插入。

## 5、修改数据
```sql
#不支持+=运算符，不写where默认修改所有列
update stu set score=score+10;
update stu set score=score-10;
update stu set socor=88 where name='王海涛';
```

## 6、查询数据

### 6、1全局可用函数
> 一些函数全局可用

|条件语句|解释|
|--|--|
|current_date()|获取当前时间，返回年月日|
|current_time()|获取当前时间，返回时分秒|
|now()|获取当前时间，返回：年月日时分秒|
|month(dateClumn)|适用于date类型的转换函数对应月|
|year(dateColumn)|适用于date类型的转换函数对应年|
|time(dateColumn)|适用于date类型的转换函数对应时间(时分秒)|
|ifnull(columnName,代替null的值)|使用指定值代替指定列中出现的null值|
```sql
#isfull(columnName,0)将null当成0处理
select name,sal+ifnull(bonus,替换值) as salary from emp where sal+ifnull(bonus,0)>=3500;
#as可以省略不写
#select 加时间函数可获取指定函数返回的时间。
select now()
#结果
+---------------------+
| now()               |
+---------------------+
| 2021-02-12 01:52:22 |
+---------------------+
1 row in set (0.00 sec)
```


### 6、2where条件查询
> 常见的条件查询组合

|条件语句|解释|
|--|--|
|between 条件 and 条件|在条件1和条件2直接的范围|
|and/or/not|与\|或\|非|
|in (条件1,条件2,...)|条件集合范围内|
|is|代替=判定条件是否相同|
|like '%_条件%'|模糊查询,条件中的%代替任意个任意字符,_代替一个任意字符|
```sql
#查询between...and...
select name,job from temp where sal>=1000 and sal<=2000;
#等同于
select name,job from temp where sal between 1000 and 2000;

#查询in条件
select name,bonus from emp where bonus in (300,500,700);
#等同于
select name,bonus from emp where bonus=300 or bonus=500 or bonus=700;
#not in(条件1,条件2....)
select name,sal from emp where sal not in (1400,1600,1800);

#or
select name,sal from emp where sal>4000 or sal<2000;

#and+ifnull条件
select name,sal,ifnull(bonus,0) fro emp where sal>3000 and ifnull(bonus,0)<600;

#is代替=
select * from emp where dept is null;
select * from emp where dept is not null;

#like模糊查询,%代替0或多个字符,_代替一个任意的字符
select name from emp where name like '%涛%';
select name from emp where name like '刘_';

#year(dateColumn)提取列的年份
select name,birthday from emp where year(birthday) between 1993 and 1995;

#month(dateColumn)提取列月份
select name,birthday from emp where month(birthday)=month(curdate());
#curdate()当前日期年\月\日
#curtime()当前时间时\分\秒
#sysdate()当前日期+时间年\月\日\时\分\秒
```

### 6、3group by分组和聚合函数
> 将查询信息分组,然后利用聚合函数统计信息
```sql
#group by分组,ANY_VALUE跳过无关联列检查(也可使用聚合函数包裹)
select dept,ANY_VALUE(name) name from emp group by dept;

#count(columnName)统计分组后每组的人数
select job,count(*) from emp group by job;
#不分组,将全体数据当成一个数组
select count(*) 员工人数 from emp where sal>3000;

#max(columnName)统计分组的最大值
select ifnull(dept,'总经理') dept,max(sal) from emp group by dept;

#min(columnName)统计分组最小值
select  dept,min(sal) 最少薪资 from emp group by dept;

#sum(colnumName)求和
select  sum(sal) 总薪资 from emp;

#avg(column)平均薪资
select  avg(sal) 平均薪资 from emp;
select  sum(sal)/count(*)  平均薪资 from emp;
```

### 6、4去重&&排序&&分页
```sql
#distinct去除重复信息
select distinct dept,job from emp;

#order by排序asc升序默认 desc降序标明
select name,sal from emp order by sal desc;

#分页limit 开始条数,每页条数
select * from emp limit 10,5;#第二页
```

+ avg/sum/count自动剔除null,统计时可能漏掉
+ 聚合函数不能用在where条件语句中

## 7、删除数据
```sql
delete from tbName where 条件
delete from tbName
```
+ 可以省略where条件，默认删除表的所有内容

## 8、修改列信息
```sql
#添加列
alter table tbName add columnName dataType [约束];
#修改列
alter table tbName modify columnName dataType [约束];
#删除列
alter table drop columnName;
#添加外键(FK_ID是外键别名)
alter table tbName add constraint 外键别名 foreign key(关联外键列名) references 表名(外键名)
#删除外键
alter table tbName drop foreign key 外键别名
```

## 9、其他sql
```sql
#cmd连接mysql完整代码
mysql -uroot -proot -h127.0.0.1 -P3306
#退出执行加'和\c按enter即可
```

## 10、sql语言执行顺序
1、from子句组装来自不同数据源的数据； 
2、where子句基于指定的条件对记录行进行筛选； 
3、group by子句将数据划分为多个分组； 
4、使用聚集函数进行计算； 
5、使用having子句筛选分组； 
6、计算所有的表达式； 
7、select 的字段；
8、使用order by对结果集进行排序。
总结起来就是:先拿数据源from/on/join|outer,然后where条件判断筛选group by分组,having重新组合然后select列,然后去重distinct,最后排序order by

详见[SQL中Select语句完整的执行顺序](https://www.cnblogs.com/HDK2016/p/6884191.html)

## 11、数据备份和恢复
> 数据库备份和恢复
```sql
#数据备份(cmd中+管理员权限+目标文件的读写权限+命令行里(不是mysql命令里面))
mysqldump -uroot -p 要备份的数据库 > 要保存的绝对路径
#数据恢复(权限同上)
mysql -uroot -p 目标数据库(已经存在的) < 要读取的绝对路经

#对比mongodb
mongodump -h127.0.0.1:3306 -d 要备份的数据库名称 -o保存地址
mongorestore -h服务器地址 -d 要恢复的数据实例 备份数据库的路径
```

## 12、多表查询

+ 笛卡尔积查询(结果条数=表1条数*表2条数...)
```sql
select * from 表1,表2...;
```
+ 关联查询,只查出各表中有对应关系的数据
```sql
select * from 表1,表2,... where 表1条列=表2列...
```
+ 外连接查询,查询多表中某个表的全部数据,要显示全部数据的表在左边就左连接否则右连接.
```sql
select * from 详情表 left join 表2 on 条件
select * from 表1 right join 详情表 on 条件
```
+ 多表结果查询
```sql
select * from 表1 where 条件判定(select * from 表2)
```
+ 虚拟视图查询
```sql
selct * from tbName,子查询视图(select * from tbName 条件) where 条件 
#例如在进行分组查询并查找具体的某行信息
select 显示列 from tbName,(select 显示列 from tbName group by 条件)查找的分组信息**视图** where 条件
select e.dept_id,e.name,e.sal from emp e,(select max(sal) maxsal,dept_id from emp group by dept_id) t where t.maxsal=e.sal and t.dept_id=e.dept_id;
```

+  

