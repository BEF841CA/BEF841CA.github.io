---
title: Linux Command
date: 2021-05-10 11:34:30
tags: [ Linux ]
category: Deploy
---

```Bash
// 显示服务状态
systemctl status docker.service
// 列出服务层级和依赖关系
systemctl list-dependencies docker.service
// 启动服务
systemctl start docker.service
// 关闭服务
systemctl stop docker.service
// 重启服务
systemctl restart docker.service
// 设置服务自启动
systemctl enable docker.service
// 禁止服务自启动
systemctl disable docker.service
// 查看服务是否自启动
systemctl is-enabled docker.service
// 列出系统所有服务的启动情况
systemctl list-units --type=service
// 列出所有自启动服务
systemctl list-unit-files|grep enabled
```