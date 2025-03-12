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
docker run --name elasticsearch -m 8GB -d docker.elastic.co/elasticsearch/elasticsearch:8.17.3
```

### 查看 elastic 用户密码和 Kibana 的注册令牌
```Bash
docker logs elasticsearch
```

### 持久化配置
```Bash
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
docker run --name elastic-agent \
  -v /opt/elasticsearch/config/certs:/usr/share/elasticsearch/config/certs \
  -e FLEET_SERVER_ENABLE=true \
  -e FLEET_SERVER_ELASTICSEARCH_HOST=<elasticsearch-host> \
  -e FLEET_SERVER_SERVICE_TOKEN=<service-token> \
  -e FLEET_SERVER_POLICY_ID=<fleet-server-policy> \
  -e FLEET_SERVER_ELASTICSEARCH_CA=/usr/share/elasticsearch/config/certs/http_ca.crt \
  -p 8220:8220 -it -d docker.elastic.co/elastic-agent/elastic-agent:8.17.3
```