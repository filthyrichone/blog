---
title: docker
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [docker]
categories:
  - [docker]
date: 2021-07-04 12:49:50
author:
img:
coverImg:
summary:
---

### docker介绍
+ docker是什么？
> 阮一峰老师说：Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。简单来讲就是使用虚拟容器技术，来封装**应用程序和运行该程序运行所需要的依赖**，来避免所谓**“在我的电脑上可以运行”**的尴尬局面。

+ docker优势？
> 1、使用docker减少环境配置，特别是布置大型的应用、多个（集群）的分布式业务能减少很多麻烦。
> 2、docker比linux虚拟机少了很多的冗余内容（guest os、Hypervisor）
> 3、docker可以保证环境一致的迁移使用
![VM和docker对比图](/images/docker/dockerVMCompare.png)

+ docker用途
（1）提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
（2）提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
（3）组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构

### docker安装和配置
+ 安装
> 官网对不同的操作系统的安装做了详尽的说明**[docker官方安装说明](https://docs.docker.com/engine/install/)**

**实例：1、aliyuncentos安装docker**
+ 删除已有服务器上的docker相关文件
```shell
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

+ 安装yum-utils&&配置docker仓库镜像
1、安装yum-utils
```shell
yum install -y yum-utils
```
2、配置阿里云镜像
```shell
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo #使用阿里云centos的docker仓库地址
```

+ 安装docker引擎
```shell
sudo yum install docker-ce docker-ce-cli containerd.io
# 查看docker的版本列表&&安装指定版本docker
yum list docker-ce --showduplicates | sort -r
yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
# 启动docker
systemctl start docker
# 运行docker镜像（container的命令，会自动去下载对应的image然后生成container实例并运行）
docker run hello-world
```

+ 配置阿里云镜像加速
> 阿里云自己有docker镜像加速服务**[阿里云容器镜像加速](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)**，其中centos的配置如下
```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mnqcynsm.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
使用docker version||docker info查看安装的docker信息

**实列2：tencent云ubuntu安装docker**
1、卸载旧版的docker和docker-engine
```shell
$ sudo apt-get remove docker \
               docker-engine \
               docker.io
```

2、由于采用apt安装，因此我们首先需要添加使用 HTTPS 传输的软件包以及 CA 证书
```shell
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

3、确认所下软件的合法性，添加软件源的GPG密钥（建议使用国内）
```shell
# 阿里云镜像GPG密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4、向source.list文件中加入docker软件源(aliyun源)
```shell
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5、更新apt软件包的缓存
```shell
$ sudo apt-get update
```

**6、大招：脚本自动安装**
```shell
# $ curl -fsSL test.docker.com -o get-docker.sh
$ curl -fsSL get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
# $ sudo sh get-docker.sh --mirror AzureChinaCloud
```
以上命令会启动脚本，自动的将一切准备工作做好，并且把 Docker 的稳定(stable)版本安装在系统中

7、普通用户添加到docker用户组
```shell
# 建立docker用户组
$ sudo groupadd docker
# 添加当前用户到用户组中
$ sudo usermod -aG docker $USER
```
原因：默认情况下，docker 命令会使用 Unix socket 与 Docker 引擎通讯。而只有 root 用户和 docker 组的用户才可以访问 Docker 引擎的 Unix socket。出于安全考虑，一般 Linux 系统上不会直接使用 root 用户。因此，更好地做法是将需要使用 docker 的用户加入 docker 用户组

8、配置镜像加速
```shell
vi /etc/docker/daemon.json
# 添加以下镜像加速源：
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://mirror.css.tencentyun.com" #仅供腾讯云内部访问
  ]
}
```

9、重启daemon进程和docker
```shell
systemctl daemon-reload
systemctl restart docker
```

10、检查是否配置成功
```shell
docker info
# 若出现如下信息，表示配置成功
 Registry Mirrors:
  https://hub-mirror.c.163.com/
  https://mirror.baiduce.com/
  https://mirror.css.tencentyun.com/
