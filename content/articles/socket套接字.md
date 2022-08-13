---
title: socket套接字
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [套接字]
  - [socket]
categories:
  - [java]
date: 2020-12-27 16:24:11
author:
img:
coverImg:
summary:
---
## 网络套接字对象
> 套接字端口范围为0~65535，常见服务端口范围为0-1024，50000后为系统保留的端口用于随机分配

## ServerSocket/Socket创建一个服务连接模型
> 服务端使用ServerSocket(int port)创建服务端套接字和并使用他的实例对象的accept方法等待客户端创建一个连接。
> 客户端直接使用Socket(String ip,int port)实例对象创建一个连接。
> 客户端服务端均通过getInput/OutputStream()方法获得信息传输流。

+ 建立一个服务端-客户端模型服务
```java
//创建一个服务端连接
public static void main(String[] args) throws IOException {
    ServerSocket socket = new ServerSocket(9000);
    Socket server = socket.accept();
    System.out.println("服务启动成功");
    InputStream in = server.getInputStream();
    OutputStream out = server.getOutputStream();
    for (int i = 0; i < 5; i++) {
        char c = (char) in.read();
        System.out.print(c);
    }
    out.write("world".getBytes());
    out.flush();
    server.close();
    socket.close();
}
//创建一个客户连接
public static void main(String[] args) throws IOException {
    Socket skt = new Socket("127.0.0.1", 9000);
    InputStream in = skt.getInputStream();
    OutputStream out = skt.getOutputStream();
    out.write("hello".getBytes());
    out.flush();
    for (int i = 0; i < 5; i++) {
        char c = (char) in.read();
        System.out.print(c);
    }
    skt.close();
}
```
+ 使用ServerSocket方法创建的socket在使用accept方法后会一直等待客户端的连接，如果没有连接就会一直等待。
+ 客户端连接上了服务端后会等待消息（in.read()）然后执行。
+ 使用in.read()/out.write(byte[] b)时注意写入的是byte数组，读取的是int型，需要使用getBytes([cherst])和char类型强转保证字符编码一致。

## 多线程客户-服务端
> 实际使用中多使用一个服务端与多个客户端建立连接的情况，使用多线程解决。

+ 服务端模型
![创建一个多线程服务端服务](/images/creatMultiThreadServerSocket.png)
```java
public static void main(String[] args) {
    runServerSocket();
    System.out.println("启动服务器");
}
//创建socket连接，等待客户端连接并创建服务实例具体执行服务
private static void runServerSocket() {
    new Thread() {
        public void run() {
            try {
                ServerSocket sskt = new ServerSocket(9000);
                while (true) {
                    Socket server = sskt.accept();
                    System.out.println("一个客户端上线");
                    ServerThread st = new ServerThread(server);
                    st.start();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("服务端端口异常未正常启动");
        };
    }.start();
}
//具体的执行服务的线程类
static class ServerThread extends Thread {
    private Socket s;

    public ServerThread(Socket s) {
        super();
        this.s = s;
    }

    @Override
    public void run() {
        try {
            InputStream in = s.getInputStream();
            OutputStream out = s.getOutputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in, "utf-8"));
            PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, "utf-8"));
            String line;
            while ((line = reader.readLine()) != null) {
                writer.println(line);
                writer.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("一个客户端断开了连接");
    }
}
```
+ 客户端服务
```java
public static void main(String[] args) {
    try {
        Socket skt = new Socket("127.0.0.1", 9000);
        InputStream in = skt.getInputStream();
        OutputStream out = skt.getOutputStream();
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, "utf-8"));
        BufferedReader reader = new BufferedReader(new InputStreamReader(in, "utf-8"));
        while (true) {
            String inp = new Scanner(System.in).nextLine();
            System.out.println("输入：" + inp);
            writer.println(inp);
            writer.flush();
            String res = reader.readLine();
            System.out.println("回声：" + res);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
> **注意**：
1、在使用PrintWriter实例对象写入一行字符串以后一定要使用writer.flush()将写入内容发送出去。否则程序客户端会一直等待，直到你调用flush推送了消息，而在这期间服务端不会收到消息，程序不会报错。
2、在使用InputStreamWriter/Reader(in/out,[charset])不要忘了指定编码规则，否则乱码。

## socket实现建议聊天室
> 使用ServerSocket和Socket搭建一个简易的聊天室。
+ 使用while循环accept创建多个工作线程
![创建Chat的服务端](/images/createChatServer.png)
```java
public class SocketChatServer {
	private static ArrayList<workThread> sktList = new ArrayList<>();

	public static void main(String[] args) {
		launchServer();
	}

	private static void launchServer() {
		try {
			ServerSocket sskt = new ServerSocket(9000);
			System.out.println("服务在9000端口启动。。。。");
			while (true) {
				Socket server = sskt.accept();
				System.out.println("一个客户端上线");
				new workThread(server).start();
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("端口被占用或其他异常，服务启动失败");
		}
	}

	static class workThread extends Thread {
		private Socket s;
		private BufferedReader reader;
		private PrintWriter writer;
		private String name;

		public workThread(Socket s) {
			super();
			this.s = s;
		}

		@Override
		public void run() {
			try {
				reader = new BufferedReader(new InputStreamReader(s.getInputStream(), "utf-8"));
				writer = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), "utf-8"));
				name = reader.readLine();
				send(name + "欢迎加入群聊！~");
				sktList.add(this);
				sendAll(name + "已经加入了群聊");
				String line;
				while ((line = reader.readLine()) != null) {
					sendAll(name + "说：" + line);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			sktList.remove(this);
			sendAll(name + "离开了群聊");
			System.out.println(name + "离开了群聊");
		}

		private void sendAll(String string) {
			for (workThread wt : sktList) {
				wt.send(string);
			}
		}

		private void send(String string) {
			this.writer.println(string);
			this.writer.flush();
		}
	}
}
```
+ 利用三个线程、消息队列和synchronized实现消息存储，实时显示
![创建Chat客户端](/images/createChatClient.png)
```java
static class Client {
    private LinkedList<String> msgList = new LinkedList<>();
    private Boolean inputFlag = false;
    private PrintWriter writer;
    private BufferedReader reader;
    private String name;
    private String line;

    public Client(String name) {
        super();
        this.name = name;
    }
    private void launchClient() {
        try {
            Socket skt = new Socket("127.0.0.1", 9000);
            writer = new PrintWriter(new OutputStreamWriter(skt.getOutputStream(), "utf-8"));
            reader = new BufferedReader(new InputStreamReader(skt.getInputStream(), "utf-8"));
            writer.println(name);
            writer.flush();
            // 接收消息
            new Thread() {
                public void run() {
                    reciveMsg();
                };
            }.start();
            // 打印消息
            new Thread() {
                public void run() {
                    printMsg();
                };

            }.start();
            // 输入消息
            new Thread() {
                public void run() {
                    inputMsg();
                };
            }.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected void reciveMsg() {
        try {
            while (null != (line = reader.readLine())) {
                synchronized (msgList) {
                    msgList.add(line);
                    msgList.notifyAll();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected void inputMsg() {
        System.out.println("按回车输入内容：");
        while (true) {
            String inp = new Scanner(System.in).nextLine();
            inputFlag = true;
            writer.println(inp);
            writer.flush();
            synchronized (msgList) {
                msgList.notifyAll();
            }
            inputFlag = false;
        }
    }

    protected void printMsg() {
        while (true) {
            synchronized (msgList) {
                while (0 == msgList.size() || inputFlag) {
                    try {
                        msgList.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println(msgList.removeFirst());
            }
        }
    }
}
```