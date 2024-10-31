---
title: Docker 容器创建
date: 2023-11-22 10:18:32
tags: [Docker]
category: 
---

## Nginx

拉取镜像
```Bash
docker pull nginx
```

创建Nginx配置文件
```Bash
mkdir -p $PWD/nginx/conf
mkdir -p $PWD/nginx/log
mkdir -p $PWD/nginx/html
```

生成容器
```Bash
docker run --name nginx -d nginx
```

将容器nginx.conf文件复制到宿主机
```Bash
docker cp nginx:/etc/nginx/nginx.conf $PWD/nginx/conf/nginx.conf
```

将容器conf.d文件夹下内容复制到宿主机
```Bash
docker cp nginx:/etc/nginx/conf.d $PWD/nginx/conf/conf.d
```

将容器中的html文件夹复制到宿主机
```Bash
docker cp nginx:/usr/share/nginx/html $PWD/nginx/
```

删除容器
```Bash
docker stop nginx
docker rm nginx
```

启动容器
```Bash
docker run \
-p 80:80 \
--name nginx \
-v $PWD/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/nginx/conf/conf.d:/etc/nginx/conf.d \
-v $PWD/nginx/log:/var/log/nginx \
-v $PWD/nginx/html:/usr/share/nginx/html \
-d nginx
```