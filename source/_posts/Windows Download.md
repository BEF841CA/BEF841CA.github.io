---
title: Windows Download
date: 2024-08-14 10:12:31
tags: [ Windows, OS ]
category: Windows
---


# 下载
 [Windows Microsoft](https://www.microsoft.com/zh-cn/software-download/)  
```
https://www.microsoft.com/zh-cn/software-download/
```

 [Windows Server Microsoft](https://www.microsoft.com/zh-cn/windows-server)
```
https://www.microsoft.com/zh-cn/windows-server
```

 [MSDN](https://next.itellyou.cn/)
 ```
 https://next.itellyou.cn/
 ```

# 安装

## 安装跳过检查

* 按`SHIFT+F10` 打开控制台
* 输入`regedit`，打开注册表管理器
* 选择到 `HKEY_LOCAL_MACHINE\SYSTEM\Setup`，右键 `New > Key`，增加 `LabConfig`。
* 选择`LabConfig`，右键 `New \> DWORD (32 bit) Value`，增加三个项目 `BypassRAMCheck` `BypassSecureBootCheck` `BypassTPMCheck`，值都设置为 1。
* 回退，正常安装。