---
title: PostgreSQL
date: 2024-10-28 16:44:53
tags: [ DB, PostgreSQL ]
category: PostgreSQL
---

# 角色权限结构

## 权限角色

* 创建了三个角色：data_viewer、data_editor 和 data_admin，并为每个角色分配了不同的权限。
* 将不同用户添加到不同的角色中，以便管理权限。

```sql
-- 创建角色
CREATE ROLE data_viewer;
CREATE ROLE data_editor;
CREATE ROLE data_admin;
 
-- 将权限分配给角色
-- 读写的权限
GRANT USAGE SELECT ON ALL TABLES IN SCHEMA public TO data_viewer;
-- 写入的权限
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO data_editor;
-- 所有表的权限
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO data_admin;
-- 数据库的权限
GRANT ALL ON database xxx TO data_admin;
-- 模式的权限
GRANT ALL ON schema public TO data_admin;

--- 创建用户
CREATE USER user WITH PASSWORD 'password';

-- 将用户添加到角色
GRANT data_viewer TO user;
```

## 使用默认权限

* PostgreSQL 允许为新创建的对象设置默认权限，这样可以自动应用权限，而不必在每次创建对象时手动授予权限。

```sql
-- 设置默认 SELECT 权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO data_viewer;

-- 设置默认 INSERT, UPDATE, DELETE 权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO data_editor;

-- 设置默认 SELECT 权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO data_viewer;

-- 设置默认 所有表 权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO data_admin;
```