```

### docker镜像image文件
> image文件是一个用来创建可运行的docker实例的模板，它可以被继承使用（一般使用已有修改简便）。

+ 常见命令

|命令|简写\|特殊写法|释义|可选参数|
|---|---|---|---|
|docker image ls [参数]|docker images|列出本地所有镜像|-a：所有镜像信息，-q：仅展示镜像id，-aq，所有镜像id|
|docker search imageName|-|搜索docker镜像|-f=[tag:stars]=3000:过滤端口小于3000的镜像|
|docker pull imageName:version|docker pull imageName|下载镜像默认最新的latest|-|
|docker rmi imageName1 imageName2 ...|docker rmi -f $(docker images -aq)|移除指定镜像\|所有的镜像|-f：强制移除|
|docker commit -a='作者' -m='msg' containerID/containerName 自定义镜像名称:版本|-|提交一个自定义的镜像文件|-|
**docker的实现原理：**使用union file system分层的管理包底层公用kernel的bootfs文件，使用不同的rootfs（对应不同的操作系统）精简了系统的大部分功能，保留基本的命令行等。

### docker容器container
> 通过image生成的可以运行的实例文件，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。，而且关闭容器并不会删除容器文件，只是容器停止运行而已。

+ 常见容器命令
|命令|简写\|特殊写法|释义|可选参数|
|---|---|---|---|
|docker container run [参数] imageName |-|创建一个容器实例并运行它|-p：端口映射（外：容器内），-it：shell命令行投影，--name：容器实例重命名，-d：后台运行（实例没有前台服务自动停止）|
|docker container kill [containID] |-|停止容器实例|-|
|docker container stop [containID] |-|停止容器实例|-|
|docker container ls [参数] |-|停止容器实例|-a：列出所有（包括终止运行的容器）|
|docker container rm [containID] |docker container run --rm -p 8000:3000 -it koa-demo /bin/bash|删除容器实例\|在容器终止运行后自动删除容器|-|
|docker rm [参数] containID|docker rm -f $(docker container ps|docker container ls -aq)|删除container实例|-f：强制执行|
|docker kill containID|-|强制停止container实例|-|
|docker stop containID|-|停止container实例|-|
|docker start containID|-|启动container实例|-|
|docker restart containID|-|重启container实例|-|
|docker container ps [参数]|-|重启container实例|-a：所有container实例（包含停止的），-q：实例id（containerID）|
|docker top containID|-|显示进程\|父进程运行信息|-|
|docker inspect containID|-|展示正在运行的实例具体信息|-|
|docker logs [参数] containID|-|显示日志|-n --tail：条数|
|docker cp containID\|containName:docName targetPath|-|复制docker文件至指定路径|-|
|docker attach containID\|containName|-|进入正在运行的container实例|-|
|docker exec -it containID\|containName /bin/bash|-|进入正在运行的cotainer实例，并打开新的窗口（不影响正在运行）|-|
|docker stats containID\|containName|-|展示container实例的内存使用情况|-|
**-it：使用可命令交互的方式运行**

+ 安装es+kibana
```shell
# 拉取elasticsearch的image镜像
docker pull elasticsearch
# 运行elasticsearch（注意配置运行内存）
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xms512m" elasticsearch:tag
```

+ 安装可视化操作面板
```shell
# 安装portainer
docker run -d -p 8080:9000 --restart=always -v /var/run/docker/.sock:/var/run/docker.sock --privileged=true portainer/portainer
```

+ 根据端口号差进程，然后根据pid杀进程
```shell
netstat -antup
nestat 
```

### 容器数据卷volume
> 容器的数据保存要求可以**容器间共享、持久化保存**,容器数据卷应运而生。

#### 命令行设置数据卷
+ 指定路径的映射
docker run -p 3306:3306 --name='mysql'-e 'MYSQL_ROOT_PASSWORD=root' -v /home/mysql/conf:/etc/mysql/conf.d -v /home/msyql/data:/var/lib/mysql -d  mysql
+ 具名映射
docker run --name=nginx -P -v juming:/etc/nginx -d nginx
+ 匿名映射
docker run --name=nginx -P -v /etc/nginx -d nginx

**注意：**
1、不指定路径的映射都默认将映射文件放置到/var/lib/docker/volumes/XXX/_data下
2、mysql要指定初始密码：-e MYSQL_ROOT_PASSWORD=root，映射/etc/mysql时启动docker就退出？？？

|命令|释义|
|---|---|
|docker inspect containerID/containerName|查找mount的volume卷信息（名称）|
|docker volume ls|列出所有的volume信息|
|docker volume inspect volumeName|查看volume详细信息|

+ 通过commit提交运行的container实例生成自定义镜像（container也只是在image上加了一层自定义的files）
```shell
docker 
```

#### dockerfile文件挂载数据卷
+ 创建dockerfile文件
```shell
FROM dockerImageName
VOLUME ['volume1','volume2']
CMD /bin/bash
```
+ 生成镜像
```shell
# 生成自定义docker image镜像
docker build -f dockerfilePath -t imageName imageStorageLocation(.表当前目录)
```

#### 容器间共享数据卷
+ 使用--volumes-from containerId/containerName ：共享数据
```shell
# 例如两个mysql数据库使用同一个数据卷
docker run -p 3306:3306 --name my01 -e MYSQL_ROOT_PASSWORD=root --volumes-from my -d my:1.0
```

#### dockerfile创建建镜像

![dockerimage原理](/images/docker/dockerImage.jpg)
![dockerfile常见命令](/images/docker/dockerFileDirection.png)
![dockerfile常见命令总结](/images/docker/dockerfileDirection01.png)
![docker常见命令](/images/docker/dockerDirections.png)

+ cmd命令和entrypoint区别：dockerfile中的cmd命令只有最后一条会被执行，且在启动镜像时，添加的命令会替换掉他。entrypoint则不会被覆盖。

+ 实例：tomcat+jdk+vim实现功能

#### 发布docker到仓库

docker login 
docker logout
docker tag

### docker网络netwokr

+ 原理：evth-pair桥接bridge技术

+ 默认网络docker0，名字ping不通--link+名称设置可ping通

+ 自建网络 docker network create 

+ 创建redis集群
```shell
# 创建redis集群
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat  EOF /mydata/redis/node-${port}/conf/redis.conf
port 6379 
bind 0.0.0.0
cluster-enabled yes 
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done
# 启动容器实例
docker run -p 6371:6379 -p 16371:16379 --name redis-1 \
    -v /mydata/redis/node-1/data:/data \
    -v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \
    -d --net redis --ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
