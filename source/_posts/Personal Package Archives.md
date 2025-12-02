---
title: Personal Package Archives
date: 2021-09-02 17:30:52
tags: [ Linux, Node ]
category: Deploy
---

## 简介
PPA是Personal Package Archives，个人软件包文档，是默认情况下并未被包含在Ubuntu中的软件的一个集合。通常这些存储库的侧重点是单个的程序，不过他们也可以包含更多内容，这取决于这些存储库的维护者

## 使用方法
一个完整的通过PPA源安装软件的命令，例如添加VLC播放器源并安装的命令

```Bash
sudo add-apt-repository ppa:videolan/stable-daily #添加videolan/stable-daily源
sudo apt-get update #更新系统源
sudo apt-get install vlc #安装VLC软件
```

## 使用PPA安装nodeJs
nodejs 14.x 版本，可以运行如下命令

```Bash
cd ~
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt update
sudo apt install nodejs
```

要安装 nodejs 最新版本，可以运行如下命令：

```Bash
cd ~
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt update
sudo apt install nodejs
```