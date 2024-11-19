---
title: Docker Command
date: 2021-05-11 10:09:53
tags: [Docker]
category: Docker
---

## docker

查看所有的容器

```Bash
docker ps -a 
```

所有的镜像

```Bash
docker image ls 
```

删除镜像

```Bash
docker rmi xxxxx 
```

删除容器

```Bash
docker rm -f xxxxxx
```

设置开机自启动

```Bash
docker update --restart=always xxxxxx
```

进入容器

```Bash
docker exec -it xxxxx /bin/sh
```

## docker-compose

启动应容器

```Bash
docker-compose up
 ```

后台启动容器

```Bash
docker-compose up -d
 ```

列出项目中目前的所有容器

```Bash
docker-compose ps
 ```

停止容器

```Bash
docker-compose stop
 ```

解决时区不同步问题

```Bash
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

date -R
 ```