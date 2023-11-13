---
title: Windows OpenSSH
date: 2021-11-17 10:04:09
tags: [Windows, SSH]
category: Windows
---

## 官方文档

[使用 OpenSSH 管理 Windows](https://docs.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_overview)

## 手动安装

### 下载安装包

从 [GitHub 地址](https://github.com/PowerShell/Win32-OpenSSH)  下载最新的openssh包

### 解压安装包

将解压包放到C盘的目录 `C:\Program Files (x86)\` 下

### 配置环境变量

将OpenSSH文件夹路径添加到Path变量中

### 安装openssh

在OpenSSH文件夹下运行 `.\install-sshd.ps1` 命令

### sshd服务

打开服务。在列表中找到 **sshd（OpenSSH SSH Server）** ，并将启动类型更改为 **自动** 。然后运行sshd。

### 修改端口

修改 `C:\ProgramData\ssh` 目录下 **sshd_config** 文件。
*在ssh服务启动后，才可以修改，修改之后再重启服务即可*

```Bash
Port 22
```

### 生成主机密钥

在OpenSSH文件夹下运行 `.\ssh-keygen.exe -A` 命令
