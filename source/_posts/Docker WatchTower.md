---
title: 自动更新 Docker 容器
date: 2024-01-15 21:13:49
tags: [Docker]
category: Docker
---

```
docker run -d -e TZ=Asia/Shanghai --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --cleanup --schedule  "0 0 5 * * *"
```
