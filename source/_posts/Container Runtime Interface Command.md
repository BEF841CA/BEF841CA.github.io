---
title: Container Runtime Interface (CRI) CLI Command
date: 2026-01-15 15:07:53
tags: [ Kubernetes, Container, Command]
category: Kubernetes
---

## 镜像管理

``` Bash
# 列出所有镜像
crictl images

# 拉取镜像
crictl pull nginx:latest

# 删除镜像
crictl rmi nginx:latest

# 查看镜像详细信息
crictl inspecti nginx:latest
```

## 容器管理

``` Bash
# 列出所有容器（包括已停止的）
crictl ps -a

# 列出正在运行的容器
crictl ps

# 查看容器详细状态
crictl inspect <container-id>

# 获取容器日志
crictl logs <container-id>

# 在容器中执行命令
crictl exec -it <container-id> /bin/sh

# 启动已创建的容器
crictl start <container-id>

# 停止运行中的容器
crictl stop <container-id>

# 删除容器
crictl rm <container-id>

# 查看容器资源使用情况
crictl stats
```

## Pod 管理

``` Bash
# 列出所有 Pods
crictl pods

# 查看 Pod 详细信息
crictl inspectp <pod-id>

# 运行新 Pod（通常由 Kubelet 自动管理，手动慎用）
crictl runp <pod-config.json>

# 停止 Pod（会停止其所有容器）
crictl stopp <pod-id>

# 删除 Pod
crictl rmp <pod-id>
```