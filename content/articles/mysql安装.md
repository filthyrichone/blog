---
title:  
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [异常处理]
categories:
  - [mysql]
date: 2021-02-12 00:24:26
author:
img:
coverImg:
summary:
---

## 安装
1、从mysql[官方下载地址官](https://dev.mysql.com/downloads/mysql/)下载你需要的版本的压缩包
2、解压到自定义目录，新建/修改mysql.ini配置文件
```sql
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=E:\devtools\mysql-5.7.26-winx64   # 有些电脑需要用双斜线\\
# 设置mysql数据库的数据的存放目录
datadir=E:\devtools\mysql-5.7.26-winx64\Data   # 此处同上
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```
3、初始化mysql，以**管理员权限**运行cmd命令行窗口，输入以下命令初始化
```sql
mysqld --initialize-insecure
mysql -uroot -p
```
+ 初始默认密码root提示“ERROR 1045 (28000): Access denied for user 'ODBC'@'localhost' (using password: NO)”，可以试试用
```sql
mysql -uroot -proot
```
登录试试。

4、新建/删除mysql服务
```sql
mysqld --install [自定义服务名称]
mysqld --remove [自定义服务名称]
```
+ 省略自定义服务名称默认创建/删除mysql作为服务名称。

5、启动/停止mysql服务
```sql
net start [自定义服务名称]
net stop [自定义服务名称]
```

6、修改默认密码
```sql
#启动服务
net start 自定义服务名称
#进入mysql
mysql -uroot -p你的密码
#修改mysql.user数据库数据
alter mysql.user 'root'@'localhost' identified by 'root'
```

## mysql重装
1、停止服务，将在运行的mysql服务在任务管理器中停掉（cmd==>>输入services.msc==>>找到服务，然后stop）。
2、删掉mysql安装的目录文件（mysql.ini文件中配置的有）。
3、删除注册表信息，cmd==>>输入regedit==>>找到mysql，右键删除。
。。。步骤同**安装**步骤。

## 忘记密码
1、在mysql.ini上添加跳过权限认证
```sql
# 跳过密码验证
# skip-grant-tables
```
2、连接数据库，修改密码
```sql
#修改mysql.user数据库数据
update mysql.user set authentication_string=password('root') where suer='root';
#修改mysql.user数据库数据(5.6版)
update mysql.user set password=password('root') where suer='root';
#修改mysql.user数据库数据(8.0版及5.7版)
flush privileges;#加载权限表
alter user 'root'@'localhost' identified by 新的密码
```