---
title: Github Config
date: 2023-08-16 17:01:32
tags: [ Github ]
category: Github
---

## 解决被墙问题
拉取代码  
[GitHub Proxy](https://ghproxy.com/)

推送代码
```Bash
git config  http.https://github.com.proxy http://127.0.0.1:1080
```

## 仓库设置
查看git配置信息
```Bash
git config --list 
```
查看git用户名、密码、邮箱的配置
```Bash
git config user.name
git config user.password
git config user.email
```