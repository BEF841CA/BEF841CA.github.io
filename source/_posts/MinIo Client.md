---
title: MinIO Client
date: 2025-12-02 11:02:00
tags: [ MinIO ]
category: MinIO
---

# MinIO Client (`mc`) 命令手册

---

## mc admin

### mc admin accesskey

为 AIStor 部署中内部管理的用户创建和管理访问密钥（Access Key）。

### mc admin cluster bucket

导入和导出 AIStor 存储桶的元数据。

### mc admin cluster iam

导入和导出 AIStor 身份与访问管理（IAM）相关的元数据。

### mc admin decommission

启动 AIStor 服务器池的退役流程，并将数据从退役池迁移到其余池中。

### mc admin group

管理 AIStor 部署中的用户组。

### mc admin heal

扫描并修复损坏或丢失的对象副本（适用于纠删码部署）。

### mc admin info

显示 AIStor 服务器的信息；在分布式部署中，显示每个节点的状态。

### mc admin kms key

通过 MinIO 密钥加密服务（KES）执行加密密钥管理操作（如创建、列出、删除密钥）。

### mc admin logs

查看 AIStor 对象存储服务的日志输出。

### mc admin policy

使用符合 IAM 规范的 JSON 策略文档，管理 MinIO 基于策略的访问控制（PBAC）策略。

### mc admin prometheus

提供对 MinIO 内置 Prometheus 指标端点的访问（用于监控集成）。

### mc admin rebalance

启动、监控或停止再平衡操作，将对象在所有存储池之间重新均匀分布。

### mc admin replicate

为一组 AIStor 对等站点配置和管理站点级复制（Site Replication），实现跨站点配置与数据同步。

### mc admin scanner

提供关于后台扫描器（scanner）进程的运行状态和统计信息。

### mc admin service

重启或解冻（unfreeze）AIStor 服务器实例。

### mc admin trace

实时显示目标 AIStor 部署上发生的 API 请求和操作（用于调试和性能分析）。

### mc admin update

更新部署中的所有 AIStor 服务器，支持使用私有镜像源进行离线升级。

### mc admin user

管理 AIStor 部署中的用户账户（创建、删除、禁用、列出等）。

#### add

命令用于向目标 AIStor 部署中添加一个新用户。

```
mc admin user add
```

#### disable

命令用于禁用目标 AIStor 部署中的指定用户，使其无法登录或执行操作。

```
mc admin user disable
```

#### enable

命令用于启用目标 AIStor 部署中已被禁用的用户。

```
mc admin user enable
```

#### info

命令返回目标 AIStor 部署中指定用户的详细信息，包括状态、所属组、策略等。

```
mc admin user info
```

#### ls

命令列出目标 AIStor 部署中的所有用户。

```
mc admin user ls
```

#### rm

命令从目标 AIStor 部署中删除指定用户（需确保该用户无活跃会话或依赖资源）。

```
mc admin user rm
```

#### sts info

命令用于查询指定 STS（Security Token Service）临时凭证的详细信息，包括生成该凭证的父用户、关联策略、过期时间等。

```
mc admin user sts info
```

## mc alias

支持连接到 S3 兼容主机并对其执行操作。

## mc anonymous

支持在存储桶及其内容上设置或移除匿名策略。允许公共访问，客户端无需身份验证即可执行策略授予的任何操作。

## mc batch

在 AIStor 部署上运行一个或多个作业任务。

## mc cat

将文件或对象的内容连接到另一个文件或对象，或者将内容输出到标准输出（STDOUT）。

## mc cp

在 AIStor 部署与本地文件系统之间复制对象（支持双向）。

## mc diff

计算两个文件系统目录或 AIStor 存储桶之间的差异。仅列出缺失或大小不同的对象；不比较内容。

## mc du

汇总存储桶和文件夹的磁盘使用情况。也可用于本地文件系统。

## mc encrypt

设置、更新或禁用存储桶的默认服务器端加密（SSE）模式。

## mc event

添加、移除或列出存储桶的事件通知配置。

## mc find

在 AIStor 部署或本地文件系统中搜索对象或文件。

## mc get

从目标 S3 兼容服务下载对象到本地文件系统。

## mc head

显示对象的前 *n* 行内容（*n* 由参数指定）。

## mc idp ldap

管理第三方 Active Directory 或 LDAP 身份与访问管理（IAM）集成的配置。

## mc idp openid

管理第三方 OpenID Connect（OIDC）身份提供商（IdP）的集成配置。

## mc idp ldap policy

显示 LDAP 策略与关联用户或用户组之间的映射关系。

## mc ilm rule

管理 AIStor 部署上的对象生命周期管理（ILM）规则。

## mc ilm tier

管理 AIStor 部署中的存储分层（如冷热数据分层）配置。

## mc legalhold

设置、移除或查询对象的法律保留（Legal Hold / WORM）状态。

## mc license

用于 MinIO SUBNET 集群注册：注册部署、查看许可证信息或更新许可证密钥。

## mc ls

列出 AIStor 或其他 S3 兼容服务中的存储桶和对象。

## mc mb

在指定路径创建新的存储桶（或本地目录）。

## mc mirror

同步内容到 AIStor 部署，功能类似于 `rsync`。支持本地文件系统、AIStor 或其他 S3 兼容服务作为源。

## mc mv

移动对象，例如在不同存储桶、不同 MinIO 部署之间，或在本地与远程之间移动。

## mc od

将本地文件按指定分片数量和分片大小上传至远程位置，并输出上传耗时，用于性能测试。

## mc ping

对指定目标执行存活检查（Liveness Check），验证连接可用性。

## mc pipe

将标准输入（STDIN）流式写入目标对象（常用于管道操作）。

## mc put

将本地文件系统中的对象上传到目标 S3 兼容服务的存储桶中。

## mc rb

删除一个或多个存储桶（需为空）。若仅想清空内容，请使用 `mc rm`。

## mc ready

检查集群状态，确认是否具备读写仲裁（Quorum），判断集群是否就绪。

## mc replicate

配置和管理服务器端存储桶复制（包括主动-主动复制、重新同步等）。

## mc retention

为存储桶中的对象配置 WORM（一次写入多次读取）保留策略，也可设置存储桶默认锁定配置。

## mc rm

从存储桶中删除一个或多个对象。若要删除整个存储桶，请使用 `mc rb`。

## mc share

生成预签名 URL，用于临时共享对象的上传或下载权限。

## mc sql

提供 S3 Select 功能，支持对存储桶中的对象执行 SQL 查询（如 CSV/JSON/Parquet 文件）。

## mc stat

显示对象或存储桶的详细元数据信息（如大小、修改时间、ETag、加密状态等）。

## mc support

提供部署健康诊断工具，可生成并上传健康报告供 MinIO 工程团队分析。

## mc tag

为存储桶或对象添加、删除或列出标签（Tag）。

## mc tree

以树形结构列出存储桶内的所有前缀（Prefix），可选包含每个前缀下的对象列表。

## mc undo

撤销指定路径上最近一次的 `PUT`（上传）或 `DELETE`（删除）操作（需启用了版本控制）。

## mc update

将 `mc` 客户端二进制文件升级到最新稳定版本。

## mc version

启用、禁用或查询存储桶的版本控制状态。

## mc watch

监听指定存储桶或本地路径的事件变化（如对象创建、删除等）。