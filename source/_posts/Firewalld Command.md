---
title: Firewalld 配置
date: 2021-05-19 10:56:13
tags: [ Linux, Firewall, Command ]
category: Deploy
---

## firewall防火墙

查看firewall服务状态

```Bash
systemctl status firewalld
```

查看firewall的状态

```Bash
firewall-cmd --state
```

开启 firewalld.service服务

```Bash
service firewalld start
```

重启 firewalld.service服务

```Bash
service firewalld restart
```

关闭 firewalld.service服务

```Bash
service firewalld stop
```

查看防火墙规则

```Bash
firewall-cmd --list-all
```

查询端口是否开放

```Bash
firewall-cmd --query-port=8080/tcp
```

开放80端口

```Bash
firewall-cmd --permanent --add-port=80/tcp
```

移除端口

```Bash
firewall-cmd --permanent --remove-port=8080/tcp
```

重启防火墙(修改配置后要重启防火墙)

```Bash
firewall-cmd --reload
```