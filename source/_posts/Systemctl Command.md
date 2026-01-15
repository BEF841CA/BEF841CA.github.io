---
title: systemctl Command
date: 2021-05-25 17:43:32
tags: [ Linux, Command ]
category: Develop
---

启动service

```Bash
systemctl start 服务名称.service
```

停止service

```Bash
systemctl stop 服务名称.service
```

重启service

```Bash
systemctl restart 服务名称.service
```

查看service状态

```Bash
systemctl status 服务名称.service
```

在开机时启用service

```Bash
systemctl enable 服务名称.service
```

在开机时禁用service

```Bash
systemctl disable 服务名称.service
```

查看service是否开机启动

```Bash
systemctl is-enabled 服务名称.service
```

查看已启动的service列表

```Bash
systemctl list-unit-files|grep enabled
```

查看启动失败的service列表

```Bash
systemctl --failed
```

查看service日志

```Bash
journalctl -f -u 服务名称.service -n 1000
```