# 创建redisjiqun
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1
```

+ springboot微服务
    

### bug全集

+ volume数据卷挂载错误
```shell
invalid mount {Destination:[volume1,volume2] Type:bind Source:/var/lib/docker/volumes/85a4574c659e9d2709852f32cd7070dba21351354e6ba98a28e49781c837ea12/_data Options:[rbind]}: mount destination [volume1,volume2] not absolute: unknown.
```
解决方案：卷前加/指定绝对路径：/volume1

+ nginx启动异常，-d一启动就自动退出
```shell
[root@iZ0jl5de38snuehexgcjliZ ng]# docker run --name ng -P -v $PWD/home/ng/conf/nginx.conf:/etc/nginx/nginx.conf:rw -d ng:1.0
5e8a413844c7920d48f861ee2040b04505010da0e6dfbb6bc0500b6998d022b2
docker: Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: mounting "/home/ng/home/ng/conf/nginx.conf" to rootfs at "/etc/nginx/nginx.conf" caused: mount through procfd: not a directory: unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type.
[root@iZ0jl5de38snuehexgcjliZ ng]# docker run --name my-custom-nginx-container -v /host/path/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
40cceb90a914d99060409ac427242dd4207895b3d8a2d3fc598e06a0d3c007ba
```
解决方案：待解决

+ 挂载springcloudjarweb文件报错,查看docker启动日志结果如下：
```shell
# [root@iZ0jl5de38snuehexgcjliZ idea] docker logs -n --tail=1 web
# --server.port=8080: 1: --server.port=8080: [java,-jar,/app.jar]: not found
```
解决方案：**超级大坑：**在shell脚本里ENTRYPOINT的中括号要使用"双引号，否则报此错误错