---
title: SSH 安全
date: 2024-01-30 14:37:00
tags: [Linux, SSH]
category:
---

# 查看登录信息

## Log

查看登录日志
```Bash
cat /var/log/auth.log
```

查看尝试登录IP和尝试登录的用户名
```Bash
cat /var/log/auth.log | grep 'Invalid' | awk '{print $10 "\t" $8}' | sort
```

查看尝试登录用户名次数统计
```Bash
cat /var/log/auth.log | grep 'Invalid' | awk '{print $8}' | sort | uniq -c | sort -bn
```

### lastb

显示登录失败的用户
```Bash
lastb
```

统计登录失败次数命令
```Bash
lastb | awk '{ print $3}' | sort | uniq -c | sort -n
```

# 防护

## [Fail2Ban](https://github.com/fail2ban/fail2ban)

Fail2Ban扫描诸如`/var/log/auth.log`之类的日志文件，并禁止IP地址进行过多失败的登录尝试。它通过更新系统防火墙规则来实现这一点，以在可配置的时间内拒绝来自这些IP地址的新连接。Fail2Ban开箱即用，可以读取许多标准日志文件，例如sshd和Apache的日志文件，并且可以轻松地配置为读取您选择的任何日志文件，以应对您想要的任何错误。