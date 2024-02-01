---
title: 自动部署jar包sh工具
date: 2021-05-27 14:52:32
tags: [Linux, Shell]
category: JAVA
---

## 自动部署sh脚本文件

```Bash
#!/bin/bash

export JAVA_HOME=/usr/java/jdk1.8.0_241-amd64
export PATH=${JAVA_HOME}/bin:${PATH}

APP_NAME="auto-start-0.0.1-SNAPSHOT.jar"

usage() {
    echo "case: sh run.sh [start|stop|restart|status]"
    exit 1
}

isExist(){
  #grep -v grep 反向选取记录行，此处为选取不带grep内容的结果
  #awk 选取列
  pid=`ps -ef | grep ${APP_NAME} | grep -v grep | awk '{print $2}'`
  #如果不存在返回1，存在返回0
  if [ -z "${pid}" ]; then
    return 1
  else
    return 0
  fi    
}

start(){
  isExist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is already running,pid = ${pid}."
  else
    nohup java -jar "/home/${APP_NAME}" > /dev/null 2>&1 &
    echo "${APP_NAME} start success"
  fi    
}

stop(){
   isExist
   if [ $? -eq "0" ]; then
     kill -9 ${pid}
   else
     echo "${APP_NAME} is not running"
   fi    
}

status(){
  isExist
   if [ $? -eq "0" ]; then
     echo "${APP_NAME} is running. Pid is ${pid}"
   else
     echo "${APP_NAME} is not running"
   fi  
}

restart(){
  stop
  start
}

case "$1" in
"start")
  start
  ;;
"stop")
  stop
  ;;
"status")
  status
  ;;
"restart")
  restart
  ;;
*)
usage
;;
esac
```
## 创建服务

### 目录

```plaintext
/etc/systemd/system
```

### 文件

```plaintext
[Unit]
Description=Springboot project for test auto start
After=syslog.target network.target nss-lookup.target
 
[Service]
User=root
Type=forking
ExecStart=sh /home/autodeploy.sh start
ExecReload=sh /home/autodeploy.sh restart
ExecStop=sh /home/autodeploy.sh stop
 
[Install]
WantedBy=multi-user.target  
```
