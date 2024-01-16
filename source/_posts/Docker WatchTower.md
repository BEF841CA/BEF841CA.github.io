---
title: 自动更新 Docker 容器
date: 2024-01-15 21:13:49
tags: [Docker]
category: Docker
---

## [watchtower](https://containrrr.dev/watchtower)

### 示例
```
docker run -d -e TZ=Asia/Shanghai --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --cleanup --schedule  "0 0 5 * * *"
```

### 时区
```
            Argument: N/A
Environment Variable: TZ
                Type: String
             Default: "UTC"
```

### 自动清理
```
            Argument: --cleanup
Environment Variable: WATCHTOWER_CLEANUP
                Type: Boolean
             Default: false
```

### 删除匿名卷
```
            Argument: --cleanup
Environment Variable: WATCHTOWER_CLEANUP
                Type: Boolean
             Default: false
```

### 轮询间隔
```
            Argument: --interval, -i
Environment Variable: WATCHTOWER_POLL_INTERVAL
                Type: Integer
             Default: 86400 (24 hours)
```