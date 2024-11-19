---
title: Redis Command 
date: 2021-08-13 10:27:09
tags: [Redis]
category: Deploy
---

启动 redis 客户端

```Bash
redis-cli -h host -p port -a password
```

## Redis中key的操作命令

查看当前数据库中有哪些key

```Bash
keys *
```

查看key的剩余生存时间，以秒为单位，返回-1为永不过期，-2为不存在

```Bash
ttl key
```

判断key是否存在：存在返回1，不存在返回0，多个key返回存在的数量

```Bash
exists key1 key2
```

设置key的生存时间，超过时间key自动删除，单位是秒，成功返回1，失败为0

```Bash
expire key seconds
```

清空当前

```Bash
flushdb
```

清空所有库

```Bash
flushall
```

获取redis的所有配置项

```Bash
config get *
```

给key改名字，当key和newkey相同，或者newkey不存在时返回一个错误

```Bash
rename key newkey
```

查看key所存储值的数据类型

```Bash
type key
```

## 字符串类型：String

### 简介

* redis中最基本的数据结构，能存储任何类型的数据，甚至是图片，最大512M

+ 字符串类型的数据操作总的思想是通过key操作value，key是数据标识，value是我们感兴趣的业务数据

### 常用操作命令

将字符串值 value 设置到 key 中，如果key已存在，后放的值会把前放的值覆盖掉

```Bash
set key value
```

获取 key 中设置的字符串值,key存在，返回key对应的value；key不存在，返回null

```Bash
get key
```

## 列表：List

### 简介

* Redis列表是简单的字符串列表，按照插入顺序排序，左边（头部）、右边（尾部）或者中间都可以添加元素。底层是个链表结构，链表的操作无论是头或者尾效率都极高，但是如果对中间元素进行操作，那效率会大大降低了。

+ 列表类型的数据操作总的思想是通过key和下标操作value，key是数据标识，下标是数据在列表中的位置，value是我们感兴趣的业务数据

### 常用操作命令

将一个或多个值 value 插入到列表 key 的最左边（表头），各个value值依次插入到表头位置。返回值：插入之后的列表的长度

```Bash
lpush key value1 value2[value...]
```

将一个或多个值 value 插入到列表 key 的最右边（表尾），各个 value 值按依次插入到表尾。返回值：插入之后的列表的长度

```Bash
lpush key value1 value2[value...]
```

获取列表 key 中指定下标区间内的元素，下标从0开始，到列表长度-1；下标也可以是负数，表示列表从后往前取，-1表示倒数第一个元素，-2表示倒数第二个元素，以此类推；startIndex和endIndex超出范围不会报错。
返回值：获取到的元素列表

```Bash
lrange key startIndex endIndex
```

## 集合类型：Set

### 简介

* Redis的Set是string类型的无序不重复集合

+ 集合类型的数据操作总的思想是通过key确定集合，key是集合标识，元素没有下标，只有直接操作业务数据和数据的个数

### 常用操作命令

## 哈希类型：Hash

### 简介

* Redis的hash 是一个string类型的key和value的映射表，这里的value是一系列的键值对，hash特别适合用于存储对象

+ 哈希类型的数据操作总的思想是通过key和field操作value，key是数据标识，field是域，value是我们感 兴趣的业务数据

### 常用操作命令

## 有序集合：Zset

### 简介

* Redis 有序集合zset和集合set一样也是string类型元素的集合，且不允许重复的成员

+ 不同的是zset的每个元素都会关联一个分数（分数可以重复），redis通过分数来为集合中的成员进行从小到大的排序。

### 常用操作命令