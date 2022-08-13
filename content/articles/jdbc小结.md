---
title: jdbc小结
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [jdbc]
categories:
  - [java]
date: 2021-01-10 20:39:01
author:
img:
coverImg:
summary:
---

## 使用
> jdbc是java database connectivity的简称,也是hibernate和mybitis的底层实现.

## 普通连接
> 通常通过jdbc完成一个sql操作需要以下几步
1加载类驱动com.mysql.jdbc.Driver
2建立连接,获取连接对象conn.getConnection(数据库路径,用户名,密码)
3通过连接对象创建Statement对象执行sql
4获取Statement执行完完sql后的结果ResultSet或其他
5释放资源(Resultset,Statement,Connection依次释放)
```java
package jdbc0110;
//Connection和Statement和ResultSet都是接口不是具体的实现类
//便于以后的维护修改
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import org.junit.Test;
//测试类
public class JdbCRUDRTest {
	@Test
	public void add() {
		new JdbcConnect() {
			@Override
			protected void executeSql(Statement stm) throws Exception {
				int flag = stm.executeUpdate("insert into account values(4,'jack',123414)");
				System.out.println(flag+"rows affected");
			}
		}.launch();
	}
	@Test
	public void delete() {
		new JdbcConnect() {
			
			@Override
			protected void executeSql(Statement stm) throws Exception {
				int flag = stm.executeUpdate("delete from account where id =4");
				System.out.println(flag+"rows affected");
			}
		}.launch();
	}
	@Test
	public void update() {
		new JdbcConnect() {
			
			@Override
			protected void executeSql(Statement stm) throws Exception {
				int flag = stm.executeUpdate("update account set money= 8888 where id = 1");
				System.out.println("flag"+flag);
			}
		}.launch();
	}
	@Test
	public void get() {
		new JdbcConnect() {
			
			@Override
			protected void executeSql(Statement stm) throws Exception {
				ResultSet res = stm.executeQuery("select * from account where id=2");
				if (res.next()) {
					int id = res.getInt("id");
					String name = res.getString("name");
					String money = res.getString("money");
					System.out.println("id:"+id+"name:"+name+"money:"+money);
				}
			}
		}.launch();
	}
	//静态内部抽象类
	static abstract class  JdbcConnect{
		Connection cnct = null;
		Statement stm = null;
		ResultSet res = null;
		public void launch() {
			try {
                //加载驱动类对象,其静态代码块中创建了DriverManager对象
				Class.forName("com.mysql.jdbc.Driver");
				cnct = DriverManager.getConnection("jdbc:mysql:///jt_db?characterEncoding=utf-8","root","root");
				stm = cnct.createStatement();
				executeSql(stm);
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				closeConnect(cnct,res,stm);
			}
		}
		protected abstract void executeSql(Statement stm) throws Exception;
		
		private void closeConnect(Connection cnct, ResultSet res, Statement stm) {
			if (null != res) {
				try {
					res.close();
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					res = null;
				}
			}
			if (null != stm) {
				try {
					stm.close();
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					stm = null;
				}
			}
			if (null != cnct) {
				try {
					cnct.close();
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					cnct = null;
				}
			}
		}
	}
}
```

## PreparedStatement预处理执行
> 相较于Statement对象直接执行程序sql,PreparedSatement加入了sql预处理,实现sql和参数分离从而避免sql注入攻击.
```java
String sql = "select * from user where username=? and password=?";
ps = conn.prepareStatement(sql);
ps.setString(1, name);
ps.setString(2, pw);
//查询sql
rs = ps.executeQuery();
//修改sql
rs = ps.executeUpdate();
```

## c3p0线程池
> 线程池的作用是将所有的连接对象存储起来,以减少不停建立和释放连接造成的资源浪费.
```java
//导入c3p0线程池类
import com.mchange.v2.c3p0.ComboPooledDataSource;
public class C3p0ComboTest {
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	@Test
	public void getInfo() {
		try {
			ComboPooledDataSource pool = new ComboPooledDataSource();
			pool.setDriverClass("com.mysql.jdbc.Driver");
			pool.setJdbcUrl("jdbc:mysql:///jt_db?characterEncoding=utf-8");
			pool.setUser("root");
			pool.setPassword("root");
			conn = pool.getConnection();
			ps = conn.prepareStatement("select * from account");
			rs = ps.executeQuery();
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				String money = rs.getString("money");
				System.out.println("id:"+id+"name:"+name+"money:"+money);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn, ps, rs);
		}
	}
}
```
+ 通常使用配置文件(**src目录**下建立c3p0.properties或c3p0-config.xml)的方式实现代码和配置分离,以便后期维护升级.
+ properties配置文件
```java
c3p0.driverClass=com.mysql.jdbc.Driver
c3p0.jdbcUrl=jdbc:mysql:///jt_db?characterEncoding=utf-8
c3p0.user=root
c3p0.password=root
```
+ xml配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
	<default-config>
		<property name="driverClass">
			com.mysql.jdbc.Driver
		</property>
		<property name="jdbcUrl">
			jdbc:mysql:///jt_db?characterEncoding=utf-8
		</property>
		<property name="user">
			root
		</property>
		<property name="password">
			root
		</property>
	</default-config>
</c3p0-config>
```

