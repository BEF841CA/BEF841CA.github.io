---
title: Container Runtime Interface (CRI) CLI Command
date: 2026-01-15 15:07:53
tags: [ Containerd, Container, Command]
category: Containerd
---

##  镜像管理（Images）

```bash
# 列出所有镜像
ctr images ls

# 拉取镜像
ctr images pull docker.io/library/nginx:latest

# 打标签（类似 docker tag）
ctr images tag nginx:latest my-app:v1
ctr images tag nginx:latest my-app:v1 my-app:prod  # 支持多标签

# 强制覆盖已有标签（部分版本支持）
ctr images tag --force old-image:new new-image:new

# 导出镜像（OCI 格式）
ctr images export nginx.tar nginx:latest

# 导入镜像
ctr images import nginx.tar

# 删除镜像
ctr images rm nginx:latest my-app:v1
```

## 容器（Containers）

```bash
# 列出容器定义
ctr containers ls

# 创建容器（不启动）
ctr containers create nginx:latest my-nginx

# 删除容器
ctr containers rm my-nginx
```

## 任务（Tasks）

```bash
# 启动任务（运行容器）
ctr tasks start my-nginx

# 列出运行中的任务
ctr tasks ls

# 进入容器执行命令
ctr tasks exec --exec-id $(uuidgen) -t my-nginx /bin/sh

# 查看任务内进程
ctr tasks ps my-nginx

# 停止任务
ctr tasks kill my-nginx

# 删除已停止的任务
ctr tasks rm my-nginx
```

## 命名空间（Namespaces）

```bash
# 列出所有命名空间
ctr namespaces ls

# 在指定命名空间操作（例如查看 K8s 镜像）
ctr -n k8s.io images ls

# 创建命名空间（谨慎使用）
ctr namespaces create test-ns
```

## 沙箱管理（Sandboxes)

```bash
# 列出沙箱（Pod）
ctr sandboxes ls

# 查看沙箱详情（需在 k8s.io 命名空间）
ctr -n k8s.io sandboxes info <sandbox-id>
```

## 系统信息与插件

```bash
# 查看 client/server 版本
ctr version

# 查看 containerd 服务器信息
ctr info

# 列出已加载插件
ctr plugins ls
```

## 快照管理（Snapshots）

```bash
# 若系统有 uuidgen
ctr tasks exec --exec-id $(uuidgen) -t my-nginx /bin/sh

# 若无 uuidgen，可用时间戳
ctr tasks exec --exec-id $(date +%s%N) -t my-nginx /bin/sh
```