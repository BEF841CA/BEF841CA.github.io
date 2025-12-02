---
title: 自动更新 Docker 容器
date: 2024-01-15 21:13:49
tags: [ Docker ]
category: Docker
---

# [watchtower](https://containrrr.dev/watchtower)

## 示例
```Bash
docker run -d -e TZ=Asia/Shanghai --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -e WATCHTOWER_CLEANUP=true -e WATCHTOWER_SCHEDULE="0 0 5 * * *" containrrr/watchtower
```
## 配置

### 时区
```plaintext
            Argument: N/A
Environment Variable: TZ
                Type: String
             Default: "UTC"
```

### 自动清理
```plaintext
            Argument: --cleanup
Environment Variable: WATCHTOWER_CLEANUP
                Type: Boolean
             Default: false
```

### 删除匿名卷
```plaintext
            Argument: --cleanup
Environment Variable: WATCHTOWER_CLEANUP
                Type: Boolean
             Default: false
```

### 轮询间隔
```plaintext
            Argument: --interval, -i
Environment Variable: WATCHTOWER_POLL_INTERVAL
                Type: Integer
             Default: 86400 (24 hours)
```

### 调度
```plaintext
            Argument: --schedule, -s
Environment Variable: WATCHTOWER_SCHEDULE
                Type: String
             Default: -
```

### 运行一次
```plaintext
            Argument: --run-once, -R
Environment Variable: WATCHTOWER_RUN_ONCE
                Type: Boolean
             Default: false
```

## 通知

### 通知日志级别
```plaintext
            Argument: --notifications-level
Environment Variable: WATCHTOWER_NOTIFICATIONS_LEVEL
                Type: String
             Default: info (panic, fatal, error, warn, info, debug, trace)
```
### 主机名
```plaintext
            Argument: --notifications-hostname
Environment Variable: WATCHTOWER_NOTIFICATIONS_HOSTNAME
                Type: String
```
### 标题前缀
```plaintext
            Argument: --notification-title-tag
Environment Variable: WATCHTOWER_NOTIFICATION_TITLE_TAG
                Type: String
```
### 通知url
使用[shoutrrr](https://containrrr.dev/shoutrrr/)发送通知
```plaintext
            Argument: --notification-url
Environment Variable: WATCHTOWER_NOTIFICATION_URL
                Type: String
                E.g.: smtp://username:password@host:port/?from=fromAddress&to=recipient1[,recipient2,...]
```
* Username - SMTP server username   
  Default: empty   
  URL part: smtp://username:password@host:port/
* Password - SMTP server password or hash (for OAuth2)   
  Default: empty   
  URL part: smtp://username:password@host:port/
* Host - SMTP server hostname or IP address (Required)   
  URL part: smtp://username:password@host:port/
* Port - SMTP server port, common ones are 25, 465, 587 or 2525   
  Default:    
  URL part: 25smtp://username:password@host:port/
* FromAddress - E-mail address that the mail are sent from (Required)   
  Aliases: from
* ToAddresses - List of recipient e-mails separated by "," (comma) (Required)   
  Aliases: to
