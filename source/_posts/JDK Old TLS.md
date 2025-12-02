---
title: JDK 开始 TLS 1.0 和 TLS 1.1
date: 2025-12-02 11:02:00
tags: [ JAVA, JDK ]
category: JAVA
---

从 JDK 6 到 JDK 7，默认使用的 TLS 版本是 TLS 1.0。JDK 8 开始，默认使用的 TLS 版本是 TLS 1.2。JDK 11 开始，支持 TLS 1.3。JDK 17
默认使用的 TLS 版本是 TLS 1.3。

### 修改配置

配置文件的位置

``` 
$JAVA_HOME/conf/security/java.security
```

找到里面的一行配置：

``` 
jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA, \
    DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL
```

说明：JDK中的jdk.tls.disabledAlgorithms参数用于禁用不安全或不需要的TLS密码算法，
以提高系统的安全性。通过配置这个参数，可以指定JDK不支持的密码算法或协议，以降低它们的优先级，
减少被攻击的风险。

我们把TLSv1，TLSv1.1这两个删除掉,变成如下：

```
jdk.tls.disabledAlgorithms=SSLv3, RC4, DES, MD5withRSA, \
    DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL
```

### 验证

```java
System.out.println(SSLContext.getDefault().getSupportedSSLParameters().getProtocols());
```

### 在运行应用时禁

```java
java -Djdk.tls.disabledAlgorithms="SSLv3, RC4" myApp
```