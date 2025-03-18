---
title: Elasticsearch
date: 2025-03-11 17:00:00
tags: [Docker, Elasticsearch]
category: Elasticsearch
---

# 使用 Docker 安装 Elasticsearch

参考文档[elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

## 设置vm.max_map_count

### 查看 vm.max_map_count 设置的当前值

```Bash
grep vm.max_map_count /etc/sysctl.conf
```
### 修改 vm.max_map_count 值
```Bash
echo 'vm.max_map_count=262144' | tee -a /etc/sysctl.conf && sysctl -p
```

## Elasticsearch

### 拉取 Elasticsearch Docker 镜像
```Bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.17.3
```

### 初始化运行 Elasticsearch 容器
```Bash
docker run --name elasticsearch -m 8GB -it docker.elastic.co/elasticsearch/elasticsearch:8.17.3
```

### 查看 elastic 用户密码和 Kibana 的注册令牌
获取密码
```Bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Elasticsearch security features have been automatically configured!
✅ Authentication is enabled and cluster connections are encrypted.

ℹ️  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  3RuV+2q0b3cWH9jQq4WP

ℹ️  HTTP CA certificate SHA-256 fingerprint:
  a8206297696a4c960221f1085dc7a45ef70651939483fb8d49a0ddd4912afbc7

ℹ️  Configure Kibana to use this cluster:
• Run Kibana and click the configuration link in the terminal when Kibana starts.
• Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjE3LjAuMzo5MjAwIl0sImZnciI6ImE4MjA2Mjk3Njk2YTRjOTYwMjIxZjEwODVkYzdhNDVlZjcwNjUxOTM5NDgzZmI4ZDQ5YTBkZGQ0OTEyYWZiYzciLCJrZXkiOiJwVUZqanBVQlJCUHozMEZPc0lVZzphU2lLUmhVOVJ5YUxmV3pKXzY0Vm13In0=

ℹ️ Configure other nodes to join this cluster:
• Copy the following enrollment token and start new Elasticsearch nodes with `bin/elasticsearch --enrollment-token <token>` (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjE3LjAuMzo5MjAwIl0sImZnciI6ImE4MjA2Mjk3Njk2YTRjOTYwMjIxZjEwODVkYzdhNDVlZjcwNjUxOTM5NDgzZmI4ZDQ5YTBkZGQ0OTEyYWZiYzciLCJrZXkiOiJwa0ZqanBVQlJCUHozMEZPc0lVZzpURzR1OW1SU1J0Q01scW9ncUVUM3lBIn0=

  If you're running in Docker, copy the enrollment token and run:
  `docker run -e "ENROLLMENT_TOKEN=<token>" docker.elastic.co/elasticsearch/elasticsearch:8.17.3`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
重置密码
```Bash
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

### 持久化配置
```Bash
mkdir -p /opt/elasticsearch
docker cp elasticsearch:/usr/share/elasticsearch/config /opt/elasticsearch
docker cp elasticsearch:/usr/share/elasticsearch/data /opt/elasticsearch
```

### 启动 Elasticsearch 容器
```Bash
docker rm -f elasticsearch
docker run --name elasticsearch \
  -v /opt/elasticsearch/config:/usr/share/elasticsearch/config \
  -v /opt/elasticsearch/data:/usr/share/elasticsearch/data \
  -p 9200:9200 -m 8GB -d docker.elastic.co/elasticsearch/elasticsearch:8.17.3
```

## Kibana 

### 拉取 Kibana Docker 镜像
```Bash
docker pull docker.elastic.co/kibana/kibana:8.17.3
```

### 初始化运行 Kibana 容器
```Bash
docker run --name kibana -d docker.elastic.co/kibana/kibana:8.17.3
```

### 持久化配置
```Bash
mkdir -p /opt/kibana
docker cp kibana:/usr/share/kibana/config /opt/kibana
docker cp kibana:/usr/share/kibana/data /opt/kibana
```

### 启动 Kibana 容器
```Bash
docker rm -f kibana
docker run --name kibana \
  -v /opt/kibana/config:/usr/share/kibana/config \
  -v /opt/kibana/data:/usr/share/kibana/data \
  -p 5601:5601 -d docker.elastic.co/kibana/kibana:8.17.3
```

## Elastic Agent

### 拉取 Elastic Agent 镜像
```Bash
docker pull docker.elastic.co/elastic-agent/elastic-agent:8.17.3
```

### 启动 Elastic Agent 容器
```Bash
docker run --name elastic-agent --hostname $HOSTNAME\
  -e FLEET_SERVER_ENABLE=true \
  -e FLEET_SERVER_ELASTICSEARCH_HOST=<elasticsearch-host> \
  -e FLEET_SERVER_SERVICE_TOKEN=<service-token> \
  -e FLEET_SERVER_POLICY_ID=<fleet-server-policy> \
  -e FLEET_SERVER_ELASTICSEARCH_CA_TRUSTED_FINGERPRINT=<fingerprint)> \
  -p 8220:8220 -it -d docker.elastic.co/elastic-agent/elastic-agent:8.17.3